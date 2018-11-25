var express = require('express');
var router = express.Router();
const controller = require('../controller/api')

router.post('/search', controller.search);
router.post('/question', controller.question);

module.exports = router;
