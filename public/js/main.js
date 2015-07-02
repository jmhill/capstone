$(document).ready(function(){

  function getPlaces() {
    $.get('/places', function(places) {
      $("#place-container").html(places);
    });
  }

  getPlaces();

  $('#add-place').click(function(event) {
    event.preventDefault();
    var city = $('#city-box');
    var country = $('#country-box');
    var placeObject = {
      city: city.val(),
      country: country.val()
    }

    $.post('/places', placeObject, function(place) {
      console.log('Sending post request for place: ' + place.city);
      getPlaces();
      city.val('');
      country.val('');
    });
  });

  $('#place-container').on('click', '.remove-place', function(event) {
    console.log("remove button clicked");
    event.preventDefault();
    var placeId = $(event.target).parent().data("id");
    $.ajax('/places/' + placeId, {
        type: 'DELETE',
        dataType: 'json'
    }).done(function(data) {
      getPlaces();
    });
  });

});
