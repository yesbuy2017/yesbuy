/**
 * 
 * @param {Object} obj 拖动滚动的目标
 * @param {Object} child 目标的子级
 * @param {Object} index	变化颜色的小点  //如果不需要写false
 * @param {Object} className  小点要添加的类名//如果不需要写false
 * @param {Object} auto  是否自动轮播  true或false 必填
 */
function moveBanner(obj,child,index,className,play) {
	var oStart = 0;
	var saveStrat = 0;
	var endX = 0;
	var moveX = 0;
	var iNow = 0;
	var autoPlay = play;
	var timer;
	$(obj).on('touchstart', function(ev) {
		clearInterval(timer);
		oStart = ev.originalEvent.changedTouches[0].pageX;
		saveStrat = endX;
	});
	$(obj).on('touchmove', function(ev) {
		moveX = ev.originalEvent.changedTouches[0].pageX - oStart;
		endX = moveX + saveStrat;
		$(obj).css('left', endX);
	});
	$(obj).on('touchend', function(ev) {

		if (child) {
			var dis = ev.originalEvent.changedTouches[0].pageX - oStart;
			var iNew = Math.round(dis / window.screen.width);
			iNow -= iNew;

			if (iNow < 0) {
				iNow = 0
			}
			if (className) {
				$(index).removeClass(className);
				if (iNow >= $(child).size() - 1) {
					$(index).eq(0).addClass(className);
				} else {
					$(index).eq(iNow).addClass(className);
				}
			}
			endX = -iNow * window.screen.width;

		} else {
			if ($(obj).offset().left > 0) {
				endX = 0;
			} else if ($(obj).offset().left < -($(obj).outerWidth() - window.screen.width)) {
				endX = -($(obj).outerWidth() - window.screen.width);
			}
		}
		$(obj).animate({
			'left': endX
		}, 200, function() {
			if (iNow == $(child).size() - 1) {
				iNow = 0;
				endX = -iNow * window.screen.width;
				$(obj).css('left', endX);
			}
		});
		auto();
	});

	function auto() {
		if (autoPlay) {
			timer = setInterval(function() {
				iNow++
				if (iNow < 0) {
					iNow = 0
				}
				$(index).removeClass(className);
				if (iNow >= $(child).size() - 1) {
					$(index).eq(0).addClass(className);
				} else {
					$(index).eq(iNow).addClass(className);
				}
				endX = -iNow * window.screen.width;

				$(obj).animate({
					'left': endX
				}, 200, function() {
					if (iNow == $(child).size() - 1) {
						iNow = 0;
						endX = -iNow * window.screen.width;
						$(obj).css('left', endX);
					}
				});
			}, 2000);
		}
	};
	auto();
}
//自动轮播的海报图
moveBanner('.banner_box', '.banner_box li', '.xdd li', 'active',true);
//可用拖动的小海报不自动轮播
moveBanner('.hotgame ul');
moveBanner('.screenshot ul');
$('.gameDown .btn a').eq(0).on('click',function(){
	$('.gameDown .list_wrap').eq(0).animate({'margin-left':0},500);
})
$('.gameDown .btn a').eq(1).on('click',function(){
	$('.gameDown .list_wrap').eq(0).animate({'margin-left':-window.screen.width},500);
})
