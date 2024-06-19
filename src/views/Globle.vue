<script lang="ts">
import { Vue, Component } from "vue-facing-decorator";
import Map from "../components/Map.vue";
import Game from "../components/Game.vue";

@Component({
  components: { Map, Game },
})
export default class Globle extends Vue {}
</script>
<template>
  <Map />
  <Game />
</template>

<style scoped></style>
