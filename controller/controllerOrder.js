const modelOrder = require('../model/order')
const modelProduct = require('../model/product')
const mongoose = require('mongoose')
const CreateOrder = async (req, res) => {
    try {
        const order = req.body

        if (!order || order.length < 0) {
            return res.status(400).json({
                message: "invite"
            })
        }


        await modelProduct.bulkWrite(
            order.map(item => ({
                updateOne: {
                    filter: { _id: item.idProduct },
                    update: {
                        $inc: { stock: -item.quantity },
                        $set: { updatedAt: new Date() }
                    }
                }
            }))
        );


        await modelOrder.insertMany(order.map(element => ({
            idUser: element.idUser,
            idProduct: element.idProduct,
            quantity: element.quantity,

            totalPrice: element.totalPrice,
            status: "Chưa thanh toán",
            address: element.address,
            payment: element.payment,

        })));
        return res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
module.exports = { CreateOrder }