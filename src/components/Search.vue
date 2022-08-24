<template>
  <div class="side-nav" :class="{ sidenavopen: isSideNavOpen }">
    <span class="btn-close" @click="onSideNavClosed"
      ><i class="fa fa-close"></i
    ></span>
    <input
      class="search-input"
      type="text"
      placeholder="Search..."
      v-model="searchString"
    />
    <div
      class="list"
      v-for="shop in searchedData"
      v-bind:key="shop.coordinates[0]"
    >
      <div class="list-item" @click="selectShop(shop)">
        <h3 class="shop-name">{{ shop.properties.name }}</h3>
        <p class="coordinates">{{ shop.coordinates.slice() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from "vue";
import { getGeoData, searchData } from "../database/repositories/repository.js";

defineProps({
  isSideNavOpen: Boolean,
});

let data = reactive(getGeoData());
let emit = defineEmits(["onSideNavClosed, onShopSelected"]);

function onSideNavClosed() {
  emit("onSideNavClosed", false);
}

let searchString = ref("");
let searchedData = computed(() => {
  return data.filter((d) =>
    d.properties.name.toLowerCase().includes(searchString.value.toLowerCase())
  );
});

function selectShop(shop) {
  emit("onShopSelected", shop);
  onSideNavClosed();
}
</script>const

<style>
.side-nav {
  display: flex;
  flex-direction: column;
  width: 0px;
  height: 100%;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  background-color: white;
  opacity: 0.9;
  overflow-x: hidden;
  transition: 0.3s;
}

.sidenavopen {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 400px;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  background-color: white;
  opacity: 0.9;
  overflow-x: hidden;
  transition: 0.3s;
}

.search-input {
  margin: 0.4em;
  font-size: 1.2em;
  padding: 0.4em;
  outline: none;
  border: none;
  background-color: rgba(231, 225, 225, 0.541);
  border-radius: 0.2em;
}

.btn-close {
  font-size: 1.2em;
  margin: 0.4em;
  cursor: pointer;
}

.list {
  margin: 4px;
}

.list-item {
  font-size: 1em;
  cursor: pointer;
  padding: 4px;
}

.list-item:hover {
  background: lightgray;
  transition: 0.2s;
}

.shop-name {
  padding: 0;
}

.coordinates {
  margin: 0;
}

@media screen {
}
</style>
