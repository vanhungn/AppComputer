const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SchemaProduct = new Schema({
    name: String,
    phone: String,
    password: String,
    googleId: String,
    email: String,
    role:String,
    idMonitor:[{type:mongoose.Types.ObjectId,ref:"users"}]
}, { timestamp: true }, { collection: "users" })
module.exports = mongoose.model("users", SchemaProduct)