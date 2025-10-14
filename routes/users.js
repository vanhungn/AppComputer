var express = require('express');
var router = express.Router();
const user = require('../controller/controllerUser')
/* GET users listing. */

router.post('/create',user.CreateUser)

module.exports = router;
