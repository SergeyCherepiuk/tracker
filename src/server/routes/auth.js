const express = require("express")
const AuthController = require("../../database/controllers/AuthController")

const router = express.Router()

router.post("/signup", (req, res) => {
    AuthController.signUp(req, res)
})

router.post("/login", (req, res) => {
    AuthController.logIn(req, res)
})

router.delete("/delete", (req, res) => {
    AuthController.deleteUser(req, res)
})

module.exports = router