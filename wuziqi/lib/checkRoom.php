<?php
	include("./DB.class.php");
	if(!isset($_GET['room'])||($_GET['room']=="")){
		echo "<script>history.go(-1);</script>";
	}else{
		$conn=new DB();//数据库链接 
		$roomname=$_GET['room'];//是否已存在房间
		$sql="select * from room where room_id=".$roomname;
		if($conn->query($sql)!=null){
			echo "<script>alert ('房间名已存在');</script>";
		}else{
			echo "ok";
		}
	}
	?>