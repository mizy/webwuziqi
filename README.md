# webwuziqi
在线五子棋，支持在线对站，和AI对战，这个项目是2013年应聘搜狐实习生做的笔试题

## web五子棋游戏功能文档
### 1.	文件目录
Wuziqi
------image     (图片目录)
------css			(样式表目录)
			-----main.css			(css文件)
------js			(javascript文件目录)
			--------ai.js	(电脑ai算法)
			--------joinroom.js	(加入房间的玩家运行js)
			--------jquery.min.js （jquery 库）
			--------play.js		(游戏大厅各种按键触发js函数)
			--------playajax.js	(更新游戏大厅的ajax函数)
			--------playchess.js		(房主运行的js函数)
-----lib			(php类，以及ajax调用页面目录)
			--------unloadRoom.php	(关闭页面删除房间)
			--------setstart.php		(设置游戏开始的页面)
			--------setsession.php	(设置输入用户名后的SESSION页面)
			--------setinfo.php		(设置传递过来的用户落子信息)
			--------roominfo.php			(ajax输出游戏大厅)
			--------map.class.php		(生成棋盘类)
			--------isstart.php			(ajax递归查询游戏是否开始)
			---------isplayer.php		(ajax递归是否有对手了)
			---------getinfo.php			(获取对手落子信息)
			---------DB.class.php		(数据库操作类)
			---------cron.php				（后天运行删除该房间)
			---------config.php			(返回1)最终没有用
			---------checkRoom.php		(查看房间名重复)没用
			---------changecolor.php	(房主重新选颜色)没用
------creatRoom.php			(建立房间页面)
------creatRoom_ok.php		(建房数据处理页面)
------index.php				(首页)
------joinRoom.php			(加入房间的页面)
------play.php				(游戏大厅页面)
------playAI.php				(人机对战页面)
------room.php				(房间页面)



###2.	配置文件
1．	./lib/DB.class.php
	编辑DB类连接信息，然后导入目录下的wuziqi.sql到数据库中
2．访问 http://hhpaint.duapp.com/  我已经配置到了BAE里

3.	实现功能
 1．	人机对战功能，使用js客户端运行，AI采用估分穷举法实现，
 2．	在线对战功能，采用的是comet长轮询，使用大量ajax访问数据库实现双人游戏通讯，访问间隔是500ms,
 3．	可以选择棋盘大小，通过Map类生成棋盘，通过js交互ajax到数据库中存储落子的坐标
 4．	动态检测玩家加入房间而更改房间状态
 5．	PHP后台运行程序检测游客状态
