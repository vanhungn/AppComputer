const modelUsers = require('../model/user')
const bcrypt = require('bcrypt')
const CreateUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body
        if (!name || !phone || !email || !password) {
            return res.status(400).json({
                message: "Information is missing"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassWord = bcrypt.hashSync(password, salt);
        await modelUsers.create({ name, phone, email, password: hashPassWord, role: "normal" })
        return res.status(200).json({
            message: "success"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}
module.exports = {
    CreateUser
}