const mongoose = require('mongoose')
const schema = mongoose.Schema;

const otpSchema = new schema({
  email: String,
  otp: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 180 // 3 phút
  }
}, { collection: "otps" });

module.exports = mongoose.model("otps", otpSchema);
