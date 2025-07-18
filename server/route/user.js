const { userModel } = require('../model/db')
const bcrypt = require("bcrypt")
const { z, string } = require("zod")

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

    const parsedData = requireBody.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Incorrect Format",
            code: 400,
            error: parsedData.error
        })
    }

    const { email, username, education, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            email: email,
            username: username,
            education: education,
            password: hashedPassword
        })

        res.json({
            message: "User Signed Up",
            user // will remove this in prod
        })

    } catch (err) {
        return res.status(409).json({
            message: "An account already exists with this gmail",
            code: 409
        })
    }
})

//signin route

module.exports = ({
    userRouter: userRouter
})