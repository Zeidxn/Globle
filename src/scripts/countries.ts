import * as jsonCountries from "@/store/countries.json";
import { Country } from "@/scripts/interfaces";

const countries: Country[] = jsonCountries;

function normalizeCountryName(countryName: string): string {
  const normalized = countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const uppercased = normalized.toUpperCase();

  return uppercased;
}

export function getAllCountries(): Country[] {
  const countriesNormalized: Country[] = [];

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];
    country.name = normalizeCountryName(country.name);

    countriesNormalized.push(country);
  }

  return countriesNormalized;
}
