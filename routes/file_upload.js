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
        const data = await uploadData.find({user:req.user})
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
    console.log("ok")
        const upload = await cloudinary.v2.uploader.upload(req.file.path)
        const data = await uploadData.create({
            file_name: req.body.file_name,
            file: upload.secure_url,
            user:req.user
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

file_route.put("/fileupload/:_id", async (req, res) => {
    try {
        const findForUpdate = await uploadData.findOne({ _id: req.params._id })
        if (findForUpdate) {
            const updatedItem = await uploadData.updateOne({ _id: req.params._id }, req.body)
            res.status(200).json({
                status: "Success",
                updatedItem
            })

        } else {
            res.status(404).json({
                status: "failed",
                message: "ID not found"
            })
        }
    }

    catch (e) {
        res.status(200).json({
            status: "failed",
            message: e.message
        })
    }


})

file_route.delete("/fileupload/:_id", async (req, res) => {
    try {
        const findForUpdate = await uploadData.findOne({ _id: req.params._id })
        if (findForUpdate) {
            const deleted = await uploadData.deleteOne()

            res.status(200).json({
                status: "Success",
                deleted
            })
        } else {
            res.status(400).json({
                status: "Failed",
                deleted
            })
        }
    }
    // const findForUpdate = await uploadData.findOne({ id: req.params.id })
    catch (e) {
        res.status(200).json({
            status: "failed",
            message: e.message
        })
    }


})
module.exports = file_route


