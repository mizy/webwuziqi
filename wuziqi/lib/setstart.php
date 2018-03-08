<?php
	include("./DB.class.php");
	if(!isset($_POST['room'])||($_POST['room']=="")){
	}else{ 
		$conn=new DB();//数据库链接 
		$room=$_POST['room'];//是否已存在房间
		$sql="UPDATE room SET start='1' WHERE roomname='".$room."'";
		$conn->query($sql);
		echo "1";
	}
	?>