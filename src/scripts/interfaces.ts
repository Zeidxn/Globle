export interface Country {
  code: string;
  name: string;
  latitude: number;
  longitude: number;
  color: string;
}

export interface StoreState {
  country: Country;
  countriesSubmited: Country[];
}
