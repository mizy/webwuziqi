
	var ajaxUp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		 ajaxUp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		 ajaxUp=new ActiveXObject("MSXML2.XMLHTTP.3.0");
	}
function ajaxUpdate(){//���º���
	window.clearTimeout(timeId);
	var url="./lib/roominfo.php?m="+Math.random();
	ajaxUp.open("GET",url,true);
	ajaxUp.onreadystatechange=check;
	ajaxUp.send();
}
function check(){//���ú���
	if (ajaxUp.readyState==4&&ajaxUp.status==200)
		{
			if(ajaxUp.response!=null&&ajaxUp.response!=$("#showIframe").html()){//���ϸ��´�����Ϣ
				$("#showIframe").html(ajaxUp.response);
			}
			var timeId=setTimeout( ajaxUpdate,5000);
		}
	}
var timeId=setTimeout(ajaxUpdate,111);
