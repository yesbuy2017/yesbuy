var  rem=750;
//判断是否登录
function user(){
	var user=window.localStorage.getItem('users');
	if(user){
		$('.headerMore').html('<img src="./img/animal032.jpg">');
		$('.headerMore img').css({'width':70/rem*window.screen.width,'height':70/rem*window.screen.width});
		$('.textarea p').html('<img src="./img/animal032.jpg">');
	}
}
user();
//滚动到一定位置 固定导航栏
$(window).on('scroll',function(){
	var navTop=$('body').scrollTop();
	if(navTop>=$('.header_wrap').outerHeight()){
		$('.head_nav').css({'position':'fixed','top':'0'});
	}else{
		$('.head_nav').css({'position':'relative'});
	}
});
//点赞
$('.hand_list li').find('span').attr('off',true);
var arrZan=window.localStorage.getItem('zan');
var arrZanNum=window.localStorage.getItem('zanNum');
if(arrZan){
	arrZan=arrZan.split('|');
	arrZanNum=arrZanNum.split('|');
	for(var i=0;i<arrZan.length;i++){
		$('.hand_list li').eq(arrZan[i]).find('.zan').css('background-position',-55/rem*window.screen.width+'px 0');
		$('.hand_list li').eq(arrZan[i]).find('span').html(arrZanNum[i]);
		$('.hand_list li').eq(arrZan[i]).find('span').attr('off',false);
	}
}
$('.add').on('click',function(){
	var zan=window.localStorage.getItem('zan');
	var zanNum=window.localStorage.getItem('zanNum');
	$(this).find('.zan').css('background-position',-55/rem*window.screen.width+'px 0');
	console.log($(this).find('span').attr('off'));
	if($(this).find('span').attr('off')=='true'){
		$(this).find('span').html(parseInt($(this).find('span').html())+1);
		$(this).find('span').attr('off',false);
	}
	if(zan){
		zan+='|'+$(this).parent().index();
		zanNum+='|'+$(this).find('span').html();
		window.localStorage.setItem('zan',zan);
		window.localStorage.setItem('zanNum',zanNum);
	}else{
		window.localStorage.setItem('zanNum',$(this).find('span').html());
		window.localStorage.setItem('zan',$(this).parent().index())
	}
});
//点击加载更多
$('#add').on('click',function(){
	var cl=$('.hand_list ul').eq(0).clone();
	$('#add').before(cl)
});
