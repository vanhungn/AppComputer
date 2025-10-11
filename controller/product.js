const { options } = require('../app')
const modelProduct = require('../model/product')
const CreateProduct = async (req, res) => {
    try {
        const { name, price, discount, typeProduct, desc, picture } = req.body
          if (!name|| !price|| !discount|| !typeProduct|| !desc|| !picture) {
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
        const skip = req.query.skip || 1;
        const limit = req.query.limit || 10;
        const query = {
            $match: {
                $or: [
                    { name: { $regex: search, $options: "i" } }
                ]
            }
        }
        const data = await modelProduct.aggregate([query, { $skip: (skip - 1) * limit }, { $limit: limit }])
        const dataLength = await modelProduct.aggregate([query])
        const total = Math.ceil(dataLength.length / limit);
        return res.status(200).json({
            data, total
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
const GetProductDetail = async (req, res) => {
    try {
        const id = req.params
        if (!id) {
            return res.status(404).json({
                message: "Information is missing"
            })
        }
        const data = await modelProduct.findById(id)
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
        await modelProduct.findByIdAndDelete({id})
    } catch (error) {
        return res.status(500).json({ error })
    }
}
module.exports = { CreateProduct, GetProduct, GetProductDetail,DeleteProduct }