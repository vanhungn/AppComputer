const express = require('express')
const router = express.Router()
const product = require('../controller/product')

router.get("/",product.GetProduct)
router.get('/suggest/:id',product.RS)
router.get('/detail/:id',product.GetProductDetail)
router.post('/create', product.CreateProduct)


module.exports = router