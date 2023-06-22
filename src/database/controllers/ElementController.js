const Element = require("../models/Element")

class ElementController {
	constructor() {  }

    async insert(req, res) {
        console.log(req.body)
        let element = new Element()
        element.title = req.body.title
        element.category = req.body.category
        element.isExpense = req.body.isExpense
        element.amount = req.body.amount
        element.date = req.body.date
        await element.save()
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log("Data insert error: " + err)
                res.sendStatus(500)
            })
    }

    async update(req, res) {
        Element
            .findByIdAndUpdate(req.body._id, req.body)
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log("Data update error: " + err)
                res.sendStatus(500)
            })
    }

    async delete(req, res) {
        await Element
            .findByIdAndRemove(req.body._id)
            .then(() => res.sendStatus(200))
            .catch((err) => {
                console.log("Data delete error: " + err)
                res.sendStatus(500)
            })
    }
}

module.exports = new ElementController()