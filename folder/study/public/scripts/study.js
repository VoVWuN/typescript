// import { addToShelfBunch, showCart, showRating } from './helpers.js';
// import { IProduct } from './product.js ';
// import { IGenre, IReview } from './types.js';
// import { Book, getFromShelf } from './book.js';
// import {
//   getFromShelfNew,
//   programmingLiterature,
//   programmingLiteratureMap,
//   reviews,
// } from './books-collection.js';
// import { CollectionNew } from './collection.js';
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
/*
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
// console.log(newBook);
console.log(showRating(newBook));
console.log(newBook.genre);
addToShelfBunch('favorite', newBook, newBook);
// =================================================================
console.log(getFromShelfNew(programmingLiterature, 'Cracking'));
// const foundBook = getFromMap(programmingLiteratureMap, 'Cracking');
// console.log('from getFromMap(): ', foundBook);
// =================================================================
// const foundBookCollection = getFromMap(programmingLiteratureMap, 'Cracking');
// console.log('from getFromMap() with Collection: ', foundBook);
console.log(programmingLiteratureMap.size);
console.log(programmingLiteratureMap.has('Cracking'));
// =================================================================
new CollectionNew<Book, number>();
new CollectionNew<Book, string>();
new CollectionNew<Book, symbol>();
new CollectionNew<Book>();
// ================================================================
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3R1ZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0VBQXdFO0FBQ3hFLDRDQUE0QztBQUM1QyxnREFBZ0Q7QUFDaEQsa0RBQWtEO0FBQ2xELFdBQVc7QUFDWCxxQkFBcUI7QUFDckIsMkJBQTJCO0FBQzNCLDhCQUE4QjtBQUM5QixhQUFhO0FBQ2Isa0NBQWtDO0FBQ2xDLG1EQUFtRDtBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBRUgsMENBQTBDO0FBRTFDLG1DQUFtQztBQUNuQyxnQ0FBZ0M7QUFDaEMscUNBQXFDO0FBQ3JDLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFDakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQWdERSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IGFkZFRvU2hlbGZCdW5jaCwgc2hvd0NhcnQsIHNob3dSYXRpbmcgfSBmcm9tICcuL2hlbHBlcnMuanMnO1xuLy8gaW1wb3J0IHsgSVByb2R1Y3QgfSBmcm9tICcuL3Byb2R1Y3QuanMgJztcbi8vIGltcG9ydCB7IElHZW5yZSwgSVJldmlldyB9IGZyb20gJy4vdHlwZXMuanMnO1xuLy8gaW1wb3J0IHsgQm9vaywgZ2V0RnJvbVNoZWxmIH0gZnJvbSAnLi9ib29rLmpzJztcbi8vIGltcG9ydCB7XG4vLyAgIGdldEZyb21TaGVsZk5ldyxcbi8vICAgcHJvZ3JhbW1pbmdMaXRlcmF0dXJlLFxuLy8gICBwcm9ncmFtbWluZ0xpdGVyYXR1cmVNYXAsXG4vLyAgIHJldmlld3MsXG4vLyB9IGZyb20gJy4vYm9va3MtY29sbGVjdGlvbi5qcyc7XG4vLyBpbXBvcnQgeyBDb2xsZWN0aW9uTmV3IH0gZnJvbSAnLi9jb2xsZWN0aW9uLmpzJztcblxuLypjb25zdCBib29rczogQm9va1tdID0gW1xuICBuZXcgQm9vayhcbiAgICAnSGFycnkgUG90dGVyIGFuZCBQaGlsb3NvcGhlciBTdG9uZScsXG4gICAgJ2ZhbnRhc3knLFxuICAgIDkwMCxcbiAgICB7XG4gICAgICBmaXJzdE5hbWU6ICdJJyxcbiAgICAgIGxhc3ROYW1lOiAnUycsXG4gICAgfSxcbiAgICA1LFxuICApLFxuICAvLyBuZXcgQm9vaygnV2FyY3JhZnQnLCAnYWR2ZW50dXJlJywgNjUwKSxcbiAgLy8gbmV3IEJvb2soJ0dhbWUgb2YgdGhyb25lcycsICdkcmFtYScsIDEzMDApLFxuICAvLyBuZXcgQm9vaygnQWR2ZW50dXJlJywgJ2ZhbnRhc3knLCAzMjApLFxuXTtcblxuZnVuY3Rpb24gZmluZEJvb2soXG4gIGdlbnJlOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgbXVsdGlwbGVSZWNvbW1lbmRhdGlvbiA9IHRydWUsXG4pOiBCb29rIHwgQm9va1tdIHtcbiAgY29uc3QgZmluZEFsZ29yaXRobSA9IChib29rOiBCb29rKSA9PiB7XG4gICAgcmV0dXJuIGJvb2suZ2VucmUgPT09IGdlbnJlICYmIGJvb2sucHJpY2UgPD0gcGFnZTtcbiAgfTtcblxuICBpZiAobXVsdGlwbGVSZWNvbW1lbmRhdGlvbikge1xuICAgIHJldHVybiBib29rcy5maWx0ZXIoZmluZEFsZ29yaXRobSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJvb2tzLmZpbmQoZmluZEFsZ29yaXRobSk7XG4gIH1cbn0qL1xuXG4vLyBjb25zb2xlLmxvZyhmaW5kQm9vaygnZmFudGFzeScsIDEwMDApKTtcblxuLy8gY29uc29sZS5sb2coc2VyaWFsaXplKG5ld0Jvb2spKTtcbi8vIGNvbnNvbGUubG9nKHNlcmlhbGl6ZShudWxsKSk7XG4vLyBjb25zb2xlLmxvZyhzZXJpYWxpemUodW5kZWZpbmVkKSk7XG4vLyBjb25zb2xlLmxvZyhzZXJpYWxpemUoNSkpO1xuLy8gY29uc29sZS5sb2coc2VyaWFsaXplKGZhbHNlKSk7XG4vKlxuXG5jb25zdCBuZXdCb29rID0gbmV3IEJvb2soXG4gICdBZHZlbnR1cmUnLFxuICBJR2VucmUuRmFudGFzeSxcbiAgMzIwLFxuICB7IGZpcnN0TmFtZTogJ0knLCBsYXN0TmFtZTogJ0EnIH0sXG4gIDUsXG4gIHJldmlld3MsXG4pO1xuXG5jb25zdCBub3RlcGFkOiBJUHJvZHVjdCA9IHtcbiAgcHJpY2U6IDQwLFxuICBnZXRQcm9kdWN0RGVzY3JpcHRpb246ICgpID0+IHtcbiAgICByZXR1cm4gJ05vdGVwYWQgd2l0aCBVbmljb3JuLCA1MCBwYWdlcyc7XG4gIH0sXG59O1xuXG5zaG93Q2FydChbbmV3Qm9vaywgbm90ZXBhZF0pO1xuLy8gY29uc29sZS5sb2cobmV3Qm9vay5wcmljZS50b0ZpeGVkKDIpKTtcbi8vIGNvbnNvbGUubG9nKG5ld0Jvb2spO1xuY29uc29sZS5sb2coc2hvd1JhdGluZyhuZXdCb29rKSk7XG5jb25zb2xlLmxvZyhuZXdCb29rLmdlbnJlKTtcblxuYWRkVG9TaGVsZkJ1bmNoKCdmYXZvcml0ZScsIG5ld0Jvb2ssIG5ld0Jvb2spO1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zb2xlLmxvZyhnZXRGcm9tU2hlbGZOZXcocHJvZ3JhbW1pbmdMaXRlcmF0dXJlLCAnQ3JhY2tpbmcnKSk7XG5cbi8vIGNvbnN0IGZvdW5kQm9vayA9IGdldEZyb21NYXAocHJvZ3JhbW1pbmdMaXRlcmF0dXJlTWFwLCAnQ3JhY2tpbmcnKTtcbi8vIGNvbnNvbGUubG9nKCdmcm9tIGdldEZyb21NYXAoKTogJywgZm91bmRCb29rKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gY29uc3QgZm91bmRCb29rQ29sbGVjdGlvbiA9IGdldEZyb21NYXAocHJvZ3JhbW1pbmdMaXRlcmF0dXJlTWFwLCAnQ3JhY2tpbmcnKTtcbi8vIGNvbnNvbGUubG9nKCdmcm9tIGdldEZyb21NYXAoKSB3aXRoIENvbGxlY3Rpb246ICcsIGZvdW5kQm9vayk7XG5jb25zb2xlLmxvZyhwcm9ncmFtbWluZ0xpdGVyYXR1cmVNYXAuc2l6ZSk7XG5jb25zb2xlLmxvZyhwcm9ncmFtbWluZ0xpdGVyYXR1cmVNYXAuaGFzKCdDcmFja2luZycpKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxubmV3IENvbGxlY3Rpb25OZXc8Qm9vaywgbnVtYmVyPigpO1xubmV3IENvbGxlY3Rpb25OZXc8Qm9vaywgc3RyaW5nPigpO1xubmV3IENvbGxlY3Rpb25OZXc8Qm9vaywgc3ltYm9sPigpO1xubmV3IENvbGxlY3Rpb25OZXc8Qm9vaz4oKTtcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuKi9cbiJdfQ==