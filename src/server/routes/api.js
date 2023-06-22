const { Element } = require("../../database/models/Element")
const ElementController = require("../../database/controllers/ElementController")
const express = require("express")

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

router.get("/elements/day", (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    Element
        .find({ date: { $gte: today.toISOString() } })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/elements/week", (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setDate(today.getDate() - 7)
    Element
        .find({ date: { $gte: today } })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/elements/month", (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setMonth(today.getMonth() - 1)
    Element
        .find({ date: { $gte: today } })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/elements/previous-month", (req, res) => {
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
            }
        })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/elements/3-months", (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setMonth(today.getMonth() - 3)
    Element
        .find({ date: { $gte: today } })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/elements/year", (req, res) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    today.setFullYear(today.getFullYear() - 1)
    Element
        .find({ date: { $gte: today } })
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

router.get("/elements/all", (req, res) => {
    Element
        .find({})
        .sort({ date: -1 })
        .then(elements => res.json(elements))
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = router