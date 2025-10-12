require("dotenv").config();
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

// Hàm gửi SMS
async function sendSMS(phone, message) {
    const sns = new SNSClient({
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        },
    });

    const params = {
        Message: message,
        PhoneNumber: phone,
        MessageAttributes: {
            "AWS.SNS.SMS.SenderID": {
                DataType: "String",
                StringValue: "ShoeTOKYO", 
            },
            "AWS.SNS.SMS.SMSType": {
                DataType: "String",
                StringValue: "Transactional",
            },
        },
    };

    const command = new PublishCommand(params);
    const result = await sns.send(command);
    console.log(`SMS sent to ${phone}:`, result);
}

// Export hàm gửi SMS
module.exports = sendSMS;