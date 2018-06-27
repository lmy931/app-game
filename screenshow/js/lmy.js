function refresh(){
	var settings = {
		"async": true,
	  	"crossDomain": true,
	  	"url": "http://od.mewx.org/api/ranking.php",
	  	"method": "POST",
	  	"dataType": "json",
	  	"data": JSON.stringify ({
	    	"number": 5,
	    	"with_layout": true,
	  	})
	}
	$.ajax(settings).done(function (response) {
		console.log(response);
		for(var i=0;i<response.number;i++){
			var name = response['layouts'][i]['name'];
			if(name==""){name = "Anonym";}
			id = i+1;
			if(name.length>9){
				name = name.substring(0,9)+"...";
			}
			// name = name.replace("\?","");
			var power = response['layouts'][i]['power'];
			document.getElementById('name'+id).innerHTML = name;
			document.getElementById('power'+id).innerHTML = power.toString().split('\.')[0];

			AIC[i+1] = new Array();

			AIC[i+1][0] = response['layouts'][i]['x1'] * 2.75618;
			AIC[i+1][1] = response['layouts'][i]['y1'] * 2.75618;
			AIC[i+1][2] = response['layouts'][i]['x2'] * 2.75618;
			AIC[i+1][3] = response['layouts'][i]['y2'] * 2.75618;
			AIC[i+1][4] = response['layouts'][i]['x3'] * 2.75618;
			AIC[i+1][5] = response['layouts'][i]['y3'] * 2.75618;
			AIC[i+1][6] = response['layouts'][i]['x4'] * 2.75618;
			AIC[i+1][7] = response['layouts'][i]['y4'] * 2.75618;

		}
	});
}