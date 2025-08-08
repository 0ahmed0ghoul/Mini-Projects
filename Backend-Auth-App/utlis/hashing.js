const { hash, compare } = require("bcryptjs")
const {createHmac} =require('crypto')

// Function to hash a value using a salt
exports.doHash = (value, saltValue) => {
    const result = hash(value, saltValue); // Hash the value using bcrypt
    return result;
};

// Function to validate a value against a hashed value
exports.doHashValidation = (value, hashedValue) => {
    const result = compare(value, hashedValue); // Compare input with stored hash
    return result;
};

// Function to generate an HMAC (Hash-based Message Authentication Code)
exports.hmacProcess = (value, key) => {
    const result = createHmac('sha256', key) // Create an HMAC using SHA-256 algorithm
        .update(value) // Update HMAC with the provided value
        .digest('hex'); // Convert result to hexadecimal format
    return result;
};