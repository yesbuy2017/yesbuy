//登录界面判断账号名密码是否存在
$('.btn').on('click',function(){
	var localName=window.localStorage.getItem('userNames');
	var localPsw=window.localStorage.getItem('passWorks');
	var localPhone=window.localStorage.getItem('phone')
	var arrName=localName.split('|');
	
	var arrPsw=localPsw.split('|');
	var arrPhone=localPhone.split('|');
	
	for(var i=0;i<arrName.length;i++){
	
		if($('#username').val()==arrName[i]||$('#username').val()==arrPhone[i]){
			if($('#password').val()==arrPsw[i]){
				$('.prompt').css('display','block');
				$('.atext').html('登录成功');
				$('input').val('');
				window.localStorage.setItem('users',arrName[i]);
				
				return;
			}else{
				$('.atext').html('密码错误')
				$('.prompt').css('display','block');
				return;
			}
		}
	}
	$('.prompt').css('display','block');
	$('.atext').html('用户名不存在');

});
//登录提示 如果是登陆成功返回上一个页面
$('.prompt button').on('click',function(){
	if($('.prompt .atext').html()=='登录成功'){
		$('input').val('');
		$('.prompt').css('display','none');
//		window.history.go(-1);
		location.href=window.localStorage.getItem('saveHref');
	}else{
		$('.prompt').css('display','none');
	}
});
//返回上一页
$('.back').on('click',function(){
	window.history.go(-1);
});
