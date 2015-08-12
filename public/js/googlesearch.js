var autocomplete;

function initialize() {
  var input = document.getElementById('place-search');
  autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['(regions)']
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
