const express = require("express")
const router = express.Router()
const admin = require("../controller/controllerAdmin")
const multer = require('multer');
const verifyToken = require('../middleware/auth')
const checkRole = require('../helps/decentralization')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const originalName = file.originalname;
        const extension = originalName.split('.').pop();
        const filename = `${uniqueSuffix}.${extension}`;
        cb(null, filename);
    },
});

const upload = multer({
    storage: storage,
});

router.get('/get/user', verifyToken, checkRole, admin.GetUsers)
router.get("/get/order", verifyToken, checkRole, admin.GetOrder)
router.get('/detail/order/:_id', verifyToken, checkRole, admin.GetDetailOrder)
router.get('/detail/user/:id', verifyToken, checkRole, admin.DetailUser)
router.post('/create/user', verifyToken, checkRole, admin.CreateUser)
router.put('/update/order/:_id', admin.UpdateOrder)
router.post('/login', admin.Login)
router.post('/update/user', verifyToken, checkRole, admin.UpdateUser)
router.delete('/delete/user/:id', verifyToken, checkRole, admin.DeleteUser)
router.delete('/delete/order/:_id', verifyToken, checkRole, admin.deleteOrder)

module.exports = router