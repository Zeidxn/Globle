<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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

    const data = [
      { code: "ROU", hdi: 0.811 },
      { code: "RUS", hdi: 0.816 },
      { code: "SRB", hdi: 0.787 },
      { code: "SVK", hdi: 0.855 },
      { code: "SVN", hdi: 0.896 },
      { code: "ESP", hdi: 0.891 },
      { code: "SWE", hdi: 0.933 },
      { code: "CHE", hdi: 0.944 },
      { code: "HRV", hdi: 0.831 },
      { code: "CZE", hdi: 0.888 },
      { code: "DNK", hdi: 0.929 },
      { code: "EST", hdi: 0.871 },
      { code: "FIN", hdi: 0.92 },
      { code: "FRA", hdi: 0.901 },
      { code: "DEU", hdi: 0.936 },
      { code: "GRC", hdi: 0.87 },
      { code: "ALB", hdi: 0.785 },
      { code: "AND", hdi: 0.858 },
      { code: "AUT", hdi: 0.908 },
      { code: "BLR", hdi: 0.808 },
      { code: "BEL", hdi: 0.916 },
      { code: "BIH", hdi: 0.768 },
      { code: "BGR", hdi: 0.813 },
      { code: "MKD", hdi: 0.757 },
      { code: "MLT", hdi: 0.878 },
      { code: "MDA", hdi: 0.7 },
      { code: "MNE", hdi: 0.814 },
      { code: "NLD", hdi: 0.931 },
      { code: "NOR", hdi: 0.953 },
      { code: "POL", hdi: 0.865 },
      { code: "PRT", hdi: 0.847 },
      { code: "HUN", hdi: 0.838 },
      { code: "ISL", hdi: 0.935 },
      { code: "IRL", hdi: 0.938 },
      { code: "ITA", hdi: 0.88 },
      { code: "LVA", hdi: 0.847 },
      { code: "LIE", hdi: 0.916 },
      { code: "LTU", hdi: 0.858 },
      { code: "LUX", hdi: 0.904 },
      { code: "UKR", hdi: 0.751 },
      { code: "GBR", hdi: 0.922 },
    ];

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
