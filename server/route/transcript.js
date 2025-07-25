const { Router } = require("express")
const { userMiddleware } = require("../middleware/userMiddleware")
const axios = require("axios")
const { chatModel } = require("../model/db")
const { GoogleGenAI } = require("@google/genai")
const { PDFDocument } = require("pdfkit")
const { GEMINI_API } = require("../config")
const { RAPID_API_KEY } = require("../config")
const { YOUTUBE_API } = require("../config")

transcriptRouter = Router()
const ai = new GoogleGenAI({
    apiKey: GEMINI_API
});

// Fetch transcript and save route
transcriptRouter.post("/create", userMiddleware, async (req, res) => {
    const { videoUrl } = req.body;
    const userId = req.userId;

    if (!videoUrl) {
        return res.status(400).json({
            error: "Enter Video URL",
            code: 400
        });
    }

    function extractVideoId(url) {
        const regex =
            /(?:youtube\.com.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
        return res.status(400).json({
            error: "Invalid YouTube URL",
            code: 400
        });
    }

    let videoTitle = "";
    try {
        const apiRes = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API}`);
        const data = await apiRes.json();
        videoTitle = data.items?.[0]?.snippet?.title || "Untitled Video";
    } catch (err) {
        console.error("Error fetching video title:", err);
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

        const response = await axios.request(options);
        const transcript = response.data.transcript;

        if (!transcript || transcript.trim() === "") {
            return res.status(404).json({
                message: "Transcription not found",
                code: 404
            });
        }

        const chat = await chatModel.create({
            userId,
            transcription: transcript,
            videoTitle
        });

        return res.json({
            chatId: chat._id,
            chat
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch transcript",
            error: err.message
        });
    }
});

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

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        // 1. Generate PDF
        const PDFDocument = require('pdfkit');
        const doc = new PDFDocument();

        // 2. Set headers to trigger download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=summary.pdf');

        // 3. Pipe the PDF to response
        doc.pipe(res);

        // 4. Add summary content to PDF
        doc.fontSize(20).text('Transcript Summary', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(response.text, {
            align: 'left',
            lineGap: 4
        });

        doc.end();

    } catch (error) {
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