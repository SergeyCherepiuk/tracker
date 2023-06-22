const auth_config = require("../../config/auth")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { _id: this._id },
        auth_config.secret_key,
        { expiresIn: "7d" }
    )
    return token
}
const User = mongoose.model("users", userSchema)

const validateSignUp = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label("First name"),
        lastName: joi.string().required().label("Last name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

const validateLogIn = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = { User, validateSignUp, validateLogIn }