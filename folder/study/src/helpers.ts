import { Book } from './book.js';
import { IRatingable } from './ratingable.js';
import { IProduct } from './products.js';
import { IGenre } from './types.js';

export function serialize(value: unknown) {
  if (value == null) {
    return value + '';
  }

  if (value instanceof Book) {
    return `${value.name}, ${value.genre}, ${value.price}`;
  }

  return value.toString();
}

export function showRating(entity: IRatingable) {
  if (entity.rating == null) {
    return 'not rated yet';
  }
  const roundedRating = Math.round(entity.rating);
  let rating = '';
  for (let i = 0; i < roundedRating; i++) {
    rating += '⭐';
  }
  return rating + ` (${entity.rating.toFixed(2)})`;
}

export function showCart(products: IProduct[]) {
  let totalPrice = 0;
  products.forEach(product => {
    totalPrice += product.price;
    console.log(`${product.getProductDescription()} x ${product.price} rub.`);
  });
  console.log(`\nTotal items: ${products.length}, total cost: ${totalPrice}`);
}

export function getGenreName(genre: IGenre) {
  const genreMapping = {
    [IGenre.Adventure]: 'adventure',
    [IGenre.Fantasy]: 'fantasy',
    [IGenre.Horror]: 'horror',
  };

  return genreMapping[genre];
}

export function addToShelf(book: Book, shelfName = 'favorite'): void {
  console.log(book);
}

export function addToShelfBunch(shelfName, ...books: Book[]): void {
  books.forEach(book => addToShelf(book, shelfName));
}