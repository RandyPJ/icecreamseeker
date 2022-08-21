
<script setup>
import { onMounted } from "@vue/runtime-core";
import data from "../database/icecreamdata/icecream.json";

function configureMap(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;

  var map = L.map("map").setView([latitude, longitude], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  addLatitudeLongitudePopup(map);
  addLocateControl(map);
  addGeoJson(map);
}

function addLocateControl(map) {
  var locate = L.control.locate().addTo(map);
  locate.start();
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
    iconUrl:
      "https://cdn3.iconfinder.com/data/icons/placeholder/64/dessert-sweet-icecream-placeholder-pin-pointer-gps-map-location-512.png",
    iconSize: [50, 50],
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

onMounted(() => {
  navigator.geolocation.getCurrentPosition(configureMap);
});
</script>


<template>
  <div id="map"></div>
</template>

<style scoped>
#map {
  height: 94vh;
}

.popup-title {
  font-weight: 200;
  font-family: "Raleway", sans-serif;
}

.light-text {
  color: rgb(131, 120, 120);
}
</style>
