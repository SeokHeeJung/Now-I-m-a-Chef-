const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.comparePassword = function(password) {
    // Logic to compare password with hashed password
};

const User = mongoose.model('User', userSchema);

module.exports = User;