var express = require('express');
var router = express.Router();
const controller = require('../controller/api')

/* GET users listing. */
router.post('/search', api.search);

module.exports = router;
