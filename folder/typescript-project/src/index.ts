import { Book } from "./book.js";
import { IGenre, Review } from "./types.js";
import { Author } from "./author.js";
import { Notepad } from "./notepad.js";
import { Product } from "./product.js";
import { PurchaseContext } from "./purchase-context.js";

export { Author } from "./author.js";
export { BookCollection } from "./book-collection.js";
export { Book } from "./book.js";
export { Collection } from "./collection.js";
export { Notepad } from "./notepad.js";
export { Product } from "./product.js";
export { Ratingable } from "./ratingable.js";

const fullAuthor: Author = {
  firstName: "J. K.",
  lastName: "Rowling",
  rating: 4.7,
};

const book = new Book("Harry Potter", IGenre.Fantasy, 100, fullAuthor);
console.log(book);
// book.rating = 5;
console.log(book.rating);
// book.addReview(["Joe", 4, "Good one!"]);
console.log(book.rating);

book.addReview(["Joe", 4, "Good one!"]);
const reviewToDelete: Review = ["Sara", 5, ""];
book.addReview(reviewToDelete);
book.removeReview(reviewToDelete);

console.log(book.getReviews(), book.rating);

// =================================================================
// protected

const book2 = new Book("Harry Potter", IGenre.Fantasy, 100, fullAuthor);
const notepad = new Notepad("Godric Gryffindor's notepad", 30);

const products: Product[] = [book, notepad];

const context: PurchaseContext = {
  user: {
    clientLevel: 1,
  },
  cart: {
    items: products.length,
    totalSum: products.reduce((accumilate, currentValue) => {
      return accumilate + currentValue.price;
    }, 0),
  },
};

console.log(
  `${book.getDiscountPrice(context)} instead of ${book.price}`,
  "\n",
  `${notepad.getDiscountPrice(context)} instead of ${notepad.price}`
);