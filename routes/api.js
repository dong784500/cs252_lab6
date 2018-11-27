var express = require('express');
var router = express.Router();
const controller = require('../controller/api')
const authController = require('../controller/auth')
const validate = require('../controller/auth.validate.js')

router.post('/search', controller.search);
router.post('/question', controller.question);
router.post('/register',
validate.register,
authController.register)
router.post('/login',
    validate.login,
    authController.login)
module.exports = router;
