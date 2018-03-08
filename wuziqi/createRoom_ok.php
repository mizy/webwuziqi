<?php
	session_start();
	include("./lib/DB.class.php");//加载数据库文件
	if(isset($_POST["size"])&&isset($_POST["color"])&&isset($_POST["roomname"])&&isset($_POST["user"])){
		$size=$_POST["size"];
		$color=$_POST["color"];
		$roomname=$_POST["roomname"];
		$user=$_POST["user"];
		$sql="insert into room (roomname,roomsize,color,user) values('".$roomname."','".$size."','".$color."','".$user."')";
		$conn=new DB();
		if($conn->query($sql)=="true"){//如果插入成功
			echo "<script>window.location.href='./room.php';</script>";
			$_SESSION['room']=$roomname;
		}else{
			echo "<script>alert('the room has been create!');history.go(-1);</script>";
		}
	}else{
		echo "bug";
	}
?>