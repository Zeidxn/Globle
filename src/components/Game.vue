<template>
  <v-container class="game">
    <v-btn color="primary" @click="newGame" height="55">New game</v-btn>
    <v-autocomplete
      class="bg-white rounded-lg"
      :value="inputValue"
      :items="filteredCountries"
      item-title="name"
      max-width="800"
      min-width="500"
      label="Select country"
      prepend-inner-icon="mdi-magnify"
      menu-icon=""
      :disabled="disableInput"
      hide-details
      autofocus
      @input="filterCountry"
      @keydown.enter="handleEnterKey"
      @update:model-value="handleClickList"
    ></v-autocomplete>
  </v-container>
  <EndDialog
    v-if="showEndDialog"
    @restart="handleRestartGame"
    @close="handleCloseEndDialog"
    :dialog="showEndDialog"
    message="You have selected the correct country!"
  />
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
  filteredCountries: Country[] = [];
  inputValue = "";
  disableInput = false;

  mounted() {
    this.newGame();
  }

  newGame() {
    this.disableInput = false;
    this.countries = getAllCountries();
    this.filteredCountries = this.countries;

    const randomIndex = Math.floor(Math.random() * this.countries.length);
    this.correctCountry = this.countries[randomIndex];
    console.log(this.correctCountry);
    this.$store.commit("setCountry", this.correctCountry.name);
  }

  submit() {
    const index = this.countries.indexOf(this.countrySelected!);

    if (this.countrySelected?.name === this.correctCountry?.name) {
      this.showEndDialog = true;
    }

    this.countrySelected!.color = getColorByDistanceBetweenCountry(
      this.correctCountry!,
      this.countrySelected!
    );
    this.$store.commit("addCountrySubmited", this.countrySelected);
    this.countries.splice(index, 1);
    this.countrySelected = null;
    this.inputValue = "";
    this.filteredCountries = this.countries;
  }

  filterCountry(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.filteredCountries = this.countries;
      return;
    }
    this.filteredCountries = this.countries.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
  }

  selectCountry(country: Country) {
    this.countrySelected = country;
    this.inputValue = country.name;
    this.submit();
  }

  handleEnterKey() {
    if (this.filteredCountries.length > 0) {
      this.selectCountry(this.filteredCountries[0]);
    }
  }

  handleClickList(item: string) {
    const country = this.countries.find((c) => c.name === item);
    this.inputValue = item;
    if (country && this.inputValue.length > 0) {
      this.selectCountry(country);
    }
  }

  handleRestartGame() {
    this.showEndDialog = false;
    this.newGame();
  }

  handleCloseEndDialog() {
    this.showEndDialog = false;
    this.disableInput = true;
  }
}

export default toNative(Game);
</script>

<style>
.game {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: absolute;

  z-index: 2;
}
</style>
