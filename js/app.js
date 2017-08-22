var koViewModel = function(map,locationList) {
  var self = this;

  self.googleMap = map;

  self.allPlaces = [];
    locationList.forEach(function(place) {
      self.allPlaces.push(new Place(place));
  });

  self.allPlaces.forEach(function(place) {
    var markerOptions = {
      map: self.googleMap,
      position: place.latLng,
      animation: google.maps.Animation.DROP,
    };

    place.marker = new google.maps.Marker(markerOptions);
  });

  self.visiblePlaces = ko.observableArray();

  self.allPlaces.forEach(function(place) {
    self.visiblePlaces.push(place);
  });

  self.userInput = ko.observable('');

  function Place(dataObj) {
    this.name = dataObj.name;
    this.latLng = dataObj.latLng;
    this.marker = null;
  }
  
};

function createMap() {
    return new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.166294, lng: -96.389016 },
        zoom: 4
    });
}

google.maps.event.addDomListener(window, 'load', function(){

    var locationList = [
       { name: 'New York', latLng: { lat: 40.786998, lng: -73.975664 } },
       { name: 'San Francisco', latLng: { lat: 37.763061, lng: -122.431935 } },
       { name: 'Los Angeles', latLng: { lat: 34.079078, lng: -118.242818 } }
    ];
    var googleMap = createMap();
    ko.applyBindings(new koViewModel(googleMap,locationList));
});


//self.filterMarkers = function() {
//  var searchInput = self.userInput().toLowerCase();

//  self.visiblePlaces.removeAll();

//  self.allPlaces.forEach(function(place) {
//    place.marker.setMap(null);

//    if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
//      self.visiblePlaces.push(place);
//    }
//  });

//  self.visiblePlaces().forEach(function(place) {
//    place.marker.setMap(self.googleMap);
//  });
//};