const { follow } = require('../controllers/follow_controller');
var express = require('express');
var router = express.Router();

router.post('/follow', follow);

module.exports = router;