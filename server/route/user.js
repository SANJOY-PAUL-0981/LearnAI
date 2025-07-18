const { userModel, messageModel } = require('../model/db')
const bcrypt = require("bcrypt")
const { z, string } = require("zod")
const jwt = require("jsonwebtoken")
const { JWT_SECRET_USER } = require("../config")
const { userMiddleware } = require("../middleware/userMiddleware")

const { Router } = require("express")
userRouter = Router()

// signup route
userRouter.post("/signup", async (req, res) => {

    // zod for input verification before data reacing to db
    const requireBody = z.object({
        email: z.email()
            .min(3)
            .max(50),

        username: z.string()
            .min(1)
            .max(50),

        education: z.string()
            .min(5)
            .max(50)
            .optional(),

        password: z.string()
            .min(8)
            .max(20)
    })

    // parsing the payload from req.body
    const parsedData = requireBody.safeParse(req.body)

    // verifying the success of parsedData
    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect Format",
            code: 400,
            error: parsedData.error
        })
    }

    // taking payload
    const { email, username, education, password } = req.body

    try {
        // hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // creating the user
        const user = await userModel.create({
            email: email,
            username: username,
            education: education,
            password: hashedPassword
        })

        // jwt session creation at the time of signup
        const token = jwt.sign(
            {
                userId: user._id
            },
            JWT_SECRET_USER,
            {
                expiresIn: "14d"
            }
        )

        // response
        return res.json({
            message: "Signup successful. Logged in.",
            token,
        })

    } catch (err) {
        return res.status(409).json({
            message: "An account already exists with this gmail",
            code: 409
        })
    }
})

//signin route
userRouter.post("/login", async (req, res) => {

    // email & password payload
    const { email, username, password } = req.body;
    let user;

    // verifying username or gmail by using regex
    const regex = /^\S+@\S+\.\S+$/;
    const isValidEmail = regex.test(email)

    if (isValidEmail) {
        // searching user in payload email in db
        user = await userModel.findOne({
            email: email
        })
    } else {
        // searching user in payload username in db
        user = await userModel.findOne({
            username: username
        })
    }

    // sending error code if there is no user with that email
    if (!user) {
        return res.status(404).json({
            message: "There are no user with this email or username",
            code: 404
        })
    }

    // compere the hashed password
    const userPasswordMatched = await bcrypt.compare(password, user.password)

    // conditions for password mathced and unmatched
    if (userPasswordMatched) {
        const token = jwt.sign(
            {
                userId: user._id
            },
            JWT_SECRET_USER,
            {
                expiresIn: "14d"
            }
        )

        return res.json({
            message: "User logged in",
            token
        })
    } else {
        return res.status(401).json({
            message: "Incorrect Credentials",
            code: 401
        })
    }
})

// GET user data
userRouter.get("/userInfo", userMiddleware, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await userModel.findOne({
            _id: userId
        })

        return res.json({
            user
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            code: 500
        })
    }
})

module.exports = ({
    userRouter: userRouter
})