<?php
	include("./DB.class.php");
	$sql="select * from room where player=''";//选择room表中的字段
	$conn=new DB();
	$conn->query($sql);
	while($result=$conn->fetch_assoc()){//输出大厅信息
		echo "<a href='#' ><div data-room='".$result['roomname']."' class='roomlist' onclick='onchoose(this)'>";
		echo $result['roomname']."-";
		echo $result['roomsize']."*".$result['roomsize']."-";
		echo $result['color'];
		echo "</div></a>";
	}
?>