const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    education: {
        type: String // fill this for better results from AI
    },
    password: {
        type: String,
        required: true
    }
})

const messageSchema = new Schema({
    role: {
        type: String,
        enum: ['user', 'ai'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

const chatSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user',
        index: true,
    },
    transcription: {
        type: String,
    },
    messages: [messageSchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // Activate it when will be needed
    /*lastActiveAt: {
        type: Date,
        default: Date.now,
        expires: 10 // 10 sec for testing, for real it will be 3600
    }*/
})

const userModel = mongoose.model("user", userSchema)
const messageModel = mongoose.model("message", messageSchema)
const chatModel = mongoose.model("chat", chatSchema)

module.exports = ({
    userModel,
    messageModel,
    chatModel
})