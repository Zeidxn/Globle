<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script lang="ts">
import { Component, toNative, Vue, Watch } from "vue-facing-decorator";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ref } from "vue";
import { Country } from "@/scripts/interfaces";

const screenSize = ref({
  width: window.innerWidth,
  height: window.innerHeight,
});

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

@Component
class Map extends Vue {
  map!: mapboxgl.Map;
  popup!: mapboxgl.Popup | null;

  initCountry = false;
  initCountriesSubmited = false;
  declare $refs: {
    mapContainer: HTMLElement;
  };

  @Watch("$store.state.country", { immediate: true, deep: true })
  onCountryChange(newVal: string, oldVal: string) {
    if (this.initCountry) {
      this.updateData();
    } else {
      this.initCountry = true;
    }
  }

  @Watch("$store.state.countriesSubmited", { immediate: true, deep: true })
  onCountriesSubmitedChange(newVal: string, oldVal: string) {
    if (this.initCountriesSubmited) {
      console.log(this.$store.state.countriesSubmited);
      this.updateData();
    } else {
      this.initCountriesSubmited = true;
    }
  }

  mounted() {
    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/ntoupin411/clxn4ewph00jb01qmdjttct6y",
      center: [2.213749, 46.227638],
      zoom: screenSize.value.width < 600 ? 0 : 2,
    });

    this.map.on("load", () => {
      this.map.addSource("countries", {
        type: "vector",
        url: "mapbox://mapbox.country-boundaries-v1",
      });

      this.setupHoverEffect();
    });

    this.popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });
  }

  setupHoverEffect() {
    this.map.on("mousemove", "countries-join", (e) => {
      const country = e.features?.[0];
      if (country) {
        const countryCode = country?.properties?.iso_3166_1_alpha_3;
        const countryMap = this.getCountry(countryCode);
        const countryName = countryMap?.name as string;
        const countryColor = countryMap?.color;
        if (countryColor) {
          this.showCountryTooltip(e.lngLat, countryName);
        } else {
          this.hideCountryTooltip();
        }
      } else {
        this.hideCountryTooltip();
      }
    });

    this.map.on("mouseleave", "countries-join", () => {
      this.hideCountryTooltip();
    });
  }

  getCountry(countryCode: string): Country | null {
    return this.$store.state.countriesSubmited.find(
      (c: Country) => c.code === countryCode
    );
  }

  showCountryTooltip(lngLat: mapboxgl.LngLat, countryName: string) {
    if (this.popup) {
      this.popup.setLngLat(lngLat).setText(countryName).addTo(this.map);
    }
  }

  hideCountryTooltip() {
    if (this.popup) {
      this.popup.remove();
    }
  }

  updateData() {
    const matchExpression = [
      "match",
      ["get", "iso_3166_1_alpha_3"],
    ] as mapboxgl.Expression;

    for (const country of this.$store.state.countriesSubmited) {
      matchExpression.push(country["code"], country["color"]);
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
  z-index: 2;
}
</style>
