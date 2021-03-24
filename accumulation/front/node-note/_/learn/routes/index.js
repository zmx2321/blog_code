var express = require('express');
var router = express.Router();
const { getCate, postCate } = require('../controllers/cate_controller');
/* GET home page. */
router.get('/', getCate);
router.get('/postCate', postCate);
module.exports = router;
