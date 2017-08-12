//多行文本框判断是否有值
var savetxt=$('#txt').val();
$('#txt').on('focus',function(){
	if($('#txt').val()==savetxt){
		$('#txt').val('');
	}
});
$('#txt').on('blur',function(){
	if($('#txt').val()==''){
		$('#txt').val(savetxt);
	};
})
//建立web数据库;
//储存留言的内容 事件 用户名 头像 地址
var db=openDatabase('mydbm','1.0','text db','1024*1024');
db.transaction(function(contex){
		contex.executeSql('create table if not exists userinf(id unique,name,img,text,time,oarea)')
});
var rows;
db.transaction(function(contex){
	contex.executeSql('select*from userinf',[],function(con,data){
//		console.log(data.rows.item(0));
		rows=data.rows.length;
		for(var i=0;i<rows;i++){
			var aname=data.rows.item(i).name;
			var aimg=data.rows.item(i).img;
			var atext=data.rows.item(i).text;
			var atime=data.rows.item(i).time;
			var oarea=data.rows.item(i).oarea;
			var $oli='<li><div class="touxiang"><img src="'+aimg+'" alt="" /></div><div class="list_right"><a href="###">'+aname+'</a><span>'+oarea+'</span><span class="time">'+atime+'</span><p>'+atext+'</p><div class="zan"><span>0</span><a href="###">回复</a></div></div></li>'
			$('.comment_list ul').prepend($oli);
		}
		$('.comment_num span').html($('.comment_list li').size());
	})
});


$('.textarea button').on('click',function(){
	
	var name=window.localStorage.getItem('users');
	if(name){
		var img=$('.enter p img').attr("src");
		var otext=$('#txt').val();
		var time=new Date();
		var month=zero(time.getMonth()+1);
		var day=zero(time.getDate());
		var hour=zero(time.getHours());
		var min=zero(time.getMinutes());
		var otime=month+'-'+day+' '+hour+':'+min;
		
		
		//新浪ip地址接口
		var city = remote_ip_info.city;
		var province=remote_ip_info.province;
		var oarea=province+city+'市网友';
		db.transaction(function(contex){
			idNum=++rows;
			contex.executeSql('insert into userinf(id,name,img,text,time,oarea) values("'+idNum+'","'+name+'","'+img+'","'+otext+'","'+otime+'","'+oarea+'")');
		});
			$('.comment_list ul li').removeClass('new');
		var $oli='<li class="new"><div class="touxiang"><img src="'+img+'" alt="" /></div><div class="list_right"><a href="###">'+name+'</a><span>'+oarea+'</span><span class="time">'+otime+'</span><p>'+otext+'</p><div class="zan"><span>0</span><a href="###">回复</a></div></div></li>'
			$('.comment_list ul').prepend($oli);
			$('.new').css('left',-window.screen.width);
			$('.new').animate({'left':0},300);
			$('textarea').val('');
			$('.comment_num span').html($('.comment_list li').size());
	}else{
		alert('请登录');
	}
});
//时间补0函数
function zero(obj){
	if(obj<10){
		return '0'+obj;
	}
	return obj
}
$('.comment_num span').html($('.comment_list li').size());

//红心赞
var zan=window.localStorage.getItem('zan');

if(zan){
	for(var i=0;i<=zan;i++){
		$('.star span').eq(i).addClass('active');
	};
}
//评价心级
$('.star span').on('click',function(){
	$('.star span').removeClass('active');
	for(var i=0;i<=$(this).index();i++){
		$('.star span').eq(i).addClass('active');
	};
	window.localStorage.setItem('zan',$(this).index());
});
var heart=window.localStorage.getItem('heart');
$('.heart').on('click',function(){
	heart=window.localStorage.getItem('heart');
	if(!heart){
		$('.heart img').attr('src','img/ymw_icons_heart2.png');
		window.localStorage.setItem('heart','xin');
		$('.score_right p').html(parseInt($('.score_right p').html())+1);
	}else{
		$('.heart img').attr('src','img/ymw_icons_heart.png');
		window.localStorage.removeItem('heart');
		$('.score_right p').html($('.score_right p').html()-1);
	}
});
if(heart){
	$('.heart img').attr('src','img/ymw_icons_heart2.png');
}

var box=document.getElementsByClassName('screenshot')[0];

var w=$('.screenshot').find('li').eq(0).outerWidth();

box.style.width=w+'rem';


