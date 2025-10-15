const mongoose = require('mongoose')
const schema = mongoose.Schema;
const modelOrder = new schema({
    idUser: { type: mongoose.Types.ObjectId, ref: "users" },
    idProduct: { type: mongoose.Types.ObjectId, ref: "products" },
    quantity: Number,
    totalPrice: Number,
    status: String,
    address:String,
    payment:String,
}, { timestamps: true }, { collection: "orders" })
module.exports = mongoose.model('orders', modelOrder)