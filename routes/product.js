const express = require('express')
const router = express.Router()
const product = require('../controller/product')

router.get("/",product.GetProduct)
router.post('/create', product.CreateProduct)

module.exports = router