<script setup>
import Map from "./components/Map.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div class="container">
    <NavBar></NavBar>
    <Map></Map>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
