const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET: 재료 불러오기
router.get("/ingredients/:id", async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        if (!user) return res.status(404).json({ ingredients: [] });

        const normalized = (user.ingredients || []).map(i =>
            typeof i === "string" ? { name: i, expiry: "" } : i
        );
        if (normalized.some((v, idx) => typeof user.ingredients[idx] === "string")) {
            user.ingredients = normalized;
            await user.save();
        }

        res.json({ ingredients: normalized });
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err });
    }
});

// POST: 재료 추가
router.post("/ingredients", async (req, res) => {
    const { id, ingredient, expiry } = req.body;

    try {
        const user = await User.findOne({ id });
        if (!user) return res.status(404).json({ message: "사용자 없음" });

        user.ingredients = (user.ingredients || []).map(i =>
            typeof i === "string" ? { name: i, expiry: "" } : i
        );

        if (!user.ingredients.some(i => i.name === ingredient)) {
            user.ingredients.push({ name: ingredient, expiry });
        } else {
            user.ingredients = user.ingredients.map(i =>
                i.name === ingredient ? { name: ingredient, expiry } : i
            );
        }

        await user.save();

        res.json({ message: "추가 완료", ingredients: user.ingredients });
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err });
    }
});

// DELETE: 재료 제거
router.delete("/ingredients", async (req, res) => {
    const { id, ingredient } = req.body;

    try {
        const user = await User.findOne({ id });
        if (!user) return res.status(404).json({ message: "사용자 없음" });

        user.ingredients = (user.ingredients || []).map(i =>
            typeof i === "string" ? { name: i, expiry: "" } : i
        );

        user.ingredients = user.ingredients.filter(i => i.name !== ingredient);
        await user.save();

        res.json({ message: "삭제 완료", ingredients: user.ingredients });
    } catch (err) {
        res.status(500).json({ message: "서버 오류", error: err });
    }
});

module.exports = router;

