<?php
	include("./DB.class.php");
	if(!isset($_POST['room'])||($_POST['room']=="")){
	}else{ 
		$conn=new DB();//���ݿ����� 
		$room=$_POST['room'];//�Ƿ��Ѵ��ڷ���
		$sql="UPDATE room SET start='1' WHERE roomname='".$room."'";
		$conn->query($sql);
		echo "1";
	}
	?>