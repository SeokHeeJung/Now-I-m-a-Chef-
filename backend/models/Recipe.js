// models/Recipe.js
const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },  // 이미지 URL
    description: { type: String },
    ingredients: [String], // 선택적 설명
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    votes: [{
        userId: String,
        value: { type: Number, enum: [1, -1] }
    }],
    comments: [{
        user: String,
        text: String,
        createdAt: { type: Date, default: Date.now }
    }]
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);
