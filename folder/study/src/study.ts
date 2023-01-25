import { IAuthor } from './author.js';
import { IRatingable } from './ratingable.js';
import {
  addToShelf,
  addToShelfBunch,
  showCart,
  showRating,
} from './helpers.js';
import { IProduct } from './products.js';
import { IGenre, IReview } from './types.js';

class Book implements IRatingable, IProduct {
  name: string;
  genre: IGenre;
  price: number;
  reviews: IReview[];
  author: IAuthor;
  rating: number;

  constructor(
    name: string,
    genre: IGenre,
    price: number,
    author: IAuthor,
    rating: number,
    reviews?: IReview[],
  ) {
    this.name = name;
    this.genre = genre;
    this.price = price;
    this.author = author;
    if (reviews) {
      this.reviews = reviews;
      if (this.reviews.length > 0) {
        const reviewSum = this.reviews.reduce((sum, review) => {
          return sum + review[1];
        }, 0);
        this.rating = reviewSum / this.reviews.length;
      } else {
        this.rating = null;
      }
    } else {
      reviews = [];
    }
  }

  getProductDescription(): string {
    return `Book "${this.name}" by ${this.author.firstName}
${this.author.lastName}`;
  }
}

const reviews: IReview[] = [
  ['John', 5, 'It is my favorite book'],
  ['Mary', 3, 'I expected more from it :('],
  ['Clara', 5, 'Read it again and again!'],
];

/*const books: Book[] = [
  new Book(
    'Harry Potter and Philosopher Stone',
    'fantasy',
    900,
    {
      firstName: 'I',
      lastName: 'S',
    },
    5,
  ),
  // new Book('Warcraft', 'adventure', 650),
  // new Book('Game of thrones', 'drama', 1300),
  // new Book('Adventure', 'fantasy', 320),
];
function findBook(
  genre: string,
  page: number,
  multipleRecommendation = true,
): Book | Book[] {
  const findAlgorithm = (book: Book) => {
    return book.genre === genre && book.price <= page;
  };
  if (multipleRecommendation) {
    return books.filter(findAlgorithm);
  } else {
    return books.find(findAlgorithm);
  }
}*/

// console.log(findBook('fantasy', 1000));

// console.log(serialize(newBook));
// console.log(serialize(null));
// console.log(serialize(undefined));
// console.log(serialize(5));
// console.log(serialize(false));

const newBook = new Book(
  'Adventure',
  IGenre.Fantasy,
  320,
  { firstName: 'I', lastName: 'A' },
  5,
  reviews,
);

const notepad: IProduct = {
  price: 40,
  getProductDescription: () => {
    return 'Notepad with Unicorn, 50 pages';
  },
};

showCart([newBook, notepad]);
// console.log(newBook.price.toFixed(2));
console.log(newBook);
console.log(showRating(newBook));
console.log(newBook.genre);

addToShelfBunch('favorite', newBook, newBook, newBook);