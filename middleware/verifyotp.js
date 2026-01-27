const Otp = require('../model/otp')
const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await Otp.deleteOne({ _id: record._id });

    return res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = VerifyOtp