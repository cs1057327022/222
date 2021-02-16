const express = require('express');
const router = express.Router();

const { login,register,getUserInfo } = require('../controls/userControl');

router.post('/login', login)
router.post('/register',register)
router.post('/userInfo', getUserInfo)

module.exports = router