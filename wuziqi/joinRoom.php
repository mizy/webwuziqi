<?php
	session_start();
	include("./lib/DB.class.php");
	include("./lib/map.class.php");
	if(!isset($_GET["room"])&&!isset($_SESSION['user'])){
		Header("Location: ./index.php");
	}
	$room=urldecode($_GET["room"]);
	$sql="select * from room where roomname='".$room."'";//是否存在该房间
	$conn=new DB();
	if($conn->query($sql)!=false){		//查询该room信息
		$result=$conn->fetch_assoc();//获取结果集
		if($result['roomsize']==null){//如果没有存储信息
			echo "<script>alert ('该房间不存在'); </script>";
			Header("Location: ./index.php");
		}
		$sql="UPDATE room SET player='".$_SESSION['user']."' WHERE roomname='".$room."'";
		if($conn->query($sql)!=true){
			echo $conn->query($sql);
			echo "<script>history.go(-1);</script>";
		}
	}else{
		Header("Location: ./index.php");
	}
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
<body  onbeforeunload="closewindow()">
<div id="title" >
	<a href="./" ><span>五子棋在线游戏</span></a>
	<span>(房间：<?php echo $room ?>)</span>
</div>
<div id="menu" >
	<div id="white_name">
		<span>白方<?php if($result['color']=='white'){
			echo "(对手)";}else{ echo "(我)";}?><span>
	</div>
	<div id="timer">
		<span></span>
	</div>
	<div id="black_name">
		<span>黑方<?php if($result['color']=='black'){
			echo "(对手)";}else{ echo "(我)";} ?></span>
	</div>
</div>
<div id="map">
		<?php
		$m=$result['roomsize'];	//输出棋盘
		$gamemap=new Map();
		$gamemap->getMap($m,$m);
		?>
		<div class="button_label" >
		<button	 id="rechoose" onclick="closewindow()"><a href="./play.php">离开房间</a></button>
		<button	 style="display:none;background:red" id="endgame" onclick="end()"><a href="#">结束游戏</a></button>
		</div>
		<div class="endButtonLable">
		<button id="endButton" ><a href="#" >结束游戏</a></button>
		</div>
</div>
</body>
<script>
var room=<?php echo "'".$room."'"; ?>;
color=<?php echo "'".$result['color']."'" ;?>;
size=<?php echo "'".$result['roomsize']."'" ?>;
</script>
<script src="./js/play.js"></script>
<script src="./js/joinroom.js"></script>
</html>
