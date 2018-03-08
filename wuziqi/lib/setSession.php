<?php
	session_start();
	if(isset($_GET["user"])){
		$user=$_GET["user"];
		$_SESSION['user']=$user;//建立session变量
		echo "ok";
	}?>