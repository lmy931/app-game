
var chars = new Array('.','','。','o');
var max_x,max_y;
function test(){
	// $('#data').css("filter", "progid:DXImageTransform.Microsoft.Matrix(M11=" + m11 + ",M12=" + m12 + ",M21=" + m21 + ",M22=" + m22 + ",SizingMethod='auto expand')");
}


function r(a,b){
	return a>b?0:Math.round(Math.random()*(b-a)+a);
}

function rStr(c,d){
	var len = r(c,d);
	var str = '';
	for(var i = 0;i<len;i++){
		str += chars[r(0,chars.length-1)];
	}
	return str;
}

function rColor(){
	return 'rgb('+r(0,255)+','+r(0,255)+','+r(0,255)+')';
}

function rDeg(a,b){
	return 'rotate('+r(a,b)+'deg)';
}

function startMove(){
	$('.common').not(':animated').each(function(){
		$(this).animate({
			'top':r(10,max_y-100),
			'left':r(10,max_x-100),
			'opacity':r(0,10)/10,
			'color':rColor(),
			'font-size':r(10,30),
			'-webkit-transform':rDeg(0,360)
		},r(5000,10000));
	});
}

function keepAni(){
	var n = $(':animated').length;
	var max_n = $('.common').length;

	if(n <= 2*max_n/3)startMove();
}


$(document).ready(function(){
	max_y = $(document).height();
	max_x = $(document).width();
	for(var i=0;i<30;i++){
		var t_div = document.createElement("div");
		$(t_div).addClass('common').css({
			'top':r(10,max_y-100),
			'left':r(10,max_x-100),
			'color':rColor(),
			'opacity':r(0,10)/10,
			'-webkit-transform':rDeg(0,360)
		}).html(rStr(1,3));
		$('body').append(t_div);
	}
	t = setInterval("keepAni()",'50');
});

function zoom(obj){
	var offset = $(this).offset();
	$(obj).animate({
		"opacity":"hide",
		"width":$(window).width(),
		"height":$(window).height(),
		"left":0,
		'top':0,
		'background-color':'white'
	},1000,function(){
		stopAni();
	});
}

function stopAni(){
	clearInterval(t);
	$(':animated').stop();
}