import { IRatingable } from './ratingable.js';
export interface IAuthor extends IRatingable {
    firstName: string;
    lastName: string;
    birthDate: Date;
    booksWritten: number;
}