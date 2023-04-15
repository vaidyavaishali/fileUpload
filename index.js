const express = require("express")
const bodyParser = require("body-parser")
const JWT = require("jsonwebtoken")

const  mongoose = require("mongoose")
const user_routes = require("./routes/userRoutes")
const file_upload = require("./routes/file_upload")
const app = express()
app.use(bodyParser.json())
const port = 8000
mongoose.connect("mongodb+srv://test:test@cluster0.vcdyq8z.mongodb.net/?retryWrites=true&w=majority").then((res)=>{
       console.log("connected to db")  
}).catch((e)=>{
    console.log(e)
})

app.use("/post", (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (token) {
            let decoded = JWT.verify(token, "Auth")
            req.user = decoded.data,
                next()
        } else {
            res.json({
                status: "Failed",
                result: "Token is missing"
            })
        }
    } catch (e) {
        res.json({
            status: "Failed",
            message: e.message
        })
    }
})

// app.get("/", (res, req)=>{
//     console.log("ok")
// })

app.use("/", user_routes)
app.use("/", file_upload)

app.listen(port, ()=>{
    console.log("running")
})
