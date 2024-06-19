<template>
  <v-app>
    <v-main>
      <Map />
      <Game />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import Map from "./components/Map.vue";
import Game from "./components/Game.vue";

@Component({
  components: { Map, Game },
})
class App extends Vue {}

export default toNative(App);
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
