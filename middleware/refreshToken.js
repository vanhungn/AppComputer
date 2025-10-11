const createToken = require('../helps/token')
const RefreshToken=async(req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken; // lấy từ cookie
    if (!refreshToken) return res.sendStatus(401);
     const accessToken = await createToken({},'15m','accessToken')
     res.status(200).json({
        accessToken
     })
    } catch (error) {
         res.status(500).json(error)
    }
}
module.exports = RefreshToken