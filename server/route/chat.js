const { Router } = require("express")
const { userMiddleware } = require("../middleware/userMiddleware")
const { chatModel, messageModel } = require("../model/db")
const { z } = require("zod")
const leoProfanity = require("leo-profanity");
const { default: axios } = require("axios");
const { GoogleGenAI } = require("@google/genai")
const { GEMINI_API } = require("../config")

const ai = new GoogleGenAI({
    apiKey: GEMINI_API
});

chatRouter = Router()

// Send Message Route
chatRouter.post("/send", userMiddleware, async (req, res) => {

    // zod validation
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

    // taking input
    const { role, content, chatId } = req.body
    const userId = req.userId

    try {
        // checking content availablity
        if (!content) {
            return res.status(400).json({
                message: "Enter Something",
                code: 400
            })
        }

        // bad words check
        const hasBadWords = leoProfanity.check(content)
        if (hasBadWords) {
            return res.status(403).json({
                message: "Inappropriate language detected",
                code: 403
            })
        }

        // message doc create
        const userMessages = await messageModel.create({
            userId: userId,
            chatId: chatId,
            role: "user",
            content: content
        })

        const userQuestion = userMessages.content
        // transcript
        const chatTranscript = await chatModel.findOne({
            _id: chatId,
            userId: userId
        })

        if (!chatTranscript) {
            return res.status(404).json({
                message: "Chat not found or Unauthorized",
                code: 404
            })
        }

        const transcript = chatTranscript.transcription

        const lastMessages = await messageModel
            .find({ chatId: chatId, userId: userId })
            .sort({ createdAt: -1 })
            .limit(12);

        const formattedConversation = lastMessages
            .reverse()
            .map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`)
            .join('\n');


        const prompt = ` You are an educational assistant. Below is a transcript from a video:
        ---
        ${transcript}
        ---

        Also, here is the recent conversation between you and the user:
        ---
        ${formattedConversation}
        ---
        You can only answer questions that are:
        1. Related to the above transcript
        2. Or about educational topics like science, math, history, geography, and technology
        3. You can ans question out of the transcription
        4. If the user wants the response in hindi then you should give response in hindi

        If the question is unrelated to both the transcript and general education, reply strictly with:
        "I can not answer anything out of education so please ask me anything about science, math etc."

        Only give concise and factual answers. Do not entertain personal, political, or entertainment-based questions.

        Now answer this question:
        ${userQuestion}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        const aiMessages = await messageModel.create({
            userId: userId,
            chatId: chatId,
            role: "ai",
            content: response.text
        })

        const aiResponse = aiMessages.content

        // message push in chatModel
        const chat = await chatModel.findOneAndUpdate(
            { _id: chatId, userId: userId },
            {
                $set: { updatedAt: new Date() },

                $push: {
                    messages: { $each: [userMessages, aiMessages] }
                }
            }
        )

        return res.json({
            message: "Message Sent",
            userQuestion,
            aiResponse
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            code: 500,
            error: error.message
        })
    }
})

// Fetch all chats route
chatRouter.get("/all", userMiddleware, async (req, res) => {
    const userId = req.userId

    // fetching all chats of a user
    const userChats = await chatModel.find({
        userId: userId
    }).sort({ updatedAt: -1 }) // recently updated chats will come first

    return res.json({
        userChats
    })
})

// fetch everuthing of a perticular of a user chat
chatRouter.get("/history/:chatId", userMiddleware, async (req, res) => {
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

// delete chat
chatRouter.delete("/delete/:chatId", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId
        const chatId = req.params.chatId

        await chatModel.findOneAndDelete({
            _id: chatId,
            userId: userId
        })

        await messageModel.deleteMany({
            chatId: chatId,
            userId: userId
        })

        return res.json({
            message: "Chat successfully deleted"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            code: 500
        })
    }
})

module.exports = ({
    chatRouter: chatRouter
})