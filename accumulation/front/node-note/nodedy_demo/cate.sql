-- 如果存在，删除
DROP DATABASE IF EXISTS exapp;

-- 创建数据库
CREATE DATABASE exapp;

-- 使用数据库
use exapp;

-- 分类表(cate)
-- 如果存在，删除表
DROP TABLE IF EXISTS cate;

CREATE TABLE `cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB CHARSET=utf8;

-- 创建测试数据
INSERT INTO cate(`category`, `status`, `create_time`) VALUES('生活用品', 1, '2021-03-24 11:30:58');


-- 文章表(post)
-- 如果存在，删除表
DROP TABLE IF EXISTS post;

CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cate_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB CHARSET=utf8;

-- 创建测试数据
INSERT INTO post(`name`, `pic`, `desc`, `cate_id`, `create_time`) 
VALUES('洗衣液', '/test/1.jpg', '洗衣液文章洗衣液文章洗衣液文章洗衣液文章洗衣液文章', '1', '2021-03-24 13:13:04');

-- select * from post where cate_id = 1

-- 用户表(user)
-- 如果存在，删除表
DROP TABLE IF EXISTS user;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `userpic` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB CHARSET=utf8;

-- 创建测试数据
INSERT INTO `user`(`username`, `userpic`, `password`, `phone`, `email`, `status`, `create_time`) 
VALUES('张三', '/test/1.jpg', '123456', '13765471268', 'xx@163.com', '1', '2021-03-24 16:11:57');

-- 用户表(userinfo)
-- 如果存在，删除表
DROP TABLE IF EXISTS userinfo;

CREATE TABLE `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `birthday` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=INNODB CHARSET=utf8;

-- 创建测试数据
INSERT INTO `userinfo`(`userid`, `age`, `sex`, `path`, `birthday`) 
VALUES(1, 10, '男', 'xxx街道', '2006-03-24');