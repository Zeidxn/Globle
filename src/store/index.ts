import { createStore } from "vuex";
import { StoreState, Country } from "@/scripts/interfaces";

export default createStore<StoreState>({
  state: {
    country: {
      name: "",
      code: "",
      latitude: 0,
      longitude: 0,
      color: "rgb(0, 0, 0)",
    },
    countriesSubmited: [],
  },
  getters: {},
  mutations: {
    setCountry(state, country: Country) {
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
