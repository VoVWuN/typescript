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
    id: number;
    image: string;
    name: string;
    description: string;
    remoteness: number;
    bookedDates: number[];
    price: number;
    availableDates: any;
}
export interface SearchFunction {
    (values: any): void;
}