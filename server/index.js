require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { userRouter } = require("./route/user")
const { chatRouter } = require("./route/chat")
const { transcriptRouter } = require("./route/transcript")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/transcript", transcriptRouter)

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected successfully")
        app.listen(3000)
        console.log("App is listening on port 3000")
    } catch (err) {
        console.error("Error connecting to DB or Server", err.message)
    }
}

main()