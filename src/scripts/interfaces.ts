export interface Country {
  code: string;
  name: string;
  hdi: number;
}

export interface StoreState {
  country: string;
  countriesSubmited: Country[];
}
