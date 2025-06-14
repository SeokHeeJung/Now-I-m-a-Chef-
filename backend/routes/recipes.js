const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const { broadcast } = require("../websocket");
// 모든 레시피 조회
router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: "레시피 불러오기 실패" });
    }
});

// 좋아요 증가
router.post("/:id/like", async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId 필요" });
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "잘못된 레시피 ID" });
        }
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        recipe.votes = recipe.votes || [];
        const existing = recipe.votes.find(v => v.userId === userId);
        if (existing && existing.value === 1) {
            return res.json({ likes: recipe.likes, dislikes: recipe.dislikes });
        }

        if (existing && existing.value === -1) {
            recipe.dislikes -= 1;
            existing.value = 1;
        } else {
            recipe.votes.push({ userId, value: 1 });
        }
        recipe.likes += 1;
        await recipe.save();
        broadcast({ type: 'rating', recipeId: recipe.id, likes: recipe.likes, dislikes: recipe.dislikes });
        res.json({ likes: recipe.likes, dislikes: recipe.dislikes });
    } catch (err) {
        res.status(500).json({ error: "좋아요 실패" });
    }
});

// 싫어요 증가
router.post("/:id/dislike", async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId 필요" });
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "잘못된 레시피 ID" });
        }
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        recipe.votes = recipe.votes || [];
        const existing = recipe.votes.find(v => v.userId === userId);
        if (existing && existing.value === -1) {
            return res.json({ likes: recipe.likes, dislikes: recipe.dislikes });
        }

        if (existing && existing.value === 1) {
            recipe.likes -= 1;
            existing.value = -1;
        } else {
            recipe.votes.push({ userId, value: -1 });
        }
        recipe.dislikes += 1;
        await recipe.save();
        broadcast({ type: 'rating', recipeId: recipe.id, likes: recipe.likes, dislikes: recipe.dislikes });
        res.json({ likes: recipe.likes, dislikes: recipe.dislikes });
    } catch (err) {
        res.status(500).json({ error: "싫어요 실패" });
    }
});

// 댓글 조회
router.get("/:id/comments", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ comments: [] });
        }
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ comments: [] });
        res.json({ comments: recipe.comments });
    } catch (err) {
        res.status(500).json({ error: "댓글 불러오기 실패" });
    }
});

// 댓글 작성
router.post("/:id/comments", async (req, res) => {
    const { user, text } = req.body;
    if (!text) return res.status(400).json({ message: "내용 필요" });
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ comments: [] });
        }
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        recipe.comments = recipe.comments || [];
        recipe.comments.push({ user, text });
        await recipe.save();
        broadcast({ type: 'comment', recipeId: recipe.id, comments: recipe.comments });
        res.json({ comments: recipe.comments });
    } catch (err) {
        res.status(500).json({ error: "댓글 작성 실패" });
    }
});

// 댓글 삭제
router.delete("/:id/comments/:commentId", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "잘못된 레시피 ID" });
        }
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        recipe.comments = recipe.comments || [];
        const idx = recipe.comments.findIndex(c => c._id.toString() === req.params.commentId);
        if (idx === -1) return res.status(404).json({ message: "댓글 없음" });
        recipe.comments.splice(idx, 1);
        await recipe.save();
        broadcast({ type: 'comment', recipeId: recipe.id, comments: recipe.comments });
        res.json({ comments: recipe.comments });
    } catch (err) {
        res.status(500).json({ error: "댓글 삭제 실패" });
    }
});

module.exports = router;

