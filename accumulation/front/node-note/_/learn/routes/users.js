var express = require('express');
const multer = require('multer');
var router = express.Router();
const { sendCode, codePhoneLogin, login, editUserInfo, setPassword, bindEmail, logOut, uploadfile, upMorefile, publish } = require('../controllers/user_controller');
const upload = multer({dest: './public/uploads/'}).single('file');       // 单图上传
const moreUpload = multer({dest: './public/uploads/'}).array('file', 9); // 多图上传 
/* GET users listing. */
router.post('/sendCode', sendCode);
router.post('/codePhoneLogin', codePhoneLogin);
router.post('/login', login);
router.post('/editUserInfo', editUserInfo);
router.post('/setPassword', setPassword);
router.post('/bindEmail', bindEmail);
router.post('/logOut', logOut);
router.post('/editUserAvatar', upload, uploadfile);
router.post('/uploadMoreImg', moreUpload, upMorefile);
router.post('/publish', publish);


module.exports = router;
