const {
  signupSchema,
  signinSchema,
  acceptCodeSchema,
  changePasswordSchema,
  acceptFPSchema,
} = require("../middlewares/validator");

const { doHash, doHashValidation, hmacProcess } = require("../utlis/hashing");

const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");
const transport = require("../middlewares/sendMail");

exports.signup = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Validate the input using a predefined schema (signupSchema)
    const { err, value } = signupSchema.validate({ email, password });

    // If validation fails, return an error response
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: err.details[0].message });
    }

    // Check if a user with the same email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password using a secure hashing function (bcrypt with salt rounds of 12)
    const hashedPassword = await doHash(password, 12);

    // Create a new user instance with the provided email and hashed password
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const result = await newUser.save();

    // Remove the password field from the response to avoid exposing sensitive data
    result.password = undefined;

    // Send a success response with the created user data (excluding the password)
    res.status(201).json({
      success: true,
      message: "Your account has been created successfully",
      result,
    });

  } catch (err) {
    // Log any unexpected errors to the console
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  try {
    // Validate input using the predefined signinSchema
    const { err, value } = signinSchema.validate({ email, password });

    // If validation fails, return an error response
    if (err) {
      return res
        .status(401)
        .json({ success: false, message: err.details[0].message });
    }

    // Check if the user exists in the database and also fetch the password field
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    // Compare the provided password with the stored hashed password
    const result = await doHashValidation(password, existingUser.password);
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email, 
        verified: existingUser.verified,
      },
      process.env.TOKEN_SECRET
    );

    // Set the authentication token in a cookie
    res
      .cookie("Authorization", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000), // Set expiration to 8 hours from now
        httpOnly: process.env.NODE_ENV === "production", // Make the cookie accessible only in HTTP requests if in production
        secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
      })
      .json({
        success: true,
        message: "Logged in successfully",
        token,
      });

  } catch (err) {
    // Log any unexpected errors to the console
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  // Clear the authentication cookie
  res
    .clearCookie("Authorization") // Removes the JWT token stored in the "Authorization" cookie
    .status(200) // Sends an HTTP 200 OK response
    .json({ success: true, message: "Logged out successfully" }); // Sends a success message
};

exports.sendVerificationCode = async (req, res) => {
  // Extract email from request body
  const { email } = req.body;

  try {
    // Find user in the database
    const existingUser = await User.findOne({ email });

    // If user does not exist, return an error response
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist!" });
    }

    // Check if the user is already verified
    if (existingUser.verified) {
      return res
        .status(400)
        .json({ success: false, message: "User already verified!" });
    }

    // Generate a random 6-digit verification code
    const codeValue = Math.floor(100000 + Math.random() * 900000).toString();

    // Send verification email
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS, // Sender email from environment variables
      to: existingUser.email, // Recipient email
      subject: "Verification Code",
      html: `<h1>${codeValue}</h1>`, // Email body containing the verification code
    });

    // If email was sent successfully
    if (info.accepted.includes(existingUser.email)) {
      // Hash the verification code for security
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_CODE_SECRET
      );

      // Store the hashed verification code in the user object
      existingUser.verificationCode = hashedCodeValue;
      existingUser.verificationCodeValidation = Date.now(); // Fixed incorrect property assignment

      // Save updated user data
      await existingUser.save();

      // Send success response
      return res.status(200).json({ success: true, message: "Code sent!" });
    }

    // If email sending failed
    return res
      .status(400)
      .json({ success: false, message: "Code sending failed!" });

  } catch (error) {
    console.log(error);
  }
};

exports.verifyVerification = async (req, res) => {
  // Extract email and provided verification code from request body
  const { email, provideCode } = req.body;

  try {
    // Validate input data using Joi schema
    const { error, value } = acceptCodeSchema.validate({ email, provideCode });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message }); // Fixed 'err' to 'error'
    }

    // Convert the provided code to a string
    const codeValue = provideCode.toString();

    // Find user by email and explicitly select verification fields
    const existingUser = await User.findOne({ email }).select(
      "+verificationCode +verificationCodeValidation"
    );

    // Check if user exists
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" }); // Fixed typo
    }

    // Check if user is already verified
    if (existingUser.verified) {
      return res
        .status(400)
        .json({ success: false, message: "You are already verified!" });
    }

    // Ensure verification code and validation timestamp exist
    if (
      !existingUser.verificationCode ||
      !existingUser.verificationCodeValidation
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Something is wrong with the code!" }); // Fixed typo
    }

    // Check if the verification code has expired (5 minutes limit)
    if (Date.now() - existingUser.verificationCodeValidation > 5 * 60 * 1000) {
      return res
        .status(400)
        .json({ success: false, message: "Code has expired" });
    }

    // Hash the provided code using the same HMAC secret
    const hashedCodeValue = hmacProcess(
      codeValue,
      process.env.HMAC_VERIFICATION_CODE_SECRET
    );

    // Compare the hashed provided code with the stored hashed code
    if (hashedCodeValue === existingUser.verificationCode) {
      // Mark the user as verified and remove the verification code
      existingUser.verified = true;
      existingUser.verificationCode = undefined;
      existingUser.verificationCodeValidation = undefined; // Ensure cleanup

      // Save changes to the database
      await existingUser.save();

      return res
        .status(200)
        .json({ success: true, message: "Your account has been verified!" });
    }

    // If code does not match, return an error response
    return res
      .status(400)
      .json({ success: false, message: "Unexpected error occurred!" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" }); // Added error handling response
  }
};

exports.changePassword = async (req, res) => {
  const { userId, verified } = req.user;
  const { oldPassword, newPassword } = req.body; 

  try {
    // Validate input data
    const { error } = changePasswordSchema.validate({ oldPassword, newPassword });
    if (error) {
      return res.status(401).json({ success: false, message: error.details[0].message }); 
    }

    // Check if the user is verified
    if (!verified) {
      return res.status(401).json({ success: false, message: "You are not a verified user!" });
    }

    // Find user and select password field
    const existingUser = await User.findOne({ _id: userId }).select("+password");
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User does not exist" }); 
    }

    // Validate old password
    const isPasswordValid = await doHashValidation(oldPassword, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid Credentials!" });
    }

    // Hash new password and update it
    const hashedPassword = await doHash(newPassword, 12);
    existingUser.password = hashedPassword;
    await existingUser.save();

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" }); // Added proper error response
  }
};

exports.sendForgotPasswordCode = async (req, res) => {
  const { email } = req.body;
  try {
    // Find user by email
    const existingUser = await User.findOne({ email }); 
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User does not exist!" });
    }

    // Generate a 6-digit verification code
    const codeValue = Math.floor(100000 + Math.random() * 900000).toString(); // Ensures a 6-digit code

    // Send email
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: existingUser.email,
      subject: "Verification Code",
      html: `<h1>${codeValue}</h1>`,
    });

    // Check if the email was sent successfully
    if (info.accepted.includes(existingUser.email)) { // Used includes() instead of [0]
      // Hash the verification code
      const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);

      // Store hashed verification code and timestamp in the database
      existingUser.forgotPasswordCode = hashedCodeValue;
      existingUser.forgotPasswordCodeValidation = Date.now();
      await existingUser.save();

      return res.status(200).json({ success: true, message: "Code sent successfully!" });
    }

    return res.status(400).json({ success: false, message: "Code sending failed!" }); // Fixed 'flase' typo
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" }); // Added proper error response
  }
};

exports.verifyForgotPasswordCode = async (req, res) => {
  const { email, provideCode, newPassword } = req.body;

  try {
    // Validate input data
    const { error } = acceptFPSchema.validate({ email, provideCode, newPassword });
    if (error) {
      return res.status(401).json({ success: false, message: error.details[0].message });
    }

    const codeValue = provideCode.toString();

    // Find user and include password reset fields
    const existingUser = await User.findOne({ email }).select("+forgotPasswordCode +forgotPasswordCodeValidation");
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    // Check if the reset code exists
    if (!existingUser.forgotPasswordCode || !existingUser.forgotPasswordCodeValidation) {
      return res.status(400).json({ success: false, message: "Invalid reset code!" }); 
    }

    // Check if the code is expired (5 minutes expiration)
    if (Date.now() - existingUser.forgotPasswordCodeValidation > 5 * 60 * 1000) { 
      return res.status(400).json({ success: false, message: "Code has expired" });
    }

    // Hash the provided code and compare it with the stored hashed code
    const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
    if (hashedCodeValue !== existingUser.forgotPasswordCode) {
      return res.status(400).json({ success: false, message: "Invalid verification code!" });
    }

    // Hash the new password and update user data
    const hashedPassword = await doHash(newPassword, 12);
    existingUser.password = hashedPassword;
    existingUser.forgotPasswordCode = undefined;
    existingUser.forgotPasswordCodeValidation = undefined;
    await existingUser.save();

    return res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" }); // Added proper error handling
  }
};

