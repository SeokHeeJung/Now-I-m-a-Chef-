const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 회원가입
router.post("/register", async (req, res) => {
    const { id, pw, name } = req.body;

    try {
        const existing = await User.findOne({ id });
        if (existing) return res.json({ success: false, message: "이미 존재하는 아이디입니다." });

        const user = new User({ id, pw, name });
        await user.save();

        res.json({ success: true, message: "회원가입 성공" });
    } catch (err) {
        res.status(500).json({ success: false, message: "서버 오류", error: err });
    }
});

// 로그인
router.post("/login", async (req, res) => {
    const { id, pw } = req.body;

    try {
        const user = await User.findOne({ id });
        if (!user || user.pw !== pw) {
            return res.json({ success: false, message: "아이디 또는 비밀번호가 일치하지 않습니다." });
        }

        res.json({ success: true, message: "로그인 성공", name: user.name });
    } catch (err) {
        res.status(500).json({ success: false, message: "서버 오류", error: err });
    }
});

module.exports = router;