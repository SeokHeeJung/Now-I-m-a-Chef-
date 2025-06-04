const mongoose = require('mongoose');

// 사용자 스키마와 데이터베이스 상호작용을 정의합니다.
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