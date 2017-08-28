// Defines map a global variable
var map;

// Location list
var locationList = [
  { name: 'New York', latLng: { lat: 40.786998, lng: -73.975664 }, contentString: '<p>teste - New York</p>'},
  { name: 'New Xpto', latLng: { lat: 42.786998, lng: -77.975664 }, contentString: '<p>teste - New Xpto</p>' },
  { name: 'San Francisco', latLng: { lat: 37.763061, lng: -122.431935 }, contentString: '<p>teste - San Francisco</p>' },
  { name: 'Los Angeles', latLng: { lat: 34.079078, lng: -118.242818 }, contentString: '<p>teste - Los Angeles</p>' }
  ];


// This function renders the google map
function initMap() {
	// Creating Instance of Map
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(40.166294, -96.389016),
		zoom: 4,
		styles: styles
	});

	// Creating Instance of LatLngBounds
	var bounds = new google.maps.LatLngBounds();

	// Iterating over the location list
	locationList.forEach(function(places) {
		addMarkers(places);
		bounds.extend(places.location);
	});

	// This will fit all of the markers inside the map
	map.fitBounds(bounds);
}

// This function adds markers to the google map
function addMarkers(place) {
		var self = this;

		// Coordinates of the place location
		var latlng = {
			lat: place.location.lat,
			lng: place.location.lng
		};
		
		// Style the markers a bit. This will be our listing marker icon.
		self.defaultIcon = makeMarkerIcon('ec630f');

		// Style the markers a bit. This will be our selected marker icon.
		self.highLightedIcon = makeMarkerIcon('4ebf16');
	
		// Creating instance of marker
		self.marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: place.name,
			icon: defaultIcon,
			placeId: place.venue_id,
			animation: google.maps.Animation.DROP,		
		});

		// Push all of the markers into markerArray
		self.markerArray.push(self.marker);

		// Add Event Listener on each of the marker
		self.marker.addListener('click', function() {
			showPlaceInfo(place);
		});
}

// This function adds markers to the google map
function addMarkers(place) {
		var self = this;

		// Coordinates of the place location
		var latlng = {
			lat: place.location.lat,
			lng: place.location.lng
		};
		
		// Style the markers a bit. This will be our listing marker icon.
		self.defaultIcon = makeMarkerIcon('ec630f');

		// Style the markers a bit. This will be our selected marker icon.
		self.highLightedIcon = makeMarkerIcon('4ebf16');
	
		// Creating instance of marker
		self.marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: place.name,
			icon: defaultIcon,
			placeId: place.venue_id,
			animation: google.maps.Animation.DROP,		
		});

		// Push all of the markers into markerArray
		self.markerArray.push(self.marker);

		// Add Event Listener on each of the marker
		self.marker.addListener('click', function() {
			showPlaceInfo(place);
		});
}

// @constructor
function viewModel() {
	// Knockout observable arrays
	this.markerArray = ko.observableArray([]);
	this.infoWindowArray = ko.observableArray([]);
	this.places = ko.observableArray([]);

	// search bar observable
	this.filter = ko.observable();

	// Infowindow display area knockout observables
	this.venue_name = ko.observable();
	this.venue_pic = ko.observable();
	this.venue_rating = ko.observable();
	this.venue_likes = ko.observable();
	this.venue_contact = ko.observable();
	this.venue_address = ko.observable();
	// iterating over Model array & push objects into places array
	locationList.forEach(function(places) {
		this.places.push(places);
	});

	// This Will filter our array along with markers on the map
	this.results = ko.computed(function() {
		var filter = this.filter();
		if(!filter) {
			showMarkers();			
			return this.places();
		} else {
			return ko.utils.arrayFilter(locationList, function(place) {
				if(place.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
					showFilteredMarker(place);
					return place;
				} else {
					hideFilteredMarker(place);
				}
				
			});
		}
	}, this);

	// This function gets called when each of the list view item clicked
	this.getplaceInfo = function(place) {
		showPlaceInfo(place);
	};
}

function showMarkers() {
	var self = this;

	for(var i=0; i<self.markerArray().length; i++) {
		self.markerArray()[i].setVisible(true);
		self.markerArray()[i].setAnimation(null);
		self.markerArray()[i].setIcon(defaultIcon);
	}
}

// This function hides an specific marker
function showFilteredMarker(place) {
	var self = this;

	closeInfoWindows();

	for(var i=0; i<self.markerArray().length; i++) {
		if(self.markerArray()[i].placeId === place.venue_id) {
			self.markerArray()[i].setVisible(true);
			self.markerArray()[i].setAnimation(google.maps.Animation.BOUNCE);
			self.markerArray()[i].setIcon(self.highLightedIcon); 
		    map.setCenter(self.markerArray()[i].getPosition());
		}
	}
}


// This function hides an specific marker
function hideFilteredMarker(place) {
	var self = this;

	closeInfoWindows();

	for(var i=0; i<self.markerArray().length; i++) {
		if(self.markerArray()[i].placeId === place.venue_id) {
			self.markerArray()[i].setVisible(false);
			self.markerArray()[i].setAnimation(null);
			self.markerArray()[i].setIcon(self.defaultIcon);
		}
	}
}

// This function close all of the infoWindows
function closeInfoWindows() {
	for(var i=0; i<this.infoWindowArray().length; i++) {
		this.infoWindowArray()[i].close();
	}
}

ko.applyBindings(viewModel);