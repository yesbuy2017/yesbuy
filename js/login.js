var rem = 750;
//切换页面函数
function foc(obj){
$(obj).on('focus', function() {
	$(this).parent().find('label').animate({
		'top': "-15",
		"left": "0",
		'font-size': 18 / rem * window.screen.width
	});
});
};
foc('.text');
var  regex = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/; 
//判断手机号
$('.phone .btn').on('click', function() {
	if (regex.test($('#phone').val())) {
		var localPhone = window.localStorage.getItem('phone');
		if (localPhone) {
			var phones = localPhone.split('|');
			for(var i=0;i<phones.length;i++){
				if($('#phone').val()==phones[i]){
					$('#phone').parent().find('label').css('color','red');
					$('#phone').parent().find('label').html('改手机号已被注册');
					return
				}
			}
			localPhone+='|'+$('#phone').val();
			window.localStorage.setItem('phone',localPhone);
			$('.phone').animate({'opacity':0},500,function(){
				$('.phone').css('display','none');
				$('.message').css('display','block');
				$('.message').find('.userPhone').html($('#phone').val());
				countTime();
			});
		} else {
			window.localStorage.setItem('phone', $('#phone').val());
			$('.phone').animate({'opacity':0},500,function(){
				$('.phone').css('display','none');
				$('.message').css('display','block');
				$('.message').find('.userPhone').html($('#phone').val());
				countTime();
			})
		}
	}else{
			$('#phone').parent().find('label').css('color','red');
		$('#phone').parent().find('label').html('您输入的手机号有误');
	}
});
var num=10;
var off=false;
function countTime(){
	var timer=setInterval(function(){
		num--;
		$('.message .time').html(num);
		if(num<=0){
			num=0;
			off=true;
			clearInterval(timer);
			$('.message .time').parent().css('opacity','0');
			$('.message .time').parent().parent().css('color','#0091e7');
		}
	},1000)
}
$('.message .time').parent().parent().on('click',function(){
	if(num==0){
		$('.message .time').parent().css('opacity','1');
		$('.message .time').parent().parent().css('color','');
		num=10;
		$('.message .time').html(num);
		countTime();
	}
})

var rUserName=/^[\w\u4E00-\u9FA5\uF900-\uFA2D]{2,16}$/;
var rPassword=/^\w{6,16}$/;
function check(obj,reg,atext,otext){
$(obj).on('keyup',function(){
	$(obj).attr('check')
	if(reg.test($(obj).val())){
		$(obj).parent().find('label').css('color','');
		$(obj).parent().find('label').html(atext);
		$(obj).attr('check',true)
	}else{
		$(obj).parent().find('label').css('color','red');
		$(obj).parent().find('label').html(otext);
		$(obj).attr('check',false)
	}
});
};
check('#name',rUserName,'用户名可用','用户名不可用');
check('#psw',rPassword,'密码可用','密码不可用');
$('#psw02').on('keyup',function(){
	
	if($('#psw02').val()!=$('#psw').val()){
		$('#psw02').parent().find('label').css('color','red');
		$('#psw02').parent().find('label').html('两次输入的密码不一致');
		$(this).attr('check',false);
	}else{
		$('#psw02').parent().find('label').css('color','');
		$('#psw02').parent().find('label').html('密码一致');
		$(this).attr('check',true);
	}
});
$('.information').find('.btn').on('click',function(){

	if($('#name').attr('check')=='true'&&$('#psw').attr('check')=='true'&&$('#psw02').attr('check')=='true'){
		var localName=window.localStorage.getItem('userNames');
		var localPsw=window.localStorage.getItem('passWorks');
		if(localName){
			var aUser=localName.split('|');
			for(var i=0;i<aUser.length;i++){
				if($('#name').val()==aUser[i]){
					$('.prompt').css('display','block');
					$('.prompt .atext').html('用户名已被注册');
					return;
				}
			}
			localName+='|'+$('#name').val();
			localPsw+='|'+$('#psw').val();
			window.localStorage.setItem('userNames',localName);
			window.localStorage.setItem('passWorks',localPsw);
			$('.prompt').css('display','block');
			$('.prompt .atext').html('注册成功');
		}else{
			
			window.localStorage.setItem('userNames',$('#name').val());
			window.localStorage.setItem('passWorks',$('#psw').val());
			window.localStorage.setItem('img',"img/icon.jpg");
			$('.prompt').css('display','block');
			$('.prompt .atext').html('注册成功');
		}
	
	}else{
		$('.prompt').css('display','block');
		$('.prompt .atext').html('注册失败请重新注册');
	}
});
$('.prompt button').on('click',function(){
	if($('.prompt .atext').html()=='注册成功'){
		$('.phone').css('display','block');
		$('.phone').css('opacity',1);
		$('.message').css('opacity',1);
		$('.information').css('display','none');
		$('input').val('');
		$('.prompt').css('display','none');
		 location.href='enter.html';
	}else{
		$('.prompt').css('display','none');
	}
});

$('.header a').on('click',function(){
	window.history.back(); 
});

var verifyCode=new GVerify("v_container");
verifyCode.options.type="number";
console.log(verifyCode.options.type);
$('.setYzm').on('click',function(){
	
	verifyCode=new GVerify("v_container");
})
$('.message .btn').on('click',function(){
	var res = verifyCode.validate($('.message input').val());
	if(res){
		$('.message').animate({'opacity':0},500,function(){
				$('.message').css('display','none');
				$('.information').css('display','block');
			});
	}else{
		$('.prompt').css('display','block');
		$('.prompt .atext').html('验证码错误');
	}
})
