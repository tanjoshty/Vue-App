<template>
  <div class="loading-spinner">
    <div class="loader">
      <i class="fas fa-spinner fa-spin fa-6x"></i>
    </div>
  </div>
</template>

<script>
import { Vue } from 'vue-class-component';
export default class Loader extends Vue {

}
</script>

<style>
.loading-spinner {
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 999;
}

.loader {
  float: left;
  margin: -50% 0 0 -50%;
  background-color: rgba(0,0,0,0.5);
  border-radius: 10px;
  padding: 3em;
  color: white;
}
</style>