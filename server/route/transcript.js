const { Router } = require("express")
const { userMiddleware } = require("../middleware/userMiddleware")
const axios = require("axios")
const { chatModel } = require("../model/db")
const { RAPID_API_KEY } = require("../config")

transcriptRouter = Router()

transcriptRouter.post("/create", userMiddleware, async (req, res) => {

    const { videoUrl } = req.body
    const userId = req.userId

    if (!videoUrl) {
        return res.status(400).json({
            error: "Enter Video URL",
            code: 400
        })
    }

    try {
        const options = {
            method: 'GET',
            url: 'https://fetch-youtube-transcript1.p.rapidapi.com/transcript-with-url',
            params: {
                url: videoUrl,
                flat_text: 'true'
            },
            headers: {
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': 'fetch-youtube-transcript1.p.rapidapi.com'
            }
        };

        const response = await axios.request(options)
        const transcript = response.data.transcript

        if (!transcript || transcript.trim() === "") {
            return res.status(404).json({
                message: "Transcription not found",
                code: 404
            })
        }

        const chat = await chatModel.create({
            userId: userId,
            transcription: transcript
        })

        const chatId = chat._id

        return res.json({
            chatId,
            chat
        })
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch transcript",
            error: err.message
        })
    }
})

module.exports = ({
    transcriptRouter: transcriptRouter
})