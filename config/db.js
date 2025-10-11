const mongoose = require('mongoose')
require("dotenv").config()
const ConnectData = async () => {
    try {
        await mongoose.connect(process.env.URL)

        console.log("Connect success")

    } catch (error) {
        console.log("Can not connect")
    }
}
module.exports =ConnectData