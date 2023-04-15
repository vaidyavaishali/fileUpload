const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }

})
const userModels = mongoose.model("uploadUser", userSchema)
module.exports = userModels
