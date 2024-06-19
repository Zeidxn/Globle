import * as jsonCountries from "@/store/countries.json";

interface Country {
  code: string;
  name: string;
  eu: boolean;
}

const countries: Country[] = jsonCountries;

function normalizeCountryName(countryName: string): string {
  const normalized = countryName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const uppercased = normalized.toUpperCase();

  return uppercased;
}

export function getCountryCodeByName(countryName: string): string | null {
  const upperCaseName = normalizeCountryName(countryName);

  for (let i = 0; i < countries.length; i++) {
    const country = countries[i];

    if (normalizeCountryName(country.name) === upperCaseName) {
      return country.code;
    }
  }

  return null;
}
