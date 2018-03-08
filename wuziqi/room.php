<?php
	session_start();

//-------------------上面是关闭房间，下面是写入ip
	include("./lib/DB.class.php");
	include("./lib/map.class.php");
	if(!isset($_SESSION["room"])&&!isset($_SESSION['user'])){
		Header("Location: ./index.php");
	}
	$room=urldecode($_SESSION["room"]);
	$sql="select * from room where roomname='".$room."'";//是否存在该房间
	$conn=new DB();
	if($conn->query($sql)!=false){		//查询该room信息
		$result=$conn->fetch_assoc();//获取结果集
		if($result['roomsize']==null){
			echo "<script>alert ('该房间不存在'); </script>";
			Header("Location: ./index.php");
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
			echo "(我)";}?><span>
	</div>
	<div id="timer">
		<span></span>
	</div>
	<div id="black_name">
		<span>黑方<?php if($result['color']=='black'){
			echo "(我)";}?></span>
	</div>
</div>
<div id="map">
		<?php
		$m=$result['roomsize'];	//输出棋盘
		$gamemap=new Map();
		$gamemap->getMap($m,$m);
		?>
		<div class="button_label" >
		<button id="Wstart" style="display:none;" onclick="changeUser('white','<?php echo $room ?>')" ><a href="#" >选择白方</a></button>
		<button id="Bstart" style="display:none;" onclick="changeUser('black','<?php echo $room ?>')" ><a href="#" >选择黑方</a></button>
		<button style="display:none;" id="roomStart"><a href="#">开始</a></button>
		<button  style="display:none;" 	 id="rechoose" onclick="rechoose()"><a href="#">重选颜色</a></button>
		<button	 id="rechoose" onclick="closewindow()"><a href="#">离开房间</a></button>
		</div>
</div>
<iframe style="display:none">

</iframe>
</body>
<script> ///关闭浏览器删除相应的表信息
$.get("./lib/cron.php",function(data,status){//定时1小时删除房
var data=data;
});
//$.get("./lib/c.php",function(data,status){//定时删除房
//var data=data;});
var color=<?php echo "'".$result['color']."'"; ?>;
var size=<?php echo "'".$result['roomsize']."'"; ?>;//定义全局常量
var room=<?php echo "'".$room."'"; ?>;
var url="./lib/unloadRoom.php?room="+room;
var chttp;
if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
			 chttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
			 chttp=new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
chttp.open("GET","./lib/c.php")
chttp.send();
chttp.onreadystatechange=function(){
		if (chttp.readyState==4&&chttp.status==200)
			{
				;
			}
	}
function closewindow(){  //关闭窗口一定几率触发
		chttp.open("GET",url,true);
		chttp.send();
		chttp.onreadystatechange=function(){
		if (chttp.readyState==4&&chttp.status==200)
			{
				if(chttp.responseText=="1"){
					
					window.location.reload();
					}
			}
		}
		
	}
</script>
<script src="./js/play.js"></script>
<script src="./js/playchess.js"></script>

</html>
