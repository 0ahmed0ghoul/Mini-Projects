const mongoose = require('mongoose');

// Define the schema for a Post
const postSchema = mongoose.Schema(
    {
        title: {
            type: String, // Title must be a string
            required: [true, 'Title is Required!'], // Validation: Title is mandatory
            trim: true, // Removes leading and trailing whitespace
        },
        description: {
            type: String, // Description must be a string
            required: [true, 'Description must be Required!'], // Validation: Description is mandatory
            trim: true, // Removes leading and trailing whitespace
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Stores a reference to a User document
            ref: 'User', // Refers to the 'User' collection in MongoDB
            required: true, // Validation: userId is mandatory
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    }
);

// Create and export the Post model
module.exports = mongoose.model('Post', postSchema);
