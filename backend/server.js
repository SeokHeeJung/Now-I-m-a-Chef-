// ✅ server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recipeRoutes = require("./routes/recipes");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mychef', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ DB 연결 성공"))
    .catch(err => console.error("❌ DB 연결 실패", err));

app.use("/api/recipes", recipeRoutes);
app.use("/api/user", userRoutes);
app.use("/api", authRoutes); // ✅ 회원가입, 로그인 라우터

app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
