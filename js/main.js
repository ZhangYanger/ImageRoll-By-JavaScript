          window.onload=function(){
          	var container=document.getElementById("container");
          	var list=document.getElementById("list");//图片列表
          	var buttons=document.getElementById('buttons').getElementsByTagName("span");//圆形小按钮
          	var prev=document.getElementById("prev");//左箭头
          	var next=document.getElementById("next");//右箭头
          	var index=1;//当前显示第几张图片
          	var animated=false;//图片是否在动画
          	var timer=null;//定时器
          	//箭头点击事件
          	next.onclick=function(){
          		index+=1;
          		showButton();
          		if(!animated)
          		   animate(-600);
          	}
          	prev.onclick=function(){
          		index-=1;
          		showButton();
          		if(!animated)
          		animate(+600);
          	}
          	//图片切换函数
          	function animate(offset){
          		animated=true;
          		var newLeft=parseInt(list.style.left)+offset;
          		var time=300;//位移总时间
          		var interval=10;//位移间隔时间
          		var speed=offset/(time/interval);//每次位移量
          		function go(){
          			if((speed<0&&parseInt(list.style.left)>newLeft)||(speed>0&&parseInt(list.style.left)<newLeft)){
          				list.style.left=parseInt(list.style.left)+speed+'px';

          				setTimeout(go,interval);

          			}else{
          				animated=false;
          				list.style.left=newLeft+'px';
          				if(newLeft>-600){
          			         list.style.left=-3000+'px';
          		          }
          		        if(newLeft<-3000){
          			         list.style.left=-600+'px';
          		          }

          			}
          		}
          		go();
          		

          	}
          	//圆点小按钮点亮函数
          	function showButton(){
          		for(var i=0;i<buttons.length;i++)
          			buttons[i].className="";
          		if(index>5)
          			index=1;
          		if(index<1)
          			index=5;
          		buttons[index-1].className="on";
          	}

          	//圆点小按钮点击事件
          	for (var i = 0; i<buttons.length; i++) {
          		buttons[i].onclick=function(){
          			if(this.className=="on")
          				return;
          			var myindex=parseInt(this.getAttribute("index"));
          			var offset=-600*(myindex-index);
          			animate(offset);
          			index=myindex;
          			showButton();

          		}
          	}

          	//自动播放
          	function play(){
          		timer=setInterval(function(){
          			next.onclick();
          		},2000);
          	}
          	function stop(){
          		clearInterval(timer);
          	}

          	container.onmouseover=stop;
          	container.onmouseout=play;
          	//一开始是自动播放的
          	play();
          }