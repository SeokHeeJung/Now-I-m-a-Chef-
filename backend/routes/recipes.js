const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
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
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        res.json({ likes: recipe.likes });
    } catch (err) {
        res.status(500).json({ error: "좋아요 실패" });
    }
});

// 싫어요 증가
router.post("/:id/dislike", async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            { $inc: { dislikes: 1 } },
            { new: true }
        );
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        res.json({ dislikes: recipe.dislikes });
    } catch (err) {
        res.status(500).json({ error: "싫어요 실패" });
    }
});

// 댓글 조회
router.get("/:id/comments", async (req, res) => {
    try {
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
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ message: "레시피 없음" });
        recipe.comments.push({ user, text });
        await recipe.save();
        res.json({ comments: recipe.comments });
    } catch (err) {
        res.status(500).json({ error: "댓글 작성 실패" });
    }
});

module.exports = router;
