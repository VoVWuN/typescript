import { Book } from './book.js';
import { IAuthor } from './author.js';
import { BookAuthor, IGenre } from './types.js';
import { Notepad } from './notepad.js';
import {
  BookCollection,
  Collection,
  ProductCollection,
} from './books-collection.js';
import { CollectionNew } from './collection.js';
import { getBookInfo } from './goole-books.js';
import { IRatingable } from './ratingable.js';
import { upperCase } from './string-helper.js';
import { search, lookup, Callback, Book as BookGoogle } from 'google-books-search';

// function findBook(
//   genre: string,
//   page: number,
//   multipleRecommendation = true,
// ): Book | Book[] {
//   const findAlgorithm = (book: Book) => {
//     return book.genre === genre && book.price <= page;
//   };
//
//   if (multipleRecommendation) {
//     return books.filter(findAlgorithm);
//   } else {
//     return books.find(findAlgorithm);
//   }
// }
//
// console.log(findBook('fantasy', 500));

const jkRowling: BookAuthor = {
  firstName: 'J.K.',
  lastName: 'Rowling',
  // rating: 4.6,
};

const harryPotter = new Book('Harry Potter', IGenre.Fantasy, 500, jkRowling);
const magicCreatures = new Book(
  'Magic Creatures',
  IGenre.Fantasy,
  340,
  jkRowling,
);
const unicornNotepad = new Notepad('Unicorn power', 30);

const cart = new ProductCollection();
cart.set(harryPotter.name, harryPotter);
cart.set(magicCreatures.name, magicCreatures);
cart.set(unicornNotepad.name, unicornNotepad);

const favoriteBookShelf = new BookCollection();
favoriteBookShelf.set(harryPotter.name, harryPotter);
favoriteBookShelf.set(magicCreatures.name, magicCreatures);

function getSummary(collection: CollectionNew<unknown>): string {
  if (collection instanceof BookCollection) {
    return `Total ${cart.size} books on the shelf.`;
  }

  if (collection instanceof ProductCollection) {
    return `Total ${cart.price} p. for ${cart.size}`;
  }

  return 'No special summary for this kind of collection.';
}

console.log(getSummary(cart));
console.log(getSummary(favoriteBookShelf));

// =================================================================
console.log('================================================================');
// Асинхронный код

const bookNameRequest = Promise.resolve('harryPotter');

bookNameRequest.then(name => {
  console.log(name.toUpperCase());
});

const harryPotterIsbn = '9783940862211';

getBookInfo(harryPotterIsbn)
  .then(book => {
    console.log(
      book.volumeInfo.title,
      // book.volumeInfo.description,
      // book.volumeInfo.authors[0],
    );
  })
  .catch(err => {
    console.log(err);
  });

interface OptionalAuthor extends Partial<IRatingable> {
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  booksWritten?: number;
}

const optionalAuthor: OptionalAuthor = {
  rating: 5,
  booksWritten: 10,
};

const fullAuthor: Required<OptionalAuthor> = {
  firstName: 'J. K.',
  lastName: 'Rowling',
  birthDate: new Date(),
  booksWritten: 15,
  rating: 4.7,
};

const author: BookAuthor = {
  firstName: 'J. K',
  lastName: 'Rowling',
};

const book = new Book('Harry Potter', IGenre.Fantasy, 100, author);
console.log(book);

// =================================================================
console.log('================================================================');
console.log('Урок 3');
console.log('================================================================');

console.log('upperCase Text: ', upperCase('Harry Potter'));

// console.log(search, lookup);

const searchCallback: Callback<BookGoogle[]> = (error, results) => {
  if (error) {
    console.log(error);
  } else {
    console.log(results[0]);
  }
};

search('harry potter and the sorcerer\'s stone', {
  type: 'magazines',
}, searchCallback);


lookup('xieSuAAACAAJ', (err, results) => {
  if (err) console.log(err);
  else console.log(results);
});