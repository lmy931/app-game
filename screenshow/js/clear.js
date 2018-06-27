var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://od.mewx.org/api/clear-all.php",
  "method": "POST",
  "dataType": "json",

  "data": JSON.stringify ({
    "password": "UOFA",
    "number": 0,

  })
}

$.ajax(settings).done(function (response) {

alert(response);
});