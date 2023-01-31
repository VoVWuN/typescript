/**
 * Ответ с несколькими книгами
 */
export interface BookListResponse {
    errorMessage?: string;
    items: Book[];
  }
  
  /**
   * Ответ с одной книгой
   */
  export interface BookResponse {
    errorMessage?: string;
    item: Book;
  }
  
  /**
   * Структура самой книги
   */
  export interface Book {
    id: number;
    title: string;
    author: Author[];
    price: number;
    genre: string;
    pageCount: number;
    description: string;
  }
  
  /**
   * Структура автора
   */
  export interface Author {
    name: string;
    surname: string;
  }