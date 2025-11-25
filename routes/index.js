var express = require('express');
var router = express.Router();

const Check = require('../helps/checkPhoneEmail')
const LoginGoogle = require('../controller/controllerLogin')
const RefreshToken = require('../middleware/refreshToken')
const VerifyOtp = require('../middleware/verifyotp')
const MoMo = require('../controller/controllerMomo')

/* GET home page. */
router.post('/refreshToken', RefreshToken)
router.post('/sendOTP', LoginGoogle.SendOtp)
router.post('/loginGoogle', LoginGoogle.LoginGoogle)
router.post('/login', LoginGoogle.Login)
router.post('/sendEmail', LoginGoogle.sendEmail)
router.post('/verifyOtp', VerifyOtp)
router.post('/check', Check)
router.post('/api/momo/test', MoMo.Momo)
router.get('/api/momo/notify', MoMo.CreateOrder)
module.exports = router;
