<template>
  <v-container class="game">
    <v-btn color="primary" @click="newGame">New game</v-btn>
    <v-autocomplete
      v-model="countrySelected"
      item-title="name"
      label="Select country"
      return-object
      :items="countries"
    ></v-autocomplete>
    <v-btn :disabled="countrySelected === null" color="primary" @click="submit"
      >Submit</v-btn
    >
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { Country } from "@/scripts/interfaces";
import { getAllCountries } from "@/scripts/countries";

@Component
class Game extends Vue {
  countries: Country[] = [];
  countrySelected: Country | null = null;

  mounted() {
    this.countries = getAllCountries();
  }

  newGame() {
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    const country = this.countries[randomIndex];

    this.$store.commit("setCountry", country.name);
  }

  submit() {
    this.$store.commit("addCountrySubmited", this.countrySelected);

    this.countrySelected = null;
  }
}

export default toNative(Game);
</script>

<style>
.game {
  position: absolute;
  z-index: 2;
}
</style>
