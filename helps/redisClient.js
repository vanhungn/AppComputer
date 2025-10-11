// redisClient.js
const { createClient } = require("redis");

const redisClient = createClient({
  url: "redis://Shoe:MyNewStrongPass123!@redis-19525.c278.us-east-1-4.ec2.redns.redis-cloud.com:19525",
});

// Bắt lỗi
redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));

// Kết nối ngay khi app start
(async () => {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected successfully");
   
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
  }
})();

module.exports = redisClient;
