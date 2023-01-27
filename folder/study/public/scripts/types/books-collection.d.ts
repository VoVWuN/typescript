import { Book } from './book.js';
import { IReview } from './types.js';
import { CollectionNew } from './collection.js';
import { IProduct } from './product.js';
export declare const reviews: IReview[];
export interface Collection<T> {
    [key: string]: T;
}
export declare class ProductCollection<T extends IProduct> extends CollectionNew<T> {
    get price(): number;
}
export declare class BookCollection extends ProductCollection<Book> {
}