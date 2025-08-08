const jwt = require('jsonwebtoken')

exports.identifier = (req, res, next) => {
    let token; // Variable to store the JWT token

    // Determine where to retrieve the token based on the client type
    if (req.header.client === 'not-browser') {
        token = req.headers.authorization; // For non-browser clients, token is in Authorization header
    } else {
        token = req.cookie['Authorization']; // For browsers, token is stored in cookies
    }

    // If no token is provided, return an unauthorized response
    if (!token) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    try {
        // Extract the actual token by removing the "Bearer " prefix
        const userToken = token.split(' ')[1];

        // Verify the token using JWT and the secret key from environment variables
        const jwtVerified = jwt.verify(userToken, process.env.TOKEN_SECRET);

        // If verification is successful, attach user data to the request object and proceed
        if (jwtVerified) {
            req.user = jwtVerified;
            next(); // Proceed to the next middleware or route handler
        } else {
            throw new Error("Error in the token"); // Explicitly throw an error if token verification fails
        }
    } catch (error) {
        // Handle any errors that occur during token verification
        return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};
