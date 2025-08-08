const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String, // Email must be a string
            required: [true, 'Email is required!'], // Validation: Email is mandatory
            trim: true, // Removes leading and trailing whitespace
            unique: [true, 'Email must be unique!'], // Ensures email is unique
            minLength: [5, 'Email must be at least 5 characters!'], // Minimum length validation
            lowercase: true, // Stores email in lowercase format
        },
        password: {
            type: String, // Password must be a string
            required: [true, 'Password must be provided'], // Validation: Password is mandatory
            trim: true, // Removes leading and trailing whitespace
            select: false, // Excludes password from query results by default
        },
        verified: {
            type: Boolean, // Boolean field to check if the user is verified
            default: false, // Default value is false (user is not verified initially)
        },
        verificationCode: {
            type: String, // Stores the verification code for email confirmation
            select: false, // Excludes this field from query results
        },
        verificationCodeValidation: {
            type: Number, // Stores the expiration timestamp or validation attempts
            select: false, // Excludes this field from query results
        },
        forgotPasswordCode: {
            type: String, // Stores the code for password reset
            select: false, // Excludes this field from query results
        },
        forgotPasswordCodeValidation: {
            type: Number, // Stores validation data (e.g., expiration time) for password reset
            select: false, // Excludes this field from query results
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);
// Export the User model
module.exports = mongoose.model('User', userSchema);
