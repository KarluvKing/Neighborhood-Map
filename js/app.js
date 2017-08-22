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

  self.allPlaces.forEach(function(place) {
    var markerOptions = {
      map: self.googleMap,
      position: place.latLng,
      animation: google.maps.Animation.DROP,
    };
    console.log(place);

    place.marker = new google.maps.Marker(markerOptions);
    
    var infowindow = new google.maps.InfoWindow({
          content: place.contentString
        });

    place.marker.addListener('click', function() {
          if (place.marker.getAnimation() !== null) {
            place.marker.setAnimation(null);
          } else {
            infowindow.open(map, place.marker);
            place.marker.setAnimation(google.maps.Animation.BOUNCE);
          };
        });

  });

  self.visiblePlaces = ko.observableArray();

  self.allPlaces.forEach(function(place) {
    self.visiblePlaces.push(place);
  });
};

// cria o mapa
function createMap() {
    return new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.166294, lng: -96.389016 },
        zoom: 4
    });
}

google.maps.event.addDomListener(window, 'load', function(){
    var locationList = [
       { name: 'New York', latLng: { lat: 40.786998, lng: -73.975664 }, contentString: '<p>teste - New York</p>'},
       { name: 'New Xpto', latLng: { lat: 42.786998, lng: -77.975664 }, contentString: '<p>teste - New Xpto</p>' },
       { name: 'San Francisco', latLng: { lat: 37.763061, lng: -122.431935 }, contentString: '<p>teste - San Francisco</p>' },
       { name: 'Los Angeles', latLng: { lat: 34.079078, lng: -118.242818 }, contentString: '<p>teste - Los Angeles</p>' }
    ];
    var googleMap = createMap();
    ko.applyBindings(new viewModel(googleMap,locationList));
});