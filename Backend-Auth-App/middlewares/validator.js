const Joi = require('joi')

// Validation schema for user signup
exports.signupSchema = Joi.object({
    email: Joi.string()
        .min(6) // Minimum length of 6 characters
        .required()
        .email({
            tlds: { allow: ['com', 'net'] } // Allows only ".com" and ".net" domains
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')) // At least one lowercase, one uppercase, and one number, min length 8
});

// Validation schema for user signin
exports.signinSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] }
        }),
    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
});

// Validation schema for email verification (accepting a code)
exports.acceptCodeSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] }
        }),
    providedCode: Joi.number().required() // Required numeric verification code
});

// Validation schema for changing password
exports.changePasswordSchema = Joi.object({
    newPassword: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')),
    oldPassword: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
});

// Validation schema for accepting forgot password request
exports.acceptFPSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(60)
        .required()
        .email({
            tlds: { allow: ['com', 'net'] }
        }),
    providedCode: Joi.number().required(), // Numeric verification code required
    newPassword: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'))
});

// Validation schema for creating a post
exports.createPostSchema = Joi.object({
    title: Joi.string().min(6).max(60).required(), // Title must be between 6 and 60 characters
    description: Joi.string().min(6).max(60).required(), // Description must be between 6 and 60 characters
    userId: Joi.string().required() // User ID is required
});