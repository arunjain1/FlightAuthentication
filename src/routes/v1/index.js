const express = require("express");

const UserController = require('../../controllers/user-controller');
const { authValidator } = require("../../middlewares/index");

const router = express.Router();

router.post('/signup',authValidator,UserController.create);
router.post('/signin',authValidator,UserController.signIn)
router.post('/deleteUser',UserController.destory);
router.get('/user',UserController.getById);
router.get('/userEmail',UserController.getByEmail);
router.get('/isAdmin',UserController.isAdmin);

module.exports = router;