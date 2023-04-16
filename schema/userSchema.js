const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String }

})
const userModels = mongoose.model("uploadUser", userSchema)
module.exports = userModels
