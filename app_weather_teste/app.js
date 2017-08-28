function weather(lat, lon) {
	var $weather = $('#weather');
	var $weatherElem = $('#weather');

	var lat = lat;
	var lon = lon;
	var weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=12ff2cf419210da17035e40a33d4c590'

	$.getJSON(weatherAPIUrl, function(data){
		description = data.weather[0].main;
		temperature = data.main.temp;

		$weatherElem.append('<p>Description: '+description+'</p>'+'<p>Temperature: '+temperature+'</p>');
});
}

var lat = 50.083471;
var lon = 14.454087;

weather(lat, lon);