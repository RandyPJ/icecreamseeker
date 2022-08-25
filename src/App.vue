<template>
  <div class="container">
    <NavBar @on-open-search="onOpenSearch"></NavBar>
    <Search
      @on-side-nav-closed="onCloseSearch"
      @on-shop-selected="onShopSelected"
      :is-side-nav-open="openSearch"
    ></Search>
    <Map :selected-shop="selectedShop"></Map>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Map from "./components/Map.vue";
import NavBar from "./components/NavBar.vue";
import Search from "./components/Search.vue";

let openSearch = ref(false);
let selectedShop = ref({});

function onOpenSearch(openSearchParam) {
  openSearch.value = openSearchParam;
}

function onCloseSearch(openSearchParam) {
  openSearch.value = openSearchParam;
}

function onShopSelected(selectedShopParam) {
  selectedShop.value = selectedShopParam;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
