import { createStore } from "vuex";
import { StoreState, Country } from "@/scripts/interfaces";

export default createStore<StoreState>({
  state: {
    country: "",
    countriesSubmited: [],
  },
  getters: {},
  mutations: {
    setCountry(state, country: string) {
      state.country = country;
      state.countriesSubmited = [];
    },
    addCountrySubmited(state, country: Country) {
      state.countriesSubmited.push(country);
    },
  },
  actions: {},
  modules: {},
});
