import {Book} from './book.js';
import {books} from './books-collection.js';



function findBook(genre: string, page: number, multipleRecommendation = true): Book | Book[] {
  const findAlgorithm = (book: Book) => {
    return book.genre === genre && book.pageAmount <= page
  }

  if (multipleRecommendation) {
    return books.filter(findAlgorithm)
  } else {
    return books.find(findAlgorithm)
  }
}

console.log(findBook('fantasy', 500));