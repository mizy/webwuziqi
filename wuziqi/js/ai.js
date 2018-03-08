//定义全局变量和棋盘
var DIG=5;//搜索深度为5
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
//-----------------------------监听开始--------------------------
$(document).ready(function(){
	$("#Bstart").click(function(){	//开始按钮切换（黑！）
		Bstart();//黑色先手按钮
	});
	$("#Wstart").click(function(){	//（白！）
		Wstart();
	});
	$("#endButton").click(function(){//结束按钮切换
		stop();
	});
	$("div.map_cell").click(function(){//棋子点击play
		if(start=="start"){
			if(chess=="black"){
				var axis=this.id.split("a");
				var x=axis[0];
				var y=axis[1];
				if(map[x][y]=='o'){
					this.style.backgroundImage="url(./image/black.png)";//设置黑棋子图片
					map[x][y]='pla';
					next("black");
					AI("white");
				}
			}else{
				var axis=this.id.split("a");
				var x=axis[0];
				var y=axis[1];
				if(map[x][y]=='o'){
				this.style.backgroundImage="url(./image/white.png)";//设置白棋子图片
				map[x][y]='pla';
				next("white");
				AI("black");
				}
			}
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
function Bstart(){ //黑按钮
		user("black");//下一步棋怎么走
		$(".button_label").hide();
		$(".endButtonLable").show();
}
function Wstart(){  //白按钮
		user("white");
		$(".button_label").hide();
		$(".endButtonLable").show();
		next("white");
}
function stop(){//结束按钮
		start="stop";
		window.location.reload();
}

function Win(str){ //检测输赢
	alert(str +"赢了!");

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
function AI(str){//电脑AI算法，采用估分法
	var comMax=0;//当前电脑最高分数
	var comMaxc=0;//电脑最高的时候人在这里的分差
	var plaMaxc=0;
	var plaMax=0;//当前玩家最高分数
	var comMaxXY=new Array(0,0);//保存最高分数的坐标，前者为x，后者为y
	var plaMaxXY=new Array(0,0);//
	for(var i=1;i<=size;i++)
	{
		for(var j=1;j<=size;j++)
		{
			if(map[i][j]=="o"){//遍历判断能否落子
				var com=culNum("com",i,j);//该位置包含的电脑方棋子数目信息
				var pla=culNum("pla",i,j);//该位置包含的玩家棋子数目信息
				var comGrade=culGrade(com)+1;//电脑棋子估分，返回最大分+1
				var plaGrade=culGrade(pla);//玩家估分返回最大分值
				var c=comGrade-plaGrade-comMaxc;
				var d=plaGrade-comGrade-plaMaxc;
				if ((comGrade>comMax)||((comGrade==comMax)&&onCenter(i,j,comMaxXY,c))){ //找到最大分数,放入坐标信息	
					comMax=comGrade;
					comMaxc=comGrade-plaGrade;//电脑玩家分数差值
					comMaxXY[0]=i;
					comMaxXY[1]=j;
					}
				if (plaGrade>plaMax||((plaGrade==plaMax)&&onCenter(i,j,plaMaxXY,d))){ 
					plaMax=plaGrade;
					plaMaxc=plaGrade-comGrade;
					plaMaxXY[0]=i;
					plaMaxXY[1]=j;
					}
			}
		}
	}
	if(plaMax>100){ Win("你");return true;};
	if (comMax>plaMax){
		var x=comMaxXY[0];//读出保存的坐标信息
		var y=comMaxXY[1];
		var id=x+"a"+y;
		document.getElementById(id).style.backgroundImage="url(./image/"+str+".png)";//下子
		map[x][y]="com";//存入全局的棋局
	}else {
		var x=plaMaxXY[0];//读出保存的坐标信息
		var y=plaMaxXY[1];
		var id=x+"a"+y;
		document.getElementById(id).style.backgroundImage="url(./image/"+str+".png)";//下子
		map[x][y]="com";//存入全局的棋局
	}
	if(comMax>=100){ Win("电脑");};//电脑赢可以提前判断
	checkWin();//检测玩家赢了没有
	
	
}
function onCenter(i,j,arr,c){//让棋子尽量在中间出现,同时平衡一下
	var distance=Math.abs(i-semisize)+Math.abs(j-semisize);//当前位置比最大位置离中心距离的差值
	distance=distance-Math.abs(arr[0]-semisize)-Math.abs(arr[1]-semisize)
	if (c<0)
	{
		return true;    //判断相同分值下，走在那里电脑占便宜更多,返回换坐标信息
	}else if(c>0){
		return false;
	}
	else if(distance<0){
		return true;//如果这个位置离中心更近就用这个
	}else{
		return false;
	}
}
function culGrade(arr){//估分函数
	var live5=0;
	var live4=0;
	var dead4=0;
	var flive3=0;//假三
	var dead3=0;
	var live3=0;
	var live2=0;
	var dead2=0;
	for(var i=0;i<4;i++){
		if(arr[i][0]>4&&(arr[i][2]==0)){return 110;};//win
		if(arr[i][0]==4&&(arr[i][2]==0)){live5++;};//成5 ；
		if((arr[i][0]==3)&&(arr[i][1]==0)&&(arr[i][2]==0)){live4++};//活4 
		if((arr[i][0]==3)&&(arr[i][1]==1)){dead4++;};//死4次数加一
		if((arr[i][0]==2)&&(arr[i][1]==0)&&(arr[i][2]==0)){live3++;};//活3次数加一
		if((arr[i][0]==2)&&(arr[i][1]==0)&&(arr[i][2]==1)){flive3++;};//假活3次数加一
		if((arr[i][0]==2)&&(arr[i][1]==1)){dead3++;};//死3次数加一
		if((arr[i][0]==1)&&(arr[i][1]==0)&&(arr[i][2]==0)){live2++};//活2次数加一
		if((arr[i][0]==1)&&(arr[i][1]==1)&&(arr[i][2]==0)){dead2++};//死2次数加一
	}
	if (live5>0){return 100;}//成5
	else if (live4>0){return 90;}//活四
	else if((dead4>1)||(dead4>0&&live3>0)||(dead4>0&&flive3>0)){return 90}//双死4,死4活三,死四假活三
	else if(live3>1){return 80}//双活三
	else if(live3>0&&flive3>0){return 80}//活三假活三
	else if(flive3>1){return 75}//双假活三
	else if(live3>0&&dead3>0){return 70;}//死三活三
	else if(flive3>0&&dead3>0){return 65;}//假活3，死三
	else if(live3>0){return 60;}//活三
	else if(dead4>0){return 50;}//死4
	else if(live2>1){return 40;}//双活儿
	else if(dead3>0){return 30;}//死三
	else if(live2>0){return 20;}//活2
	else if(dead2>0){return 10;}//死2
	else{return 0;}//单子

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
function checkWin(){  //用空位信息不能完全检测出来，还是需要重新遍历才行
	for(var i=1;i<=size;i++)
	{
		for(var j=1;j<=size;j++)
		{
			if(map[i][j]=="pla"){
				var num=culNum("pla",i,j);//该位置包含的电脑方棋子数目信息	
				if(num[0][0]>=4||num[1][0]>=4||num[2][0]>=4||num[3][0]>=4){ Win("你");return true;};
			}
		}
	}
}