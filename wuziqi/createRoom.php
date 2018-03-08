<?php
	session_start();
	if(isset($_SESSION["room"])){//已经开房，就回房间吧
		Header("location: ./room.php");
	}
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
	<a href="./" ><span>五子棋在线游戏</span></a>
	<?php
		if(isset($_SESSION["user"])){//非人就去首页
		echo "<span>(".$_SESSION['user'].")</span>";
	}else{
		Header("location: ./index.php");
	}
		?>
</div>
<div id="choose" >
	<form name="roominfo" method="post">
	<input type="hidden" name="user" value="<?php echo $_SESSION["user"] //隐藏输入用户名?>" />
	<table  id="roominfo">
		<tr>
			<td style="width:170px;"><span>棋盘大小:</span></td>
			<td style="width:230px">11*11<input type="radio" checked="checked" name="size" value="11" />
			15*15<input type="radio"  name="size" value="15" />
			19*19<input type="radio"  name="size" value="19" />
			</td>
		</tr>
		<tr>
		<td><span>所用棋子:</span></td>
		<td>白:<input type="radio" checked="checked" name="color" value="white" />
	黑:<input type="radio"  name="color" value="black" /></td>
		</td>
		</tr>
		<tr>
			<td><span >房间名称:</span></td>
			<td><input  id="roomname" name="roomname" type="text" ></td>
		</tr>
	</table>
	</form>
	<div class="playButton" style="width:122px">
		<button onclick="createRoom();return false" ><a href="./creatRoom.php" >建立房间</a></button>
	</div>
</div>
</body>

<script src="./js/play.js"></script>
</html>