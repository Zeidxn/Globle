<template>
  <v-container class="game">
    <v-btn color="primary" @click="newGame">New game</v-btn>
    <v-container class="search-container">
      <v-text-field
        v-model="inputValue"
        bg-color="white"
        prepend-inner-icon="mdi-magnify"
        item-title="name"
        label="Select country"
        return-object
        clearable
        @input="filterCountry($event)"
        @keydown.esc="filteredCountries = []"
        @keydown.enter="handleEnterKey"
      ></v-text-field>
      <v-list
        v-if="filteredCountries.length > 0"
        class="coutries-list elevation-5"
      >
        <v-list-item
          v-for="country in filteredCountries"
          :key="country.name"
          @click="selectCountry(country)"
        >
          <v-list-item-title>{{ country.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-container>
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
  filteredCountries: Country[] = [];
  inputValue = "";

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

    if (this.countrySelected!.name === this.correctCountry?.name) {
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
  }

  handleCloseEndDialog() {
    this.showEndDialog = false;
    this.newGame();
  }

  filterCountry(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    if (!value) {
      this.filteredCountries = [];
      return;
    }
    this.filteredCountries = this.countries.filter((country) =>
      country.name.toLowerCase().startsWith(value.toLowerCase())
    );
  }

  selectCountry(country: Country) {
    this.countrySelected = country;
    this.inputValue = country.name;
    this.filteredCountries = [];
  }

  handleEnterKey() {
    if (this.filteredCountries.length > 0) {
      this.selectCountry(this.filteredCountries[0]);
      this.submit();
    }
  }
}

export default toNative(Game);
</script>
<style>
.game {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: absolute;
  z-index: 2;
}

.coutries-list {
  position: absolute;
  width: 85%;
  max-height: 300px;
  overflow-y: auto;
  z-index: 3;
}
</style>
