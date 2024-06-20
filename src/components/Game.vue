<template>
  <v-container class="game">
    <v-btn color="primary" @click="newGame">New game</v-btn>
    <v-autocomplete
      v-model="countrySelected"
      max-width="500"
      min-width="300"
      item-title="name"
      label="Select country"
      return-object
      :items="countries"
    ></v-autocomplete>
    <v-btn :disabled="countrySelected === null" color="primary" @click="submit"
      >Submit</v-btn
    >
  </v-container>
  <EndDialog v-if="showEndDialog" @click="handleCloseEndDialog" />
</template>

<script lang="ts">
import { Component, Vue, toNative } from "vue-facing-decorator";
import { Country } from "@/scripts/interfaces";
import { getAllCountries } from "@/scripts/countries";
import EndDialog from "./EndDialog.vue";
import { getColorByDistanceBetweenCountry } from "@/scripts/calcul";

@Component({
  components: { EndDialog },
})
@Component
class Game extends Vue {
  correctCountry: Country | null = null;
  countries: Country[] = [];
  countrySelected: Country | null = null;
  showEndDialog = false;

  mounted() {
    this.newGame();
  }

  newGame() {
    this.countries = getAllCountries();
    const randomIndex = Math.floor(Math.random() * this.countries.length);
    this.correctCountry = this.countries[randomIndex];
    this.$store.commit("setCountry", this.correctCountry.name);
  }

  submit() {
    const index = this.countries.indexOf(this.countrySelected!);

    if (this.countrySelected!.name === this.$store.state.country.name) {
      console.log("Vous avez gagné !");
    }

    this.countrySelected!.color = getColorByDistanceBetweenCountry(
      this.$store.state.country,
      this.countrySelected!
    );

    this.$store.commit("addCountrySubmited", this.countrySelected);
    if (this.correctCountry?.name === this.countrySelected?.name) {
      this.showEndDialog = true;
    } else {
      this.countries = this.countries.filter(
        (country) => country.name !== this.countrySelected?.name
      );
    }

    this.countries.splice(index, 1);

    this.countrySelected = null;
  }

  handleCloseEndDialog() {
    this.showEndDialog = false;
    this.newGame();
  }
}

export default toNative(Game);
</script>

<style>
.game {
  display: flex;
  position: absolute;
  z-index: 2;
}
</style>
