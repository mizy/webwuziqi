<?php
	include("./DB.class.php");
	if(!isset($_POST['room'])||($_POST['room']=="")){
	}else{ 
		$xy=$_POST['xy'];
		$m=$_GET['m'];
		$conn=new DB();//数据库链接 
		$room=$_POST['room'];//是否已存在房间
		$sql="UPDATE room SET ".$m."='".$xy."' WHERE roomname='".$room."'";
		if($conn->query($sql)=="true"){
			echo "1";
		}
	}
	?>