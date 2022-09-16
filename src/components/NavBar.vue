<template>
  <div class="navbar">
    <h1 class="title">Helados Bon Seeker</h1>
    <span @click="openSearch()" class="btn-opensearch fa fa-search"></span>
  </div>
</template>

<script setup>
const emit = defineEmits(["openSearch"]);

function openSearch() {
  emit("openSearch", true);
}
</script>


<style scoped>
.navbar {
  height: 6vh;
  display: flex;
  justify-content: center;
  place-items: center;
  border-bottom: 1px solid rgb(179, 175, 175);
}

.title {
  font-size: 1.2em;
  font-weight: 300;
  color: rgb(156, 151, 151);
}

.btn-opensearch {
  cursor: pointer;
  font-size: 1.2em;
  position: absolute;
  top: 14px;
  right: 10px;
}

@media only screen and (max-width: 768px) {
  .btn-opensearch {
    font-size: 1em;
    top: 12px;
  }
}
</style>
