<?php
	ignore_user_abort();
	session_start();
	include("./DB.class.php");
	$conn=new DB();
	$room=$_GET["room"];
	unset($_SESSION['room']);
	$sql="delete from room where roomname='".$room."'";
	$result=$conn->query($sql);//删除房间信息
	echo $result;

?>