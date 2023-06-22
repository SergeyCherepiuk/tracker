const express = require("express")
const { User, validateSignUp, validateLogIn } = require("../../database/models/User")
const bcrypt = require("bcrypt")

const router = express.Router()

router.post("/signup", async (req, res) => {
    console.log(req.body)
    try {
        const { error } = validateSignUp(req.body)
        if (error) {
            return res.status(400).send({ message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return res
                .status(409) // Conflict
                .send({ message: "Email is already taken!" })
        }

        const salt = await bcrypt.genSalt(Number(10)) // TODO: move salt out of here to the config file
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const savedUser = await new User({ ...req.body, password: hashPassword }).save()
        const token = savedUser.generateAuthToken() 
        res.status(201).send({ token: token, message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

router.post("/login", async (req, res) => {
    try {
        const { error } = validateLogIn(req.body);
        if (error) {
            return res
                .status(400) // Bad request
                .send({ message: error.details[0].message })
        }

        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res
                .status(401) // Unauthorized
                .send({ message: "Invalid email or password" })
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res
                .status(401) // Unauthorized
                .send({ message: "Invalid email or password" })
        }

        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Logged in successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal server error" })
    }
})

module.exports = router