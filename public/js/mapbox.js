const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibWVydHRla2ZpZGFuIiwiYSI6ImNrb3VodW4ybjA1cmEydW1wZzFvc3hyNDIifQ.2POUsFSLyXGjiyg3Y7GrMQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});
