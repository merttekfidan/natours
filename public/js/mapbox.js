/*eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoibWVydHRla2ZpZGFuIiwiYSI6ImNrb3VodW4ybjA1cmEydW1wZzFvc3hyNDIifQ.2POUsFSLyXGjiyg3Y7GrMQ';
var map = new mapboxgl.Map({
  container: 'map',
  scrollZoom: false,
  style: 'mapbox://styles/merttekfidan/ckoxb8esd1e2x17o1b74ppzoq',
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';
  // Add the marker
  new mapboxgl.Marker({
    elemet: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add Popup
  new mapboxgl.Popup()
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100,
  },
});
