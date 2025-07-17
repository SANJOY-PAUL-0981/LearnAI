const { Router } = require("express")
chatRouter = Router()

chatRouter.post("/start", async(req, res) => {
    res.json({
        messagae: "chat api created"
    })
})

module.exports = ({
    chatRouter: chatRouter
})