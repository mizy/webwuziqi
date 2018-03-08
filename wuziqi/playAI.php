<?php
	include("./lib/map.class.php");
?>
<html>
<head>
<title>五子棋在线游戏</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<meta name="keywords" content="五子棋">
<meta name="description" content="五子棋游戏，在线及人工智能游戏">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" type="text/css" href="./css/main.css" >
<script src="./js/jquery-1.11.0.min.js"></script>
</head>
<body >
<div id="title" >
	<a href="./" ><span>五子棋在线游戏</span></a>
</div>
<div id="menu" >
	<div id="white_name">
		<span>白方<span>
	</div>
	<div id="timer">
		<span></span>
	</div>
	<div id="black_name">
		<span>黑方</span>
		
	</div>
</div>
<div id="map">
	<?php
	if(isset($_GET["height"])&&isset($_GET["width"]))
	{
		$m=$_GET["height"];							//输出棋盘
		$n=$_GET["width"];
		$gamemap=new Map();
		$gamemap->getMap($m,$n);
		?>
		<div class="button_label">
		<button id="Wstart" ><a href="#" >白后手开始</a></button>
		<button id="Bstart" ><a href="#" >黑先手开始</a></button>
		<button><a href="<?php echo $_SERVER['PHP_SELF'] ?>">重选棋盘</a></button>
		</div>
		<div class="endButtonLable">
		<button id="endButton" ><a href="#" >结束游戏</a></button>
		</div>
		<?php
	}else
	{													//输出选择棋盘大小的按钮
		?>
	<div id="choose" >
		<div class="size-button">
			<a href="<?php echo $_SERVER['PHP_SELF']."?height=11&width=11"; ?>">
			<button>11×11</button></a>
		</div>
		<div class="size-button">
			<a href="<?php echo $_SERVER['PHP_SELF']."?height=15&width=15"; ?>">
			<button>15×15</button></a>
		</div>
		<div class="size-button">
			<a href="<?php echo $_SERVER['PHP_SELF']."?height=19&width=19"; ?>">
			<button>19×19</button></a>
		</div>
		<span >选择您需要的棋盘大小</span>
	</div>
<?php
	}
	?>
</div>
</body>
<script> 
var size=<?php echo $_GET["height"]?>;
size=parseInt(size);
</script>
<script src="./js/ai.js"></script>
</html>