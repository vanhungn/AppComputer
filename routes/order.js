const express = require('express')
const router = express.Router()
const order = require('../controller/controllerOrder')
router.post("/create",order.CreateOrder)
module.exports = router