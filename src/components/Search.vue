<template>
  <div class="side-nav" :class="{ sidenavopen: isSideNavOpen }">
    <div class="search-container">
      <span class="btn-close" @click="closeSidenav"
        ><i class="fa fa-times" aria-hidden="true"></i
      ></span>
      <input
        class="search-input"
        type="text"
        placeholder="Search..."
        v-model="searchString"
      />
    </div>

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
import { searchData } from "../database/repositories/repository.js";

defineProps({
  isSideNavOpen: Boolean,
});

let emit = defineEmits(["onSideNavClosed, onShopSelected"]);
let searchString = ref("");
let searchedData = computed(() => {
  return searchData(searchString);
});

function closeSidenav() {
  emit("onSideNavClosed", false);
}

function selectShop(shop) {
  searchString.value = "";
  emit("onShopSelected", shop);
  onSideNavClosed();
}
</script>

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
  overflow-x: hidden;
  transition: 0.3s;
  scroll-behavior: smooth;
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
  opacity: 1;
  overflow-x: hidden;
  transition: 0.3s;
  scroll-behavior: smooth;
}

.search-container {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 5px;
  opacity: 1;
  border-bottom: 1px solid lightgray;
}

.search-input {
  margin: 0.4em;
  font-size: 1.2em;
  padding: 0.4em;
  outline: none;
  border: none;
  background-color: rgba(231, 225, 225, 0.541);
  border-radius: 0.2em;
  position: sticky;
  top: 30px;
}

.btn-close {
  font-weight: 200;
  font-size: 1.4em;
  margin-top: 0.2em;
  margin-right: 0.5em;
  cursor: pointer;
  position: sticky;
  top: 5px;
  right: 0px;
  text-align: right;
}

.btn-close:focus .btn-close:hover {
  background-color: white;
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
  font-size: 1em;
  font-weight: 600;
}

.coordinates {
  margin: 0;
}

@media only screen and (max-width: 768px) {
  .sidenavopen {
    width: 250px;
  }

  .search-input {
    margin: 0.4em;
    font-size: 1em;
    padding: 0.2em;
  }
}
</style>
