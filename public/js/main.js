$(document).ready(function(){

  function getPlaces() {
    $.get('/places', function(places) {
      $("#place-container").html(places);
    });
  }

  function initialize() {

    var input = document.getElementById('place-search');
    var autocomplete = new google.maps.places.Autocomplete(input, {
      types: ['(regions)']
    });

    $('#add-place').click(function(event) {
      event.preventDefault();
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

        $.post('/places', placeObject, function(place) {
          console.log('Sending post request for place: ' + place.city);
          getPlaces();
        });

        $('#place-search').val('');
      } else {
        alert("Select a place from the list");
      }

    });
  }

  $('#place-container').on('click', '.remove-place', function(event) {
    event.preventDefault();
    var placeId = $(event.target).parent().data("id");
    $.ajax('/places/' + placeId, {
        type: 'DELETE',
        dataType: 'json'
    }).done(function(data) {
      getPlaces();
    });
  });

  google.maps.event.addDomListener(window, 'load', initialize);
  getPlaces();
});
