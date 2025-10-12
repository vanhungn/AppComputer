var express = require('express');
var router = express.Router();

const Check = require('../helps/checkPhoneEmail')
const LoginGoogle = require('../controller/controllerLogin')
const RefreshToken = require('../middleware/refreshToken')
const VerifyOtp = require('../middleware/verifyotp')

/* GET home page. */
router.get('/refreshToken', RefreshToken)
router.post('/sendOTP', LoginGoogle.SendOtp)
router.post('/loginGoogle', LoginGoogle.LoginGoogle)
router.post('/login', LoginGoogle.Login)
router.post('/sendEmail', LoginGoogle.sendEmail)
router.post('/verifyOtp', VerifyOtp)
router.post('/check', Check)
module.exports = router;
