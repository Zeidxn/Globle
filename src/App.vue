<template>
  <v-app>
    <v-main>
      <Globle />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";

import Globle from "./views/Globle.vue";
@Component({
  components: { Globle },
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
