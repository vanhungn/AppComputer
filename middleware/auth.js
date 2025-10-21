const jwt = require("jsonwebtoken")
require('dotenv').config();
const Auth = (req, res, next) => {
    try {
        const header = req.headers['authorization'];
        if (!header) {
            return res.status(400).json({
                message: "Token is incorrect"
            })
        }
        jwt.verify(header, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                console.log(err)
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({
                        message: 'Token expired',
                    });
                } else {
                    res.status(400).json({ error: 'Invalid token' });
                    return;
                }
            } else {
                req.user = user;
                next();
            }
        })
    } catch (error) {
        return res.status(404).json({
            message: error,
        });
    }

}
module.exports = Auth