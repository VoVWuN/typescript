import { addToShelfBunch, showCart, showRating, } from './helpers.js';
import { IGenre } from './types.js';
class Book {
    constructor(name, genre, price, author, rating, reviews) {
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
            }
            else {
                this.rating = null;
            }
        }
        else {
            reviews = [];
        }
    }
    getProductDescription() {
        return `Book "${this.name}" by ${this.author.firstName}
${this.author.lastName}`;
    }
}
const reviews = [
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
const newBook = new Book('Adventure', IGenre.Fantasy, 320, { firstName: 'I', lastName: 'A' }, 5, reviews);
const notepad = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R1ZHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3R1ZHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUVMLGVBQWUsRUFDZixRQUFRLEVBQ1IsVUFBVSxHQUNYLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFBRSxNQUFNLEVBQVcsTUFBTSxZQUFZLENBQUM7QUFFN0MsTUFBTSxJQUFJO0lBUVIsWUFDRSxJQUFZLEVBQ1osS0FBYSxFQUNiLEtBQWEsRUFDYixNQUFlLEVBQ2YsTUFBYyxFQUNkLE9BQW1CO1FBRW5CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO29CQUNwRCxPQUFPLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDTixJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzthQUMvQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBRUQscUJBQXFCO1FBQ25CLE9BQU8sU0FBUyxJQUFJLENBQUMsSUFBSSxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUztFQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQUVELE1BQU0sT0FBTyxHQUFjO0lBQ3pCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSx3QkFBd0IsQ0FBQztJQUNyQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsNEJBQTRCLENBQUM7SUFDekMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLDBCQUEwQixDQUFDO0NBQ3pDLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBRUgsMENBQTBDO0FBRTFDLG1DQUFtQztBQUNuQyxnQ0FBZ0M7QUFDaEMscUNBQXFDO0FBQ3JDLDZCQUE2QjtBQUM3QixpQ0FBaUM7QUFFakMsTUFBTSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQ3RCLFdBQVcsRUFDWCxNQUFNLENBQUMsT0FBTyxFQUNkLEdBQUcsRUFDSCxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxFQUNqQyxDQUFDLEVBQ0QsT0FBTyxDQUNSLENBQUM7QUFFRixNQUFNLE9BQU8sR0FBYTtJQUN4QixLQUFLLEVBQUUsRUFBRTtJQUNULHFCQUFxQixFQUFFLEdBQUcsRUFBRTtRQUMxQixPQUFPLGdDQUFnQyxDQUFDO0lBQzFDLENBQUM7Q0FDRixDQUFDO0FBRUYsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDN0IseUNBQXlDO0FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUzQixlQUFlLENBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQXV0aG9yIH0gZnJvbSAnLi9hdXRob3IuanMnO1xuaW1wb3J0IHsgSVJhdGluZ2FibGUgfSBmcm9tICcuL3JhdGluZ2FibGUuanMnO1xuaW1wb3J0IHtcbiAgYWRkVG9TaGVsZixcbiAgYWRkVG9TaGVsZkJ1bmNoLFxuICBzaG93Q2FydCxcbiAgc2hvd1JhdGluZyxcbn0gZnJvbSAnLi9oZWxwZXJzLmpzJztcbmltcG9ydCB7IElQcm9kdWN0IH0gZnJvbSAnLi9wcm9kdWN0cy5qcyc7XG5pbXBvcnQgeyBJR2VucmUsIElSZXZpZXcgfSBmcm9tICcuL3R5cGVzLmpzJztcblxuY2xhc3MgQm9vayBpbXBsZW1lbnRzIElSYXRpbmdhYmxlLCBJUHJvZHVjdCB7XG4gIG5hbWU6IHN0cmluZztcbiAgZ2VucmU6IElHZW5yZTtcbiAgcHJpY2U6IG51bWJlcjtcbiAgcmV2aWV3czogSVJldmlld1tdO1xuICBhdXRob3I6IElBdXRob3I7XG4gIHJhdGluZzogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBnZW5yZTogSUdlbnJlLFxuICAgIHByaWNlOiBudW1iZXIsXG4gICAgYXV0aG9yOiBJQXV0aG9yLFxuICAgIHJhdGluZzogbnVtYmVyLFxuICAgIHJldmlld3M/OiBJUmV2aWV3W10sXG4gICkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nZW5yZSA9IGdlbnJlO1xuICAgIHRoaXMucHJpY2UgPSBwcmljZTtcbiAgICB0aGlzLmF1dGhvciA9IGF1dGhvcjtcbiAgICBpZiAocmV2aWV3cykge1xuICAgICAgdGhpcy5yZXZpZXdzID0gcmV2aWV3cztcbiAgICAgIGlmICh0aGlzLnJldmlld3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCByZXZpZXdTdW0gPSB0aGlzLnJldmlld3MucmVkdWNlKChzdW0sIHJldmlldykgPT4ge1xuICAgICAgICAgIHJldHVybiBzdW0gKyByZXZpZXdbMV07XG4gICAgICAgIH0sIDApO1xuICAgICAgICB0aGlzLnJhdGluZyA9IHJldmlld1N1bSAvIHRoaXMucmV2aWV3cy5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJhdGluZyA9IG51bGw7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldmlld3MgPSBbXTtcbiAgICB9XG4gIH1cblxuICBnZXRQcm9kdWN0RGVzY3JpcHRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYEJvb2sgXCIke3RoaXMubmFtZX1cIiBieSAke3RoaXMuYXV0aG9yLmZpcnN0TmFtZX1cbiR7dGhpcy5hdXRob3IubGFzdE5hbWV9YDtcbiAgfVxufVxuXG5jb25zdCByZXZpZXdzOiBJUmV2aWV3W10gPSBbXG4gIFsnSm9obicsIDUsICdJdCBpcyBteSBmYXZvcml0ZSBib29rJ10sXG4gIFsnTWFyeScsIDMsICdJIGV4cGVjdGVkIG1vcmUgZnJvbSBpdCA6KCddLFxuICBbJ0NsYXJhJywgNSwgJ1JlYWQgaXQgYWdhaW4gYW5kIGFnYWluISddLFxuXTtcblxuLypjb25zdCBib29rczogQm9va1tdID0gW1xuICBuZXcgQm9vayhcbiAgICAnSGFycnkgUG90dGVyIGFuZCBQaGlsb3NvcGhlciBTdG9uZScsXG4gICAgJ2ZhbnRhc3knLFxuICAgIDkwMCxcbiAgICB7XG4gICAgICBmaXJzdE5hbWU6ICdJJyxcbiAgICAgIGxhc3ROYW1lOiAnUycsXG4gICAgfSxcbiAgICA1LFxuICApLFxuICAvLyBuZXcgQm9vaygnV2FyY3JhZnQnLCAnYWR2ZW50dXJlJywgNjUwKSxcbiAgLy8gbmV3IEJvb2soJ0dhbWUgb2YgdGhyb25lcycsICdkcmFtYScsIDEzMDApLFxuICAvLyBuZXcgQm9vaygnQWR2ZW50dXJlJywgJ2ZhbnRhc3knLCAzMjApLFxuXTtcblxuZnVuY3Rpb24gZmluZEJvb2soXG4gIGdlbnJlOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgbXVsdGlwbGVSZWNvbW1lbmRhdGlvbiA9IHRydWUsXG4pOiBCb29rIHwgQm9va1tdIHtcbiAgY29uc3QgZmluZEFsZ29yaXRobSA9IChib29rOiBCb29rKSA9PiB7XG4gICAgcmV0dXJuIGJvb2suZ2VucmUgPT09IGdlbnJlICYmIGJvb2sucHJpY2UgPD0gcGFnZTtcbiAgfTtcblxuICBpZiAobXVsdGlwbGVSZWNvbW1lbmRhdGlvbikge1xuICAgIHJldHVybiBib29rcy5maWx0ZXIoZmluZEFsZ29yaXRobSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJvb2tzLmZpbmQoZmluZEFsZ29yaXRobSk7XG4gIH1cbn0qL1xuXG4vLyBjb25zb2xlLmxvZyhmaW5kQm9vaygnZmFudGFzeScsIDEwMDApKTtcblxuLy8gY29uc29sZS5sb2coc2VyaWFsaXplKG5ld0Jvb2spKTtcbi8vIGNvbnNvbGUubG9nKHNlcmlhbGl6ZShudWxsKSk7XG4vLyBjb25zb2xlLmxvZyhzZXJpYWxpemUodW5kZWZpbmVkKSk7XG4vLyBjb25zb2xlLmxvZyhzZXJpYWxpemUoNSkpO1xuLy8gY29uc29sZS5sb2coc2VyaWFsaXplKGZhbHNlKSk7XG5cbmNvbnN0IG5ld0Jvb2sgPSBuZXcgQm9vayhcbiAgJ0FkdmVudHVyZScsXG4gIElHZW5yZS5GYW50YXN5LFxuICAzMjAsXG4gIHsgZmlyc3ROYW1lOiAnSScsIGxhc3ROYW1lOiAnQScgfSxcbiAgNSxcbiAgcmV2aWV3cyxcbik7XG5cbmNvbnN0IG5vdGVwYWQ6IElQcm9kdWN0ID0ge1xuICBwcmljZTogNDAsXG4gIGdldFByb2R1Y3REZXNjcmlwdGlvbjogKCkgPT4ge1xuICAgIHJldHVybiAnTm90ZXBhZCB3aXRoIFVuaWNvcm4sIDUwIHBhZ2VzJztcbiAgfSxcbn07XG5cbnNob3dDYXJ0KFtuZXdCb29rLCBub3RlcGFkXSk7XG4vLyBjb25zb2xlLmxvZyhuZXdCb29rLnByaWNlLnRvRml4ZWQoMikpO1xuY29uc29sZS5sb2cobmV3Qm9vayk7XG5jb25zb2xlLmxvZyhzaG93UmF0aW5nKG5ld0Jvb2spKTtcbmNvbnNvbGUubG9nKG5ld0Jvb2suZ2VucmUpO1xuXG5hZGRUb1NoZWxmQnVuY2goJ2Zhdm9yaXRlJywgbmV3Qm9vaywgbmV3Qm9vaywgbmV3Qm9vayk7XG4iXX0=