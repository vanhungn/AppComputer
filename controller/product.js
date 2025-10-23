const { options } = require('../app')
const modelProduct = require('../model/product')
const CreateProduct = async (req, res) => {
    try {
        const { name, price, discount, typeProduct, desc, picture } = req.body
        if (!name || !price || !discount || !typeProduct || !desc || !picture) {
            return res.status(404).json({
                message: "Information is missing"
            })
        }
        const data = await modelProduct.create({
            name, price, discount, typeProduct, desc, picture
        })
        return res.status(200).json({
            data
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}
const GetProduct = async (req, res) => {
    try {
        const search = req.query.search || "";
        const type = req.query.type
        const sale = req.query.sale
        const skip = parseInt(req.query.skip) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {
            $match: {
                ...(type && { typeProduct: type === "null" ? null : type }),
                ...(sale && { discount: sale === "null" ? null : { $gt: 10 } }),
                $or: [
                    { name: { $regex: search, $options: "i" } }
                ]
            }
        }
        const data = await modelProduct.aggregate([query, { $skip: (skip - 1) * limit }, { $limit: limit }])
        const dataLength = await modelProduct.aggregate([query])
        const total = Math.ceil(dataLength.length / limit);
        const typeOf = [];
        const origin = [];
        dataLength.forEach(item => {
            if (!typeOf.includes(item.typeProduct)) {
                typeOf.push(item.typeProduct)
            }
            if (!origin.includes(item.origin)) {
                origin.push(item.origin)
            }
        })
        return res.status(200).json({
            data, total, dataLength: dataLength.length, typeOf, origin
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
const GetProductDetail = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                message: "Information is missing"
            })
        }
        const data = await modelProduct.findById({ _id: id })
        return res.status(200).json({
            data
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
const DeleteProduct = async (req, res) => {
    try {
        const id = req.params
        if (!id) {
            return res.status(404).json({
                message: "Information is missing"
            })
        }
        await modelProduct.findByIdAndDelete({ id })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
module.exports = { CreateProduct, GetProduct, GetProductDetail, DeleteProduct }