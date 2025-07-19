const { Router } = require("express")
transcriptRouter = Router()
const { userMiddleware } = require("../middleware/userMiddleware")

transcriptRouter.post("/transcriptGeneration", userMiddleware, async(req, res) => {
    res.json({
        message: "transcript api created"
    })
})

module.exports = ({
    transcriptRouter: transcriptRouter
})