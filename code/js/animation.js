function GetName(ko)
{  
	var reg = new RegExp("(^|&)" + ko + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 

}  
var ko = GetName("ko");
//ko = "test";

document.getElementById('name').innerHTML = ko;

var left = new Array();
var top = new Array();

var defaultLeft = 420;
var defaultTop = 10;

var buoys = new Array();
for(var i=0;i<4;i++){
	buoys[i] = document.getElementById(i);
	// buoys[i].style.left = defaultLeft + 'px';
	// buoys[i].style.top = i*100+60 + 'px';
	buoys[i].style.left = i*100+500 + 'px';
	buoys[i].style.top = defaultTop + 'px';
	drag(i);	
}

var buoyLeft = new Array();
var buoyTop = new Array();

var leftBorder = 410;
var rightBorder = 890;
var topBorder = 10;
var bottomBorder = 470;


var hdata = new Array();
function drag(id){
	var left ;
	var top ;

    buoys[id].addEventListener('touchmove', function(event) {
    	if(true){
	        event.preventDefault(); //阻止其他事件
	        if(event.targetTouches.length == 1) {
	            var touch = event.targetTouches[0]; // 把元素放在手指所在的位置
	            var tempWidth = touch.pageX;//存储x坐标
	            var tempHeigth = touch.pageY;//存储Y坐标
		     	
		     	left = tempWidth - 40;
	            top = tempHeigth - 40;
	            
	            buoys[id].style.left = left + 'px'; //410 - 890
	            buoys[id].style.top = top + 'px'; // 10-470
		        
	            if(!checkWidthMax(left)){
	            	buoys[id].style.left = rightBorder + 'px';
	            }
	            if(!checkWidthMin(left)){
	            	buoys[id].style.left = leftBorder+'px';
	            }
	            if(!checkHeightMax(top)){
	            	buoys[id].style.top = bottomBorder + 'px';
	            }
	            
	            if(!checkHeightMin(top)){
	            	buoys[id].style.top = topBorder+'px';
	            }
	        }
		}
    }, false);
    
    buoys[id].addEventListener('touchend', function(event) {
    	var hasCalculated = false;
    	for(var i=0;i<4;i++){
    		
			if(i!=id){
				var disIcon = Math.pow((buoys[i].style.top.split('p')[0] 
				- buoys[id].style.top.split('p')[0]),2)+
				Math.pow((buoys[i].style.left.split('p')[0]
				- buoys[id].style.left.split('p')[0]),2);
				var dis = Math.pow((buoyLeft[i] - buoyLeft[id]),2)+
				Math.pow((buoyTop[i] - buoyTop[id]),2);
				
				if(disIcon<3700){
					mui.toast('Don\'t make them too close');
//					left = defaultLeft;
//					top = id*100+60;
					left = id*100+500;
					top = defaultTop;
					buoys[id].style.top = top + 'px';
					buoys[id].style.left = left + 'px';
				}
				else{
					if(!hasCalculated){
						hasCalculated = true;
						var x = new Array();
						var y = new Array();
						for(var j=0;j<4;j++){
							x[j] = (buoys[j].style.left.split('p')[0] - 410)*0.589583;
							y[j] = (buoys[j].style.top.split('p')[0] - 10)*0.615217;
						}
						
						document.getElementById('power').innerHTML = "Power: calculating...";
//						document.getElementById('power').innerHTML = "cannot connect server";

//						const genRandom = (min, max) => (Math.random() * (max - min + 1) | 0) + min; 
//						document.getElementById('power').innerHTML = "Power: "+genRandom(1000,2000);

//						var settings = {
//					 	  "async": true,
//					 	  "crossDomain": true,
//					 	  "url": "http://od.mewx.org/api/test-layout.php",
//					 	  "method": "POST",
//					 	  "dataType": "json",
//						  
//					 	  "data": JSON.stringify ({
//					 	    "submit": true,
//					 	    "name": ko,
//					 	    "x1": x[0],
//					 	    "y1": y[0],
//					 	    "x2": x[1],
//					 	    "y2": y[1],
//					 	    "x3": x[2],
//					 	    "y3": y[2],
//					 	    "x4": x[3],
//					 	    "y4": y[3],
//					 	    
//					 	  })
//					 	}

//					 	$.ajax(settings).done(function (response) {
//							var power = response['power'].toString().split('\.')[0];
							var power =  r(1000,5000);
					 		document.getElementById('power').innerHTML = "Power: "+ power;
					 		
					 		if(hdata.length>6){
					 			for(var k=0;k<6;k++){
					 				hdata[k] = hdata[k+1];
					 			}
								hdata[6] = "<p class='p-hdata'>"+getTime()+"		"+power+"</p>";
					 		}
					 		else{
					 			hdata[hdata.length] = "<p class='p-hdata'>"+getTime()+"		"+power+"</p>";	
					 		}
					 		var hdiv = document.getElementById('history')
					 		hdiv.innerHTML = "";
					 		
					 		for(var k=0;k<hdata.length;k++){
					 			hdiv.innerHTML = hdata[k] + hdiv.innerHTML;

					 		}
					 		document.getElementById('htag').style.display="";
//					 	});
					}
				}
			}
		}
    }, false);
}

// a-b的随机整数
function r(a,b){
	return a>b?0:Math.round(Math.random()*(b-a)+a);
}
			


function checkWidthMax(width){
	if(width<rightBorder){
		return true;
	}
	return false;	
}
function checkWidthMin(width){
	if(width>leftBorder){
		return true;
	}
	return false;	
}
function checkHeightMax(height){
	
	if(height<bottomBorder){
		return true;
	}
	return false;	
}


function checkHeightMin(height){
	if(height>topBorder){
		return true;
	}
	return false;	
}

function getTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}





var start = new Array();
for(var i=0;i<4;i++){
	start[i] = false;
}

function checkOverLap(id){
	for(var i=0;i<4;i++){
		if(i!=id){
			var dis = Math.pow((buoyLeft[i] - buoyLeft[id]),2)+
			Math.pow((buoyTop[i] - buoyTop[id]),2);
			
			if(dis<7000){
				start[id] = true;
				return true;
				
			}
		}
	}
	return false;
}