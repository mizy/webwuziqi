<?php
	include("./DB.class.php");
	if(!isset($_POST['room'])||($_POST['room']=="")){
	}else{ 
		$xy=$_POST['xy'];
		$m=$_GET['m'];
		$conn=new DB();//���ݿ����� 
		$room=$_POST['room'];//�Ƿ��Ѵ��ڷ���
		$sql="UPDATE room SET ".$m."='".$xy."' WHERE roomname='".$room."'";
		if($conn->query($sql)=="true"){
			echo "1";
		}
	}
	?>