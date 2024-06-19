<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getCountryCodeByName } from "@/scripts/countries";

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

@Component
class HelloWorld extends Vue {
  map: mapboxgl.Map | undefined;
  declare $refs: {
    mapContainer: HTMLElement;
  };

  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/light-v11",
      center: [2.213749, 46.227638],
      zoom: 4,
    });

    this.map = map;

    const france = getCountryCodeByName("France");

    const data = [{ code: france, hdi: 1 }];

    map.on("load", () => {
      map.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      const matchExpression = [
        "match",
        ["get", "iso_3166_1_alpha_3"],
      ] as mapboxgl.Expression;

      for (const row of data) {
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

      map.addLayer(
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
    });
  }
}

export default toNative(HelloWorld);
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
}
</style>
