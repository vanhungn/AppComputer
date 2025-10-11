const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaProduct = new Schema({
    name: String,
    price: Number,
    discount: Number,
    desc: String,
    typeProduct: String,
    picture: [String]
}, { timestamp: true }, { collection: "products" })
module.exports = mongoose.model("products", SchemaProduct)