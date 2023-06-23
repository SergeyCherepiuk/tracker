const { User, validateSignUp, validateLogIn } = require("../models/User")
const { Element } = require("../../database/models/Element")
const auth_config = require("../../config/auth")
const bcrypt = require("bcrypt")

class AuthController {
    constructor() { }

    async signUp(req, res) {
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
    
            const salt = await bcrypt.genSalt(Number(auth_config.salt))
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            const savedUser = await new User({ ...req.body, password: hashPassword }).save()
            const token = savedUser.generateAuthToken() 
            res.status(201).send({ token: token, message: "User created successfully" })
        } catch (error) {
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async logIn(req, res) {
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
    }

    async deleteUser(req, res) {
        const id = req.body.id
        Element
            .deleteMany({ userId: id })
            .then(() => {
                User
                    .findByIdAndDelete(id)
                    .then(() => res.status(200).send({ message: "User has been deleted successfully" }))
                    .catch(() => res.status(404).send({ message: "User not found" }))
            })
            .catch(() => res.status(500).send("Internal server error"))
    }
}

module.exports = new AuthController()