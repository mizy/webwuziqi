<?php
	include("./DB.class.php");
	if(!isset($_POST['room'])||($_POST['room']=="")){
	}else{ 
		$m=$_GET['m'];
		$conn=new DB();//数据库链接 
		$room=$_POST['room'];//是否已存在房间
		$sql="select ".$m." from room where roomname='".$room."'";
		if($conn->query($sql)!=null){
			$result=$conn->fetch_assoc();
			echo $result[$m];
		}
	}
?>