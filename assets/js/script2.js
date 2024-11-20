mapboxgl.accessToken =
  "pk.eyJ1IjoicGFyaXNyaSIsImEiOiJja2ppNXpmaHUxNmIwMnpsbzd5YzczM2Q1In0.8VJaqwqZ_zh8qyeAuqWQgw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [80.18536880746353, 16.501575031841256],
  zoom: 13,
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  placeholder: "Search any place on the planet",
});

var geolocate = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: true,
});

map.addControl(geolocate);
map.on("load", function () {
  geolocate.trigger();
});

map.on("mousemove", function (e) {
  console.log(e);
  document.getElementById("info").innerHTML =
    "<p>Geographical information</p>" + JSON.stringify(e.lngLat.wrap());
});

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

var marker = new mapboxgl.Marker({
  draggable: true,
})
  .setLngLat([0, 0])
  .addTo(map);

function onDragEnd() {
  var lngLat = marker.getLngLat();
  coordinates.style.display = "block";
  coordinates.innerHTML =
    "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
}
marker.on("dragend", onDragEnd);
var layerList = document.getElementById("menu");
var inputs = layerList.getElementsByTagName("input");

function switchLayer(layer) {
  var layerId = layer.target.id;
  map.setStyle("mapbox://styles/mapbox/" + layerId);
}

for (var i = 0; i < inputs.length; i++) {
  inputs[i].onclick = switchLayer;
}
document.getElementById("geocoder").appendChild(geocoder.onAdd(map));
