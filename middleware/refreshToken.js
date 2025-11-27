const createToken = require('../helps/token');
const jwt = require('jsonwebtoken');
const User = require('../model/user'); // Model user của bạn

const RefreshToken = async (req, res) => {
    try {
        // Lấy refresh token từ cookie
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Không tìm thấy refresh token' });
        }
        // Xác thực refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
        console.log(decoded)

        // Tìm user trong database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy user' });
        }

        // Tạo payload có thông tin user
        const payload = {
            id: user._id,
            phone: user.phone,
            role: user.role
        };

        // Tạo access token mới
        const accessToken = await createToken(payload, '15m', 'accessToken');

        return res.status(200).json({
            success: true,
            accessToken,
            data: { name: user.name, id: user._id, role: user.role }
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Refresh token không hợp lệ' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Refresh token đã hết hạn' });
        }
        console.error('Lỗi refresh token:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = RefreshToken;