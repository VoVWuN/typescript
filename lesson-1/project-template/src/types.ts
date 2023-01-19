export interface SearchFormData extends HTMLFormControlsCollection {
    city: HTMLInputElement;
    checkin: HTMLInputElement;
    checkout: HTMLInputElement;
    price: HTMLInputElement;
    submit: HTMLButtonElement;
  }
  
  export interface Place {}
  
  export interface SearchFunction {
    (values: any): void;
  }