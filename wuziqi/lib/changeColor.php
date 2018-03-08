<?php
	include("./DB.class.php");
	if(isset($_POST['room'])&&isset($_POST['color'])){
		$room=$_POST['room'];
		$color=$_POST['color'];
		$sql="UPDATE room SET color='".$color."' WHERE roomname='".$room."'";
		$conn=new DB();
		if($conn->query($sql)==true){
			echo "ok";
		}else{
			echo $conn->query($sql);
		}
	}else{
		echo "no POST";
	}
?>