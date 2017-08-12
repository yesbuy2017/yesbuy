//右侧登录界面
var saveLeft=$('.box').css('left');
$('.image').css('top',$('.myZoe .image').height()+'%');
$('.headerMore img').on('click',function(){
	$('.myZoe').css('display','block');
	$('.bg').animate({'opacity':'0.7'},500);
	$('.box').animate({'left':'0'},500);
})
$('.myZoe .bg').on('click',function(){
	$('.box').animate({'left':saveLeft},500);
	$('.bg').animate({'opacity':0},500,function(){
		$('.myZoe').css('display','none');
	});
});
//判断是否登录 执行不同的点击操作
var user=window.localStorage.getItem('users');
if(user){
	$('.tx img').attr('src','./img/animal032.jpg');
	$('.tx .name').html(user);
	$('.tx').on('touchstart',function(){
		$('.image').animate({'top':0},800);
	});
	$('.image li img').on('click',function(){
		window.localStorage.setItem('img',this.src);
		$('.headerMore img').attr('src',this.src);
		$('.tx img').attr('src',this.src);
		$('.enters img').attr('src',this.src);
		$('.image').animate({'top':$('.myZoe .image').height()+'%'},800);
	});
	var aImg=window.localStorage.getItem('img')
		$('.headerMore img').attr('src',aImg);
		$('.tx img').attr('src',aImg);
		$('.enters img').attr('src',aImg);
}else{
	$('.tx').on('click',function(){
		window.localStorage.setItem('saveHref',location.href);	
		location.href="enter.html";
	})
	$('.headerMore img').attr('src','img/touxiang.png');
	$('.tx img').attr('src','img/touxiang.png');
}
//退出登录
$('.outUser').on('click',function(){
	$('.box').animate({'left':saveLeft},500);
	$('.bg').animate({'opacity':0},500,function(){
		$('.myZoe').css('display','none');
	});
	window.localStorage.removeItem('users');
	$('.headerMore img').attr('src','img/touxiang.png');
	$('.tx img').attr('src','img/touxiang.png');
	window.location.reload();
});

$('.header a').on('click',function(){
	$('.image').animate({'top':$('.myZoe .image').height()+'%'},800);
});

//机器人
var atop=$('.txt_list').height();
$('.set_txt').on('click',function(){
	function setText(){
			var meImg=window.localStorage.getItem('img');
	if(meImg){
		var $meLi='<li class="me"><img src='+meImg+' alt="" /><p>'+$('.txt_val').val()+'</p></li>'
		$('.txt_list').append($meLi);
	}else{
		var $meLi='<li class="me"><img src="img/touxiang.png" alt="" /><p>'+$('.txt_val').val()+'</p></li>'
		$('.txt_list').append($meLi);
	}
	
	
	$(function(){
		$.ajax({
			type:"get",
			url:"http://www.tuling123.com/openapi/api",
			dataType:"JSON",
			jsonP:"callback",
			data:{'key':'b8680786b6714ae4953c72d6cde9c556','info':$('.txt_val').val(),'userid':'12345678'},
			success:function(str){
				var $meLi='<li class="text_left"><img src="img/uzibv0upytf60493.jpg" alt="" /><p>'+str.text+'</p></li>'
					$('.txt_list').append($meLi);
					document.getElementById('content').scrollTop = document.getElementById('content').scrollHeight;
			}
		});
	});
	$('.txt_val').val('');
	}
	setText()
});
$('.robot .text .header a').on('click',function(){
	$('.robot').fadeOut();
});
$('.robot_icon').on('click',function(){
	$('.robot').fadeIn();
})
document.onkeydown=function(){
	console.log();
	if(event.keyCode=='13'){
		$('.set_txt').click();
	};
}
