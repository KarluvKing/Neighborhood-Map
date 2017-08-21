/**
 * Decorates a div with a map and adds marker points
 */

ko.bindingHandlers.googleMap = {

    init(mapDiv, valueAccessor) {
        let bindingData = ko.unwrap(valueAccessor()) || {},
        map = new google.maps.Map(mapDiv, {
           center: {
               lat: bindingData.centerX, 
               lng: bindingData.centerY
           },
           zoom: bindingData.zoom
        }),
        markers = _.map(bindingData.markers,function (data) {
           return new google.maps.Marker(data);
        });

        // do some more stuff or hook into markers
        // you might want to subscribe to the markers collection 
        // if you make it an observable array
     }

   };

var ViewModel = function() {
   this.googleMapData = ko.observable({
      centerX: 39.962386,
      centerY: -82.999563,
      zoom: 14,
      markers: [{
         position: {lat: 39.964425, lng: -82.987804},
         animation: google.maps.Animation.BOUNCE,
         map: map,
         title: 'Columbus Museum of Art' 
      }]
   });
}

ko.applyBindings(new ViewModel());