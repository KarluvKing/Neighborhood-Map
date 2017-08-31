var viewModel = function(map,locationList) {
  var self = this;

  self.googleMap = map;
  self.allPlaces = [];
  
  locationList.forEach(function(place) {
    self.allPlaces.push(new Place(place));
  });

  function Place(dataObj) {
    this.name = dataObj.name;
    this.latLng = dataObj.latLng;
    this.marker = null;
    this.contentString = dataObj.contentString;
  }


  // Information and configuration for the marker when the marker is clicked
  self.allPlaces.forEach(function(place) {
    var markerOptions = {
      map: self.googleMap,
      position: place.latLng,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    };

    place.marker = new google.maps.Marker(markerOptions);
    
    var infowindow = new google.maps.InfoWindow({
          content: place.contentString
        });

    place.marker.addListener('click', function() {
            infowindow.open(map, place.marker);
            weather(place.latLng.lat, place.latLng.lng);
            place.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimer(place.marker);
        });
  });

  // Filter for search function in the left side bar
  this.filter = ko.observable('');

  this.results = ko.computed(function() {
    var filter = this.filter();
      return ko.utils.arrayFilter(self.allPlaces, function(place) {
        var match = place.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1; 
          place.marker.setVisible(match);
          return match;      
      });
  }, this);

  // Enable marker with animation and show in the DOM information about the weather
  self.enableMarker = function(place) {
   if (place.marker.getAnimation() !== null) {
            place.marker.setAnimation(null);
          } else {
            place.marker.setAnimation(google.maps.Animation.BOUNCE);
            weather(place.latLng.lat, place.latLng.lng);
            setTimer(place.marker);
          };
        }

  self.visiblePlaces = ko.observableArray();

  self.allPlaces.forEach(function(place) {
  self.visiblePlaces.push(place);
  });
  
};

// This function will automatically stops marker animation
// after 3 seconds
function setTimer(marker) {
  setTimeout(function() {
    marker.setAnimation(null);
  }, 3000);
}

function createMap() {
    var googleMap = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.473642, lng: 26.132164 },
        zoom: 3
    });
    ko.applyBindings(new viewModel(googleMap,locationList));
}

// Show information about the weather in the city 3rd external API
function weather(lat, lon) {
  // var $weather = $('#weather');
  var $weatherElem = $('#weather');
  var $cityName = $('#cityName');

  var lat = lat;
  var lon = lon;
  var weatherAPIUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=12ff2cf419210da17035e40a33d4c590'

  $.getJSON(weatherAPIUrl, function(data){
    description = data.weather[0].main;
    temperature = data.main.temp;

    $cityName.text(data.name);
    $weatherElem.text('Description: '+description+' '+'Temperature: '+temperature);
});
}
// Location List
var locationList = [
  { name: 'Lisboa', latLng: { lat: 38.728877, lng: -9.139606 }, contentString: 'Lisbon - Portugal'},
  { name: 'Roma', latLng: { lat: 41.900276, lng: 12.500969 }, contentString: 'Rome - Italy' },
  { name: 'Prague', latLng: { lat: 50.075452, lng: 14.432657 }, contentString: 'Prague - Checz Republic' },
  { name: 'Budapeste', latLng: { lat: 47.574433, lng: 19.061405 }, contentString: 'Budapeste - Hungary' },
  { name: 'Bucareste', latLng: { lat: 44.473642, lng: 26.132164 }, contentString: 'Bucareste - Romania' }
  ];
