<template>
  <Header />
  <Search />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from './components/Header/Header.vue';
import Search from './components/Search/Search.vue';

@Options({
  components: {
    Header,
    Search
  }
})
export default class App extends Vue {}
</script>

<style>
  body {
  margin: 0;
  padding: 0;
  background-color: rgb(250, 248, 248)
}
</style>

