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
      icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
    };
   // console.log(place);

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

  // http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
  self.doEnableMarker = function(item) {
  	if (item.marker.getAnimation() !== null) {
            item.marker.setAnimation(null);
            item.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
          } else {
          	item.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            item.marker.setAnimation(google.maps.Animation.BOUNCE);
          };
    //console.log("click");
    //console.log(item);
    //console.log(item.marker);
    //item.marker.setAnimation(google.maps.Animation.BOUNCE);
    // activate the marker (bounce/ color change, open info window)
  };

  // list view item and map marker filter
  // first, focus on filtering the list view items
  // ko computed observable
  // http://knockoutjs.com/documentation/computedObservables.html
  // ko.utils.arrayFilter
  // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  // https://opensoul.org/2011/06/23/live-search-with-knockoutjs/
  // String indexOf method
  // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf

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

var locationList = [
  { name: 'New York', latLng: { lat: 40.786998, lng: -73.975664 }, contentString: '<p>teste - New York</p>'},
  { name: 'New Xpto', latLng: { lat: 42.786998, lng: -77.975664 }, contentString: '<p>teste - New Xpto</p>' },
  { name: 'San Francisco', latLng: { lat: 37.763061, lng: -122.431935 }, contentString: '<p>teste - San Francisco</p>' },
  { name: 'Los Angeles', latLng: { lat: 34.079078, lng: -118.242818 }, contentString: '<p>teste - Los Angeles</p>' }
  ];
  
  var googleMap = createMap();
  ko.applyBindings(new viewModel(googleMap,locationList));

// ajax requests
// choose a third party api
// try the third part api ajax requests in a stand alone version first (open a mini project)