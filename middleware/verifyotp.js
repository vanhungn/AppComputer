const redisClient = require("../helps/redisClient");

const VerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("👉 Request body:", req.body);

    if (!email || !otp) {
      return res.status(400).json({ message: "email or OTP is missing" });
    }

    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    await redisClient.del(`otp:${email}`);

    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = VerifyOtp;
