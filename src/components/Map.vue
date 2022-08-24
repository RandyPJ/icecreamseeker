
<script setup>
import { onMounted, watch } from "@vue/runtime-core";
import data from "../database/icecreamdata/icecream.json";

var map = {};
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const iconUrl =
  "https://cdn3.iconfinder.com/data/icons/placeholder/64/dessert-sweet-icecream-placeholder-pin-pointer-gps-map-location-512.png";

function setMapView(latitude, longitude) {
  map = L.map("map").setView([latitude, longitude], 10);
}

function configureMap() {
  let drLatLong = {
    latitude: 18.486058,
    longitude: -69.931212,
  };

  setMapView(drLatLong.latitude, drLatLong.longitude);

  let tiles = L.tileLayer(tileUrl, {
    attribution,
    maxZoom: 19,
  });

  tiles.addTo(map);

  addLatitudeLongitudePopup(map);
  addLocateControl(map);
  addGeoJson(map);
}

function addLocateControl(map) {
  var locate = L.control.locate().addTo(map);
  locate.onLocationError = function (error) {
    window.console.log(error);
  };
}

function addLatitudeLongitudePopup(map) {
  let popup = L.popup();

  map.on("click", (event) => {
    popup
      .setLatLng(event.latlng)
      .setContent("Latitude and Longitude " + event.latlng.toString())
      .openOn(map);
  });
}

function addGeoJson(map) {
  var icecreamMarker = L.icon({
    iconUrl,
    iconSize: [35, 35],
  });

  data.features.forEach((feature) => {
    let [latitude, longitude] = feature.geometry.coordinates.slice();
    L.marker([latitude, longitude], { icon: icecreamMarker })
      .addTo(map)
      .on("click", function (e) {
        addFeaturePopup(e, map, feature);
      });
  });
}

function addFeaturePopup(event, map, feature) {
  let popup = L.popup();
  let [latitude, longitude] = feature.geometry.coordinates.slice();
  popup
    .setLatLng(event.latlng)
    .setContent(
      `<div>
            <h2 class="popup-title">${feature.properties.name}</h2>
            <p class="light-text">${latitude}, ${longitude}</p>
       </div>`
    )
    .openOn(map);
}

let props = defineProps({
  selectedShop: Object,
});

watch(
  () => props.selectedShop,
  (newValue, oldValue) => {
    if (newValue) {
      let coordinates = newValue.coordinates.slice();
      setMapView(coordinates[0], coordinates[1]);
    }
  }
);

onMounted(() => {
  configureMap();
});
</script>


<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 94vh;
  z-index: 1;
}

.popup-title {
  font-size: 1em;
  font-weight: 400;
}

.light-text {
  color: rgb(131, 120, 120);
}
</style>
