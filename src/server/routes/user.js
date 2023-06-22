const express = require("express")
const { User } = require("../../database/models/User")

const router = express.Router()

router.get("/:id", (req, res) => {
    const id = req.params.id
    User
        .findOne({ _id: id })
        .then((user) => res.status(200).json(user))
        .catch(() => res.status(404).send({ message: "User not found" }))
}) 

module.exports = router