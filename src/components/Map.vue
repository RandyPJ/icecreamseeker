
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

  addPopup(map);
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

function addPopup(map) {
  let popup = L.popup();

  map.on("click", (event) => {
    popup
      .setLatLng(event.latlng)
      .setContent("Latitude and Longitude " + event.latlng.toString())
      .openOn(map);
  });
}

function addGeoJson(map) {
  L.geoJSON(data, {
    onEachFeature: function onEachFeature(feature, layer) {
      layer.on("click", function (e) {
        showPropertiesPopup(e, map, feature);
      });
    },
  }).addTo(map);
}

function showPropertiesPopup(event, map, feature) {
  let popup = L.popup();
  popup
    .setLatLng(event.latlng)
    .setContent(
      `<div>
            <h2>${feature.properties.name}</h2>
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

<style>
#map {
  height: 93.8vh;
}
</style>
