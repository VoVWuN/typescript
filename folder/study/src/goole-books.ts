import { Book } from './book.js';
import fetch from 'node-fetch';

export interface IBookResponse {
  kind: string;
  totalItems: number;
  items: IBook[];
}

export interface IBook {
  id: string;
  kind: string;
  etag: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    publishedDate: string;
  };
}

export function getBookInfo(isbn: string) {
  return fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
    .then(response => response.text())
    .then<IBookResponse>(responseText => JSON.parse(responseText))
    .then(data => {
      // console.log(typeof data);
      if (data.totalItems === 0) {
        throw Error(`There is no books with isbn ${isbn}`);
      }

      return data.items[0];
    });
}