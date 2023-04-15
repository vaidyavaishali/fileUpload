const bodyParser = require("body-parser")
const express = require("express")
const cloudinary = require('cloudinary');
const multer = require("multer")
const file_route = express.Router()
const uploadData = require("../schema/fileUploadScema")

cloudinary.config({
    cloud_name: 'dzqdbesgb',
    api_key: '888691238476542',
    api_secret: 'tC7DEEmgMXOSZTukanLsENy9tYo'
});

const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000000 }
});

file_route.get("/fileupload", async (req, res) => {
    try {
        const data = await uploadData.find()
        if (data) {
            res.status(200).json({
                status: "Success",
                data
            })
        } else {
            res.status(200).json({
                status: "failed",
                result: "data not found"
            })
        }

    } catch (e) {
        res.status(200).json({
            status: "failed",
            message: e.message
        })
    }

})

file_route.post("/fileupload", uploader.single("file"), async (req, res) => {
    try {
       
 const upload = await cloudinary.v2.uploader.upload(req.file.path)
    const data = await uploadData.create({
        file_name: req.body.file_name,
        file:upload.secure_url
    })
    res.status(200).json({
        status: "Success",
        data
    })

 } catch (e) {
        res.status(200).json({
            status: "failed",
            message: e.message
        })
    }
})
module.exports = file_route


