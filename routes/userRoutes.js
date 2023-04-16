const userModel = require("../schema/userSchema");
const bodyParser = require("body-parser")
const express = require("express")
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const user_routes = express.Router()
user_routes.use(bodyParser.json())
user_routes.post("/register", async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser) {
           await bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    res.json({
                        status: "Failed",
                        result: err.message
                    })
                } else {
                    const register_user = await userModel.create({
                        email: email,
                        password: hash
                    })
                    res.status(200).json({
                        status: "Success",
                        register_user
                    })
                }
            })
        } else {
            res.status(401).json({
                status: "Failed",
                result: "User Already Exist"
            })
        }

    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }

})

user_routes.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        console.log(req.body)
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                const token = JWT.sign({
                    exp: Math.floor(Date.now() / 1000) + 60 * 60,
                    data: user._id
                }, "Auth")
                res.status(200).json({
                    status: "Success",
                    token
                })
            } else {
                res.status(401).json({
                    status: "Failed",
                    result: "Wrong Password"
                })
            }
        }
        else {
            res.status(404).json({
                status: "Failed",
                message: "User Does Not Exist"
            })
        }
    } catch (e) {
        res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }

})
module.exports = user_routes