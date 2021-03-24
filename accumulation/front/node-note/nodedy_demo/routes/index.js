const express = require('express');
const router = express.Router();
const cate = require('../controllers/cateController');

// 注册获取分类路由
router.get('/', cate.getCate);

// 注册获取指定分类的文章路由
router.get('/getPostCate', cate.getPostCate);

module.exports = router;