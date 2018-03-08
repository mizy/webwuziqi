-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014 年 02 月 10 日 18:00
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `wuziqi`
--

-- --------------------------------------------------------

--
-- 表的结构 `room`
--

CREATE TABLE IF NOT EXISTS `room` (
  `roomname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `roomsize` int(10) NOT NULL,
  `color` varchar(10) CHARACTER SET utf8 NOT NULL COMMENT '颜色',
  `user` varchar(30) CHARACTER SET utf8 NOT NULL,
  `player` varchar(30) CHARACTER SET utf8 NOT NULL,
  `userxy` varchar(10) CHARACTER SET utf8 NOT NULL,
  `playxy` varchar(10) CHARACTER SET utf8 NOT NULL,
  `start` tinyint(1) NOT NULL,
  PRIMARY KEY (`roomname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

DELIMITER $$
--
-- 事件
--
CREATE DEFINER=`root`@`localhost` EVENT `myevent` ON SCHEDULE AT '2014-02-11 01:15:08' ON COMPLETION NOT PRESERVE ENABLE DO delete from room where roomname=''$$

CREATE DEFINER=`root`@`localhost` EVENT `mydevent` ON SCHEDULE AT '2014-02-11 01:20:10' ON COMPLETION NOT PRESERVE ENABLE DO delete from room where roomname='s'$$

CREATE DEFINER=`root`@`localhost` EVENT `sss` ON SCHEDULE AT '2014-02-11 02:29:17' ON COMPLETION NOT PRESERVE ENABLE DO delete from room where roomname='sss'$$

CREATE DEFINER=`root`@`localhost` EVENT `人` ON SCHEDULE AT '2014-02-11 02:29:46' ON COMPLETION NOT PRESERVE ENABLE DO delete from room where roomname='人'$$

CREATE DEFINER=`root`@`localhost` EVENT `的` ON SCHEDULE AT '2014-02-11 02:29:57' ON COMPLETION NOT PRESERVE ENABLE DO delete from room where roomname='的'$$

DELIMITER ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
