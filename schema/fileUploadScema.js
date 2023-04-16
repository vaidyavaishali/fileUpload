const mongoose = require("mongoose")
const fileUpload = new mongoose.Schema({
    file_name:{type: String, required:true},
    file: {type: String, required:true},
    user:{type:String, ref:"uploadUser"}
 })
 const fileModel = mongoose.model("uploadData", fileUpload)
module.exports = fileModel