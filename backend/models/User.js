// ✅ models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    pw: String,
    name: String,
    ingredients: {
        type: [{
            name: String,
            expiry: String
        }],
        default: []
    }
});

module.exports = mongoose.model("User", userSchema);


