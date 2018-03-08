<?php	session_start(); 
	include("./lib/DB.class.php");
	?>
<html>
<head>
<title>五子棋在线游戏</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta name="keywords" content="五子棋">
<meta name="description" content="五子棋游戏，在线及人工智能游戏">
<link rel="stylesheet" type="text/css" href="./css/main.css" >
<script src="./js/jquery-1.11.0.min.js"></script>
<script src="./js/play.js"></script>
</head>
<body >
<div id="title" >
	<a href="./" ><span>五子棋在线游戏</span></a>
<?php 
if(isset($_SESSION["user"])){
?>
<span><?php echo $_SESSION["user"] ?></span>
</div>
<div id="showIframe">

</div>
<div id="choose" >
	<div class="playButton">
		<button onclick="window.location.href='./createRoom.php'"><a href="#" >建立房间</a></button>
		<button onclick="joinRoom()"><a href="#">加入游戏</a></button>
	</div>
</div>
<?php 
}else
{?>
</div>
<div id="choose" >
	<div class="nameButton">
		<button onclick="update('createUser')">请输入您的用户名</button>
		<input id="createUser" type="text"></input>
	</div>
</div>
<?php } ?>
</body>
<script>

</script>
<script src="./js/playajax.js"></script>
</html>