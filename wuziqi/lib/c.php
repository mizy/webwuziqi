<?php
    session_start();
	ignore_user_abort();//
	set_time_limit(18000);//3Сʱ��϶�û��
	include("./DB.class.php");//���ݿ���
	$conn=new DB();
	$room=$_SESSION["room"];
	$sql="delete from room where roomname='".$room."'";	
	do{
		$str=date('H:i:s ',time()).$_SESSION["room"]." ".$v=connection_status()."\r\n";
		echo $str;
		ob_flush();//�������
		flush();//ˢ�»���
		sleep(10);//˯10��
		$file = fopen("./Info.txt","a+");//������ļ���Ȼ��׼��д����Ϣ��
		fwrite($file,$str);
		fclose($file);
		if(connection_status()!=0||connection_aborted()!=0||!isset($_SESSION["room"])){//����Ͽ�����
			unset($_SESSION['room']);//ж��session
			$result=$conn->query($sql);//ɾ��������Ϣ
			exit();//�˳�
			die('end');
			break;
		}
	}while(1);
?>