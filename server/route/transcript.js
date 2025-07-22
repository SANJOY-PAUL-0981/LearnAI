const { Router } = require("express")
const { userMiddleware } = require("../middleware/userMiddleware")
const axios = require("axios")
const { chatModel } = require("../model/db")
const { GoogleGenAI } = require("@google/genai")
const { GEMINI_API } = require("../config")
const { RAPID_API_KEY } = require("../config")

transcriptRouter = Router()

const ai = new GoogleGenAI({
    apiKey: GEMINI_API
});

// Fetch transcript and save route
transcriptRouter.post("/create", userMiddleware, async (req, res) => {

    // taking input
    const { videoUrl } = req.body
    const userId = req.userId

    // checking video availablity
    if (!videoUrl) {
        return res.status(400).json({
            error: "Enter Video URL",
            code: 400
        })
    }

    try {
        // API call for transcription
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

        // transcription availabilty check
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

// transcript summarizer
transcriptRouter.get("/summarize/:chatId", userMiddleware, async (req, res) => {
    const userId = req.userId
    const chatId = req.params.chatId

    const chat = await chatModel.findOne({
        _id: chatId,
        userId: userId
    })

    const transcript = chat.transcription

    const prompt = `You are an educational assistant.

                Below is a transcript from a video:
                ---
                ${transcript}
                ---
                YOU HAVE TO ONLY SUMMARIZE THE GIVEN TRANSCRIPT IN A SMALL PARAGRAPTH WHICH WILL BE SIMPLE TO UNDERSTAND AND READ AND PLEASE PLEASE EXPLAIN EVERY TOPIC EVERY WORDS RELETED TO THE SUBJECT AT LEAST GIVE DEFINATION OF THOSE TOPICS AND EXAMPLE, MINIMUM 70% OF TOTAL CHARACTERS OF TRANSCRIPT MUST BE IN THE SUMMARY, JUST ACT LIKE A TEACHER`

    try{
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        console.log(response.text)

        res.json({
            message: "Successfully generated response",
            response: response.text
        })
    }catch(error){
        console.error(error.message)
        res.status(500).json({
            message: "Something Went Wrong, Gemini Failed to produce summary",
            code: 500
        })
    }
})

module.exports = ({
    transcriptRouter: transcriptRouter
})