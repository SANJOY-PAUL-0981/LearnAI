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

    const { role, content, chatId } = req.body
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
            chatId: chatId,
            role: role,
            content: content
        })

        const chat = await chatModel.updateOne(
            { _id: chatId, userId: userId },
            {
                $set: { updatedAt: new Date() },

                $push: {
                    messages
                }
            }
        )

        return res.json({
            message: "Message Sent",
            chat //will remove in prod
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
    }).sort({ updatedAt: -1 })

    return res.json({
        userChats
    })
})

chatRouter.get("/convo/:chatId", userMiddleware, async (req, res) => {
    try {
        const chatId = req.params.chatId
        const userId = req.userId

        const chat = await chatModel.findOne({
            userId: userId,
            _id: chatId
        })

        if (!chat) {
            return res.status(404).json({
                message: "No chat found",
                code: 404
            })
        }

        return res.json({
            chat
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            code: 500
        })
    }
})

module.exports = ({
    chatRouter: chatRouter
})