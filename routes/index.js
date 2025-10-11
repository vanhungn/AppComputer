var express = require('express');
var router = express.Router();
const login =  require("../controller/login")

/* GET home page. */
router.post("/login/google",login.LoginGoogle)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
