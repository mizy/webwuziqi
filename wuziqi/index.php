<?php
	if(isset($_SERVER['HTTP_REFERER'])){
		$urldata=$_SERVER['HTTP_REFERER'];//用户的访问来源
	}else{
		$urldata="直接访问";
	}
	$ua=$_SERVER['HTTP_USER_AGENT'];//浏览器ua
	$host=$_SERVER['HTTP_HOST'];//用户报文
	$ip=$_SERVER['REMOTE_ADDR'];//用户IP
	if(isset($_SERVER['REMOTE_HOST'])){
		$hostname=$_SERVER['REMOTE_HOST']; //主机名*/
	}else{
		$hostname="none";
	}
	$time=date("Y-m-d");
	$file = fopen("./lib/userInfo.txt","a+");//打开这个文件，然后准备写入信息；
	$str="\r\n 来源：".$urldata."\r ua: ".$ua."\r 报文".$host;
	$str.="\r IP：".$ip."\r 主机: ".$hostname."\r 时间".$time;
	fwrite($file,$str);
	fclose($file);
?>
<html>
<head>
<title>五子棋在线游戏</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta name="keywords" content="五子棋">
<meta name="description" content="五子棋游戏，在线及人工智能游戏">
<link rel="stylesheet" type="text/css" href="./css/main.css" >
<script src="./js/jquery-1.11.0.min.js"></script>
</head>
<body >
<div id="title" >
	<a href="./" ><span >五子棋在线游戏</span></a>
</div>

<div id="choose" >
	<div class="chooseButton">
		<a href="./play.php">
		<button>玩家对战</button></a>
	</div>
	<div class="chooseButton">
		<a href="./playAI.php">
		<button>与电脑对战</button></a>
	</div>
	<span>请选择一种游戏方式</span>
</div>

</body>
</html>