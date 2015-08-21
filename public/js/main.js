$(document).ready(function(){

  // Place UI Object
  function Place(city, country, id) {
    var self = this;
    self.city = city;
    self.country = country;
    self.id = id;
    self.fullPlaceName = self.city ? self.city + ', ' + self.country : self.country;
  }

  // Knockout placesViewModel
  function placesViewModel() {
    var self = this;
    // Data
    self.places = ko.observableArray([]);

    // Operations
    self.addPlace = function() {
      var city, country, placeObject;
      var place = autocomplete.getPlace();
      if (place) {
        var placeInfo = place.address_components;
        for (var i=0; i < placeInfo.length; i++) {
          for(var j=0; j < placeInfo[i].types.length; j++) {
            if (placeInfo[i].types[j] == "locality") {
              city = placeInfo[i].short_name;
            }
            if (placeInfo[i].types[j] == "country") {
              country = placeInfo[i].long_name;
            }
          }
        }
        placeObject = {
          city: city ? city : null,
          country: country,
          googlePlaceId: place.place_id
        };
        $.post('/places', placeObject, function(postedPlace) {
          self.places.push(new Place(city, country, postedPlace._id));
        });
      }
    };
    self.removePlace = function(place) {
      $.ajax('/places/' + place.id, {
          type: 'DELETE',
          dataType: 'json',
          success: function(response) {
            if (response.removed === true) {
              self.places.remove(place);
            }
          }
      });
    };

    // Load initial state from server
    $.getJSON('/places', function(places) {
      var mappedPlaces = $.map(places, function(place) {
        return new Place(place.city, place.country, place._id);
      });
      self.places(mappedPlaces);
    });
  } // End placesViewModel

  ko.applyBindings(new placesViewModel());

});
