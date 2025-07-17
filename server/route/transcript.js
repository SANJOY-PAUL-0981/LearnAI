const { Router } = require("express")
transcriptRouter = Router()

transcriptRouter.post("/generated", async(req, res) => {
    res.json({
        message: "transcript api created"
    })
})

module.exports = ({
    transcriptRouter: transcriptRouter
})