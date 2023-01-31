export interface SearchFormData extends HTMLFormControlsCollection {
  city: HTMLInputElement;
  checkin: HTMLInputElement;
  checkout: HTMLInputElement;
  price: HTMLInputElement;
  submit: HTMLButtonElement;
  homy: HTMLInputElement;
  flat: HTMLInputElement;
}

export interface Place {
  id: number | string;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
  availableDates: any;
}

export interface Flat {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: [];
  price: number;
}

export interface SearchFunction {
  (values: any): void;
}

export interface FilterFunction {
  (places: Place[]): void;
}