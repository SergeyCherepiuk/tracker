const mongoose = require("mongoose")

const elementSchema = new mongoose.Schema({
    title: String,
    category: String,
    isExpense: Boolean,
    amount: Number,
    date: Date,
})
const Element = mongoose.model("element", elementSchema)

module.exports = Element