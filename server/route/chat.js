const { Router } = require("express")
const { userMiddleware } = require("../middleware/userMiddleware")
const { chatModel, messageModel } = require("../model/db")
const { z } = require("zod")

chatRouter = Router()

chatRouter.post("/send", userMiddleware, async (req, res) => {

    const requireBody = z.object({
        role: z.enum(['user', 'ai']),
        content: z.string().min(1, "Enter Something")
    })

    const parsedData = requireBody.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect Format",
            code: 400,
            error: parsedData.error
        })
    }

    const { role, content } = req.body
    const userId = req.userId

    try {
        if (!content) {
            return res.status(400).json({
                message: "Enter Something",
                code: 400
            })
        }

        const messages = await messageModel.create({
            userId: userId,
            role: role,
            content: content
        })

        const chat = await chatModel.updateOne(
            { userId: userId },
            {
                $set: { updatedAt: new Date() },

                $push: {
                    messages
                }
            }
        )

        return res.json({
            message: "Message Sent",
            messages, // will be removed in prod
            chat // will be removed in prod
        })
    } catch {
        return res.status(500).json({
            message: "Something Went Wrong",
            code: 500
        })
    }
})

chatRouter.get("/allChats", userMiddleware, async (req, res) => {
    const userId = req.userId

    const userChats = await chatModel.find({
        userId: userId
    })
    
    return res.json({
        userChats
    })
})

module.exports = ({
    chatRouter: chatRouter
})