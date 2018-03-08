<?php
    session_start();
	ignore_user_abort();//
	set_time_limit(18000);//3小时后肯定没了
	include("./DB.class.php");//数据库类
	$conn=new DB();
	$room=$_SESSION["room"];
	$sql="delete from room where roomname='".$room."'";	
	do{
		$str=date('H:i:s ',time()).$_SESSION["room"]." ".$v=connection_status()."\r\n";
		echo $str;
		ob_flush();//输出缓存
		flush();//刷新缓存
		sleep(10);//睡10秒
		$file = fopen("./Info.txt","a+");//打开这个文件，然后准备写入信息；
		fwrite($file,$str);
		fclose($file);
		if(connection_status()!=0||connection_aborted()!=0||!isset($_SESSION["room"])){//如果断开连接
			unset($_SESSION['room']);//卸载session
			$result=$conn->query($sql);//删除房间信息
			exit();//退出
			die('end');
			break;
		}
	}while(1);
?>