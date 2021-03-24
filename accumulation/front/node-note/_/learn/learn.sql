/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50562
Source Host           : localhost:3306
Source Database       : learn

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2021-02-25 14:28:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cate`
-- ----------------------------
DROP TABLE IF EXISTS `cate`;
CREATE TABLE `cate` (
  `id` int(11) NOT NULL DEFAULT '0',
  `category` varchar(255) DEFAULT NULL,
  `status` tinyint(4) NOT NULL,
  `created__time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cate
-- ----------------------------

-- ----------------------------
-- Table structure for `follow`
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follow_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of follow
-- ----------------------------

-- ----------------------------
-- Table structure for `image`
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `create_time` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES ('65', 'http://localhost:3000/uploads/730e0cf3d7ca7bcbee8f80f468b27d6bf424a8bd.jpeg', null, '1614222369429');
INSERT INTO `image` VALUES ('66', 'http://localhost:3000/uploads/3801213fb80e7bec2a922352f995af309a506b78.jpeg', null, '1614222369505');
INSERT INTO `image` VALUES ('67', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854.gif', null, '1614222369511');
INSERT INTO `image` VALUES ('68', 'http://localhost:3000/uploads/c17345a23b00d07044d835c193d10a49.jpg', null, '1614222369508');
INSERT INTO `image` VALUES ('69', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86.jpeg', null, '1614222369513');
INSERT INTO `image` VALUES ('70', 'http://localhost:3000/uploads/myFile.gif', null, '1614222369516');
INSERT INTO `image` VALUES ('71', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854 - o, - o,.gif', null, '1614223409808');
INSERT INTO `image` VALUES ('72', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854 - o, (2).gif', null, '1614223409892');
INSERT INTO `image` VALUES ('73', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854 - o,.gif', null, '1614223409896');
INSERT INTO `image` VALUES ('74', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86 - o, (2).jpeg', null, '1614223409907');
INSERT INTO `image` VALUES ('75', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86 - o,.jpeg', null, '1614223409913');
INSERT INTO `image` VALUES ('76', 'http://localhost:3000/uploads/myFile - o,.gif', null, '1614223409920');
INSERT INTO `image` VALUES ('77', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86.jpeg', null, '1614223409916');
INSERT INTO `image` VALUES ('78', 'http://localhost:3000/uploads/myFile.gif', null, '1614223409924');
INSERT INTO `image` VALUES ('79', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854 - o, - o,.gif', null, '1614225035235');
INSERT INTO `image` VALUES ('80', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854 - o, (2).gif', null, '1614225035310');
INSERT INTO `image` VALUES ('81', 'http://localhost:3000/uploads/dong_8f1d47bcb77d74a1e029d8cbb3b33854 - o,.gif', null, '1614225035312');
INSERT INTO `image` VALUES ('82', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86 - o, (2).jpeg', null, '1614225035314');
INSERT INTO `image` VALUES ('83', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86 - o,.jpeg', null, '1614225035316');
INSERT INTO `image` VALUES ('84', 'http://localhost:3000/uploads/f9dcd100baa1cd11ca7b589e61a9def4c1ce2d86.jpeg', null, '1614225035318');
INSERT INTO `image` VALUES ('85', 'http://localhost:3000/uploads/myFile - o,.gif', null, '1614225035321');
INSERT INTO `image` VALUES ('86', 'http://localhost:3000/uploads/myFile.gif', null, '1614225035324');

-- ----------------------------
-- Table structure for `list`
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `visible` tinyint(4) DEFAULT '0',
  `create_time` bigint(20) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('1', '2', '大大的标题', 'www.china.com', '0', '1614228760588', 'dadadasda', 'china');
INSERT INTO `list` VALUES ('2', '2', '大大的标题', 'www.china.com', '0', '1614228874373', 'dadadasda', 'china');
INSERT INTO `list` VALUES ('3', '2', '大大的标题', 'www.china.com', '0', '1614228922332', 'dadadasda', 'china');
INSERT INTO `list` VALUES ('4', '2', '大大的标题', 'www.china.com', '0', '1614229009922', 'dadadasda', 'china');

-- ----------------------------
-- Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `desc` varchar(255) DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES ('1', '张三', '大大的张', '简单的描述', '1', '2021-02-18 18:10:59');
INSERT INTO `post` VALUES ('2', '李四', '小小的李', ' 简单的描述', '2', '2021-02-18 18:11:29');
INSERT INTO `post` VALUES ('3', '王五', '隔壁的小王', '简单的描述', '3', '2021-02-18 18:12:15');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `create_time` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '猪八戒', 'http://localhost:3000/uploads/CachedImage_1920_1080_POS3.jpg', '13545', '13545082873', 'zzzssswwwqqq', 'true', '1613721290328');
INSERT INTO `user` VALUES ('2', '13545082873', 'http://localhost:3000/uploads/CachedImage_1920_1080_POS3.jpg', '123456', '13476036972', '736511583@qq.com', null, '1613721290328');

-- ----------------------------
-- Table structure for `userinfo`
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL DEFAULT '',
  `age` decimal(10,0) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('1', '1', '255', '男', 'www.sina.com.cn', '', '网络工程师');
