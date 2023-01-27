import { IProduct } from './product';
export declare class Notepad implements IProduct {
    name: string;
    price: number;
    constructor(name: string, price: number);
    getProductDescription(): string;
}