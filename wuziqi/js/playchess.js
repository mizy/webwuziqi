//定义全局变量和棋盘
var DIG=4;
var playinfo=0;//对手落子初始信息
var size=parseInt(size);//棋盘尺寸
var start=0;//初始为0
var semisize=Math.ceil(size/2);
var map=new Array();//定义棋盘
for(var i=1;i<=size;i++){
    map[i]=new Array();    //在声明二维
    for(var j=1;j<=size;j++){      //二维长度为20
		map[i][j]='o'; 
	}
};
//------------------------构造出map的边界-----------------------
for (var i=0;i<=(size+1);i++ )
{
	map[0]=new Array();
	map[0][i]="#";
}
for (var i=0;i<=(size+1);i++ )
{
	map[(size+1)]=new Array();
	map[(size+1)][i]="#";
}


//----------------------------------ajax查看有无对手
function checkUser(){
	$.post("./lib/isplayer.php",{room:room},function(data,status){
		if(status=="success"&&data!=""){
			getPlayer();//改变player状态
			clearTimeout(setTimeCheck);//取消此定时函数
			changeButton();//改变按键状态

		}
	});
	var setTimeCheck=setTimeout(checkUser,3000);
}
function getPlayer(){//改变player状态
	if(color!="white"){
		$("#white_name span").html("白方(对手)");
	}else{
		$("#black_name span").html("黑色(对手)");
	}
}
function changeButton(){//改变按键状态
	$("#rechoose").hide();
	$("#roomStart").show();
}
checkUser();
//----------------------------开始游戏！！！0-----------------------
function startButton(){
	var url="./lib/setstart.php";
	$.post(url,{room:room},function(data,status){
		if(status=="success"&&data=="1"){
			if(color=="black"){//先手设置原语，然后呢初始化对手颜色
				start="start";
				uncolor="white";
			}else{
				getinfo();//不是先手则开始找对方棋子
				uncolor="black";//设置对方颜色
			}
			$("#roomStart").hide();
			next("black");
		}
	});
}
function getinfo(){//获取对手落子信息,成功停止ajax
	var url="./lib/getinfo.php?m=playxy";
	$.post(url,{room:room},function(data,status){
		if(status=="success"&&data!=""){
			if(data!=playinfo){
				var axis=data.split("a");
				var x=axis["0"];
				var y=axis["1"];
				playinfo=data;//设置参照量赋值
				play(x,y,uncolor);//对方落下这个子
				clearTimeout(checkinfo);//清楚递归
			}
		}
	});
	var checkinfo=setTimeout(getinfo,1000);
}
function play(x,y,str){//落子，,然后原语执行，
	var xy=x+"a"+y;
	var _this=document.getElementById(xy);
	if(str==color){//判断是谁落子
		var url="./lib/setinfo.php?m=userxy";
		$.post(url,{room:room,xy:xy},function(data,status){//写入下的子在哪
			if(status=="success"&&data=="1"){
				if(map[x][y]=='o'){
					map[x][y]='usr';
					start="wait";//下完了以后
					next(uncolor);
					checkWin();//检测是否有人赢了
					$(_this).css("background-image","url(./image/"+str+".png)");//更换图片
					getinfo();//开始查询对方下棋了没
				}
			}
		});
	}else{//对方落子
		if(map[x][y]=='o'){
			map[x][y]='pla';
			$(_this).css("background-image","url(./image/"+str+".png)");//更换图片
			start="start";//下完了以后
			next(color);//my trun
			checkWin();//检测是否有人赢了
			
		}
	}
	
}
//-----------------------------监听开始--------------------------
$(document).ready(function(){
	$("#roomStart").click(startButton);//开始按钮
	$("#endButton").click(function(){//结束按钮切换
		stop();
	});
	$("div.map_cell").click(function(){//棋子点击play
		if(start=="start"){
			var axis=this.id.split("a");
			var x=axis[0];
			var y=axis[1];
			play(x,y,color);
		}
	});
});
function next(str){ //切换黑白手状态
	if(str=="black"){
		$("#black_name span").css("border-bottom","medium solid yellow");
		$("#white_name span").css("border-bottom","");
	}else{
		$("#white_name span").css("border-bottom","medium solid yellow");
		$("#black_name span").css("border-bottom","");
		}
}
function stop(){//结束按钮
		start="stop";
		window.location.reload();
}

function Win(str){ //检测输赢
	var url="./lib/unloadRoom.php?room="+room;
	$.get(url,function(data,status){
		if(status="success"){
			alert(str +"赢了！！！（....即将返回首页）");
			window.location.reload()
		}
	});
}
function user(str){  //用户为哪一方
	start="start";
	next("black");
	if(str=="white"){
		AI("black");
		chess="white";
	}				//设置用户所选方
	else{
		chess="black";
		}
}

function checkWin(){  //用空位信息不能完全检测出来，还是需要重新遍历才行
	for(var i=1;i<=size;i++)
	{
		for(var j=1;j<=size;j++)
		{
			if(map[i][j]=="pla"){
				var num=culNum("pla",i,j);//该位置包含的对手方棋子数目信息	
				if(num[0][0]>=4||num[1][0]>=4||num[2][0]>=4||num[3][0]>=4){ Win("对手");return true;};
			}
			if(map[i][j]=="usr"){
				var num=culNum("usr",i,j);//该位置包含的电脑方棋子数目信息	
				if(num[0][0]>=4||num[1][0]>=4||num[2][0]>=4||num[3][0]>=4){ Win("你");return true;};
			}
		}
	}
}
function culNum(str,i,j){//计算周围有多少棋子相挨着
				var arr=new Array([0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]);//存储每个方向上的棋子数目,以及碰到的对方棋子数目,左右空白数目
		/*---------------------------------左上方向--------------------------------------*/
				for( y=1,x=1;x<=DIG;x++,y++){//搜索深度为4，斜向搜索
					var ix=i+x;
					var jy=j+y;
					if(ix>0&&ix<=size&&jy>0&&jy<=size){//检测不超过数组边界
						if(map[ix][jy]==str&&(arr[0][3]<2)){//遇到己方棋子一头
							arr[0][0]++;
						}else if(map[ix][jy]!="o"){//遇到敌方棋子
							arr[0][1]++;
							break;
						}else if((map[ix][jy]=="o")&&(map[ix+1][jy+1]==str)&&(arr[0][2]==0)){//遇到空位的情况且下一个为己方棋子，并且只有一个为空的情况
							arr[0][2]++;
						}else{
							break;
						}
					}
				}
				for( y=1,x=1;x<=DIG;x++,y++){//搜索深度为4，斜向搜索(反向）
					var ix=i-x;
					var jy=j-y;
					if(ix>0&&ix<=size&&jy>0&&jy<=size){//检测不超过数组边界
						if(map[ix][jy]==str&&(arr[0][2]<2)){//遇到己方棋子一头
							arr[0][0]++;
						}else if(map[ix][jy]!="o"){//遇到非空位的其它情况
							arr[0][1]++;
							break;
						}else if(map[ix][jy]=="o"&&(map[ix-1][jy-1]==str)&&(arr[0][2]==0)){//遇到空位的情况
							arr[0][2]++;
						}else{
							break;
						}
					}
				}
	/*--------------------------------→方向------------------------------------------------*/
				for( y=1;y<=DIG;y++){//搜索深度为4，纵向搜索；
					var jy=j+y;
					if(i>0&&i<=size&&jy>0&&jy<=size){//检测不超过数组边界
						if(map[i][jy]==str&&(arr[1][2]<2)){//遇到己方棋子一头
							arr[1][0]++;
						}else if(map[i][jy]!="o"){
							arr[1][1]++;
							break;
						}else if(map[i][jy]=="o"&&(map[i][jy+1]==str)&&(arr[1][2]==0)){//遇到空位的情况
							arr[1][2]++;
						}else{
							break;
						}
					}
				}
				for( y=1;y<=DIG;y++){//搜索深度为4，纵向搜索；
					var jy=j-y;
					if(i>0&&i<=size&&jy>0&&jy<=size){//检测不超过数组边界
						if(map[i][jy]==str&&(arr[1][2]<2)){//遇到己方棋子一头
							arr[1][0]++;
						}else if(map[i][jy]!="o"){
							arr[1][1]++;
							break;
						}else if(map[i][jy]=="o"&&(map[i][jy-1]==str)&&(arr[1][2]==0)){//遇到空位的情况
							arr[1][2]++;
						}else{
							break;
						}
					}
				}
/*--------------------------------右上方向------------------------------------------------*/
				for( y=1,x=1;y<=DIG;x++,y++){//搜索深度为4，纵向搜索；
					var ix=i+x;
					var jy=j-y;
					if(ix>0&&ix<=size&&jy>0&&jy<=size){//检测不超过数组边界
						if(map[ix][jy]==str&&(arr[2][2]<2)){//遇到己方棋子一头
							arr[2][0]++;
						}else if(map[ix][jy]!="o"){
							arr[2][1]++;
							break;
						}else if(map[ix][jy]=="o"&&(map[ix+1][jy-1]==str)&&(arr[2][2]==0)){//遇到空位的情况
							arr[2][2]++;
						}else{
							break;
						}
					}
				}
				for( y=1,x=1;y<=DIG;x++,y++){//搜索深度为4，纵向搜索；
					var ix=i-x;
					var jy=j+y;
					if(ix>0&&ix<=size&&jy>0&&jy<=size){//检测不超过数组边界
						if(map[ix][jy]==str&&(arr[2][2]<2)){//遇到己方棋子一头
							arr[2][0]++;
						}else if(map[ix][jy]!="o"){
							arr[2][1]++;
							break;
						}else if(map[ix][jy]=="o"&&(map[ix-1][jy+1]==str)&&(arr[2][2]==0)){//遇到空位的情况
							arr[2][2]++;
						}else{
							break;
						}
					}
				}
	/*--------------------------------上方向------------------------------------------------*/
				for( x=1;x<=DIG;x++){//搜索深度为4，纵向搜索；
					var ix=i+x;
					if(ix>0&&ix<=size&&j>0&&j<=size){//检测不超过数组边界
						if(map[ix][j]==str&&(arr[3][2]<2)){//遇到己方棋子一头
							arr[3][0]++;
						}else if(map[ix][j]!="o"){
							arr[3][1]++;
							break;
						}else if(map[ix][j]=="o"&&(map[ix+1][j]==str)&&(arr[3][2]==0)){//遇到空位的情况
							arr[3][2]++;
						}else{
							break;
						}
					}
				}
				for( x=1;x<=DIG;x++){//搜索深度为4，纵向搜索；
					var ix=i-x;
					if(ix>0&&ix<=size&&j>0&&j<=size){//检测不超过数组边界
						if(map[ix][j]==str&&(arr[3][2]<2)){//遇到己方棋子一头
							arr[3][0]++;
						}else if(map[ix][j]!="o"){
							arr[3][1]++;
							break;
						}else if(map[ix][j]=="o"&&(map[ix-1][j]==str)&&(arr[3][2]==0)){//遇到空位的情况
							arr[3][2]++;
						}else{
							break;
						}
					}
				}
	return arr;
}