const { Router } = require("express")
userRouter = Router()

userRouter.post("/signup", async(req, res) => {
    res.json({
        message: "user api created"
    })
})

module.exports = ({
    userRouter: userRouter
})