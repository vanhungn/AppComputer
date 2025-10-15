const CheckRole = async (req, res, next) => {
    try {
        const roles = req.user

        if (roles.role === "normal") {
            return res.status(403).json({
                message: "You are not an admin"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({ error })
    }
}
module.exports = CheckRole