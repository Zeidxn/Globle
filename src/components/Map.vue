<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { Component, Vue, Watch, toNative } from "vue-facing-decorator";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

@Component
class Map extends Vue {
  map!: mapboxgl.Map;
  init = false;
  declare $refs: {
    mapContainer: HTMLElement;
  };

  @Watch("$store.state.country", { immediate: true, deep: true })
  onCountryChange(newVal: string, oldVal: string) {
    if (this.init) {
      console.log(this.$store.state.country);

      this.updateData();
    } else {
      this.init = true;
    }
  }

  mounted() {
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/ntoupin411/clxlpz1pb00fw01qr2tafcyhl",
      center: [2.213749, 46.227638],
      zoom: 2,
    });

    this.map.on("load", () => {
      this.map.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      this.$store.commit("addCountrySubmited", {
        code: "FRA",
        name: "France",
        hdi: 1,
      });

      this.updateData();
    });

    this.init = true;
  }

  updateData() {
    const matchExpression = [
      "match",
      ["get", "iso_3166_1_alpha_3"],
    ] as mapboxgl.Expression;

    for (const row of this.$store.state.countriesSubmited) {
      const green = Math.floor(row["hdi"] * 255);
      const color = `rgb(0, ${green}, 0)`;

      matchExpression.push(row["code"], color);
    }

    matchExpression.push("rgba(0, 0, 0, 0)");

    const WORLDVIEW = "US";
    const worldview_filter = [
      "all",
      ["==", ["get", "disputed"], "false"],
      [
        "any",
        ["==", "all", ["get", "worldview"]],
        ["in", WORLDVIEW, ["get", "worldview"]],
      ],
    ];

    if (this.map.getLayer("countries-join") !== undefined) {
      this.map.removeLayer("countries-join");
    }

    if (this.$store.state.countriesSubmited.length !== 0) {
      this.map.addLayer(
        {
          id: "countries-join",
          type: "fill",
          source: "countries",
          "source-layer": "country_boundaries",
          paint: {
            "fill-color": matchExpression,
          },
          filter: worldview_filter,
        },
        "admin-1-boundary-bg"
      );
    }
  }
}

export default toNative(Map);
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.map-container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
</style>
