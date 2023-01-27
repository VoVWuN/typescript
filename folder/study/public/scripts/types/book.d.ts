import { IRatingable } from './ratingable.js';
import { IProduct } from './product.js';
import { BookAuthor, IGenre, IReview } from './types.js';
export declare class Book implements IRatingable, IProduct {
    name: string;
    genre: IGenre;
    price: number;
    reviews: IReview[];
    author: BookAuthor;
    rating: number;
    constructor(name: string, genre: IGenre, price: number, author: BookAuthor, rating?: number, reviews?: IReview[]);
    getProductDescription(): string;
}
export declare function getFromShelf(shelf: Book[], bookName: string): Book;
