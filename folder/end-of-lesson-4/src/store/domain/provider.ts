import { SearchFilter } from "./search-filter.js";
import { Book } from "./book.js";

export interface Provider {
  find(filter: SearchFilter): Promise<Book[]>;

  getById(id: string): Promise<Book>;
}