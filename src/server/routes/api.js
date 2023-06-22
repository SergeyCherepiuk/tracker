const { Element } = require("../../database/models/Element")
const ElementController = require("../../database/controllers/ElementController")
const express = require("express")
const { default: mongoose } = require("mongoose")

const router = express.Router()

router.get("/element/:id", (req, res) => {
    const id = req.params.id
    Element
        .findOne({ _id: id })
        .then(data => res.json(data))
        .catch(() => res.sendStatus(404))
})

router.post("/element", (req, res) => {
    ElementController.insert(req, res)
})

router.put("/element", (req, res) => {
    ElementController.update(req, res)
})

router.delete("/element", (req, res) => {
    ElementController.delete(req, res)
})

router.get("/:userId/elements/day", (req, res) => {
    const userId = req.params.userId
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    Element
        .find({ date: { $gte: today.toISOString() }, userId: userId })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/:userId/elements/week", (req, res) => {
    const userId = req.params.userId
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setDate(today.getDate() - 7)
    Element
        .find({ date: { $gte: today }, userId: userId })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/:userId/elements/month", (req, res) => {
    const userId = req.params.userId
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setMonth(today.getMonth() - 1)
    Element
        .find({ date: { $gte: today }, userId: userId })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/:userId/elements/previous-month", (req, res) => {
    const userId = req.params.userId
    const oneMonthAgo = new Date()
    const twoMonthsAgo = new Date()
    oneMonthAgo.setHours(0, 0, 0, 0)
    twoMonthsAgo.setHours(0, 0, 0, 0)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2)
    Element
        .find({
            date: {
                $gte: twoMonthsAgo,
                $lte: oneMonthAgo
            },
            userId: userId
        })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/:userId/elements/3-months", (req, res) => {
    const userId = req.params.userId
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setMonth(today.getMonth() - 3)
    Element
        .find({ date: { $gte: today }, userId: userId })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/:userId/elements/year", (req, res) => {
    const userId = req.params.userId
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setFullYear(today.getFullYear() - 1)
    Element
        .find({ date: { $gte: today }, userId: userId })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/:userId/elements/all", (req, res) => {
    const userId = req.params.userId
    Element
        .find({ userId: userId })
        .sort({ date: -1 })
        .exec()
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router