const { Element, validate } = require("../models/Element")


class ElementController {
	constructor() {  }

    async insert(req, res) {
        console.log(req.body)
        const { error } = validate(req.body)
        if (error) {
            return res
                .status(400) // Bad request
                .send({ message: error.details[0].message })
        }

        let element = new Element()
        element.title = req.body.title
        element.category = req.body.category
        element.isExpense = req.body.isExpense
        element.amount = req.body.amount
        element.date = req.body.date
        element.userId = req.body.userId
        await element.save()
            .then(() => res.status(200).send({ message: "Element add successfully" }))
            .catch(() => res.status(500).send({ message: "Internal server error!" }))
    }

    async update(req, res) {
        const { error } = validate(req.body)
        if (error) {
            return res
                .status(400) // Bad request
                .send({ message: error.details[0].message })
        }

        Element
            .findByIdAndUpdate(req.body._id, req.body)
            .then(() => res.status(200).send({ message: "Element updated successfully" }))
            .catch(() => res.status(500).send({ message: "Internal server error!" }))
    }

    async delete(req, res) {
        await Element
            .findByIdAndRemove(req.body._id)
            .then(() => res.status(200).send({ message: "Element deleted successfully" }))
            .catch(() => res.status(500).send({ message: "Internal server error!" }))
    }
}

module.exports = new ElementController()