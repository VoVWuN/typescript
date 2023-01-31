// declare module 'google-books-search' {
//   export type ISBN = 'ISBN_10' | 'ISBN_13' | 'ISSN' | 'OTHER';
//   export type PrintType = 'BOOK' | 'MAGAZINE';
//   export type MaturityRating = 'NOT_MATURE' | 'MATURE' | string;
//   export type LanguageCode = 'en' | 'ru' | string;
//   export type SearchField =
//     | 'title'
//     | 'author'
//     | 'publisher'
//     | 'subject'
//     | 'isbn';
//   export type SearchOrder = 'relevance' | 'newest';
//   export type SearchType = 'all' | 'magazines' | 'books';
//
//   export interface Book {
//     title: string;
//     subtitle: string;
//     authors: string[];
//     publishedDate: string;
//     description: string;
//     industryIdentifiers: {
//       type: ISBN;
//       identifier: string;
//     }[];
//     pageCount: number;
//     printType: PrintType;
//     categories: string[];
//     maturityRating: MaturityRating;
//     averageRating: number;
//     ratingsCount: number;
//     language: string;
//     id: string;
//     link: string;
//   }
//
//   export interface Callback<R> {
//     (err?: Error, result?: R);
//   }
//
//   export interface SearchOptions {
//     key?: string;
//     field?: SearchField;
//     offset?: number;
//     limit?: number;
//     type?: SearchType;
//     order?: SearchOrder;
//     lang?: string;
//   }
//
//   export function search(query: string, callback: Callback<Book[]>): void;
//   export function search(
//     query: string,
//     options: SearchOptions,
//     callback: Callback<Book[]>,
//   ): void;
//
//   export function lookup(query: string, callback: Callback<Book>): void;
// }
