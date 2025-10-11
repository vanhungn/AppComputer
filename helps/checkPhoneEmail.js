const modelUser = require('../model/modelUsers')
const CheckPhoneEmail = async (req, res) => {
    try {
        const { phone, email } = req.body
        const check = await modelUser.findOne({
            $or: [{ phone }, { email }]
        })
        if (check) {
            return res.status(400).json({
                message: "Phone or email existed"
            })
        }
        return res.status(200).json({
            message: "pass"
        })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
module.exports = CheckPhoneEmail