const mongoose = require("mongoose")
const joi = require("joi")

const elementSchema = new mongoose.Schema({
    title: String,
    category: String,
    isExpense: Boolean,
    amount: Number,
    date: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})
const Element = mongoose.model("elements", elementSchema)

const validate = (data) => {
    const schema = joi.object({
        _id: joi.string().label("_id"),
        title: joi.string().required().label("Title"),
        category: joi.string().required().label("Category"),
        isExpense: joi.boolean().required().label("Is expense"),
        amount: joi.number().required().label("Amount"),
        date: joi.date().required().label("Date"),
        userId: joi.string().required().label("User ID"),
        __v: joi.number().label("__v")
    })
    return schema.validate(data)
}

module.exports = { Element, validate }