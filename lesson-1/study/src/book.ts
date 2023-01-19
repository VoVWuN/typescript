export interface IBook {
  name: string;
  genre: string;
  price: number;
}

export class Book implements IBook {
  name: string;
  genre: string;
  price: number;

  constructor(name, genre, price) {
    this.name = name;
    this.genre = genre;
    this.price = price;
  }
}