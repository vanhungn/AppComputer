const axios = require('axios');
const crypto = require('crypto');
const modelOrder = require('../model/order')

const Momo = async (req, res) => {
    try {
        const orders = req.body;
        if (!orders || orders.length < 0) {
            return res.status(400).json({
                message: "invite"
            })
        }
        const amounts = orders.reduce((a,b)=>a+b.totalPrice,0)
        // Encode thành base64
        const extraDatas = Buffer.from(JSON.stringify(orders)).toString("base64");
        const accessKey = "F8BBA842ECF85";
        const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
        const orderInfo = "pay with MoMo";
        const partnerCode = "MOMO";
        const redirectUrl = "https://shoe-122b.onrender.com/api/momo/notify";
        const ipnUrl = "https://shoe-122b.onrender.com/api/momo/notify";
        const requestType = "payWithMethod";
        const amount = amounts;
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;

        const extraData = extraDatas;
        const autoCapture = true;
        const lang = "vi";

        // raw signature
        const rawSignature =
            `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}` +
            `&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}` +
            `&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

        // signature
        const signature = crypto
            .createHmac("sha256", secretKey)
            .update(rawSignature)
            .digest("hex");

        // body gửi MoMo
        const requestBody = {
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang,
            requestType,
            autoCapture,
            extraData,
            signature,
        };

        // gọi API MoMo
        const response = await axios.post(
            "https://test-payment.momo.vn/v2/gateway/api/create",
            requestBody,
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("MoMo response:", response.data);

        // trả dữ liệu thật cho Postman
        return res.status(200).json(response.data);

    } catch (error) {
        console.error("MoMo error:", error.message, error.response?.data);
        return res.status(500).json({
            error: error.message,
            details: error.response?.data,
        });
    }
};
const CreateOrder = async(req,res)=>{
    try {
         const { orderId, resultCode, transId, extraData } = req.query;

    if (Number(resultCode) === 0) {
      const orders = JSON.parse(Buffer.from(extraData, "base64").toString("utf-8"));

      await modelOrder.insertMany(
        orders.map(item => ({
          idUser: item.idUser,
          idProduct: item.idProduct,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        }))
      );

      console.log("Orders created for orderId:", orderId);
       } else {
      console.log("Payment failed for orderId:", orderId);
    }

    res.status(200).json({ message: "Received" });
    } catch (error) {
         return res.status(500).json({
            error: error.message,
        });
    }
}
module.exports = {Momo,CreateOrder};
