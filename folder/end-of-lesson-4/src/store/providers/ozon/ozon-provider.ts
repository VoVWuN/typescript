import { Provider } from "../../domain/provider.js";
import { SearchFilter } from "../../domain/search-filter.js";
import {
  Book as OzonBook,
  BookListResponse,
  BookResponse,
} from "./response.js";
import { Book } from "../../domain/book.js";
import { HttpHelper } from "../../domain/http-helper";
import { Genre } from "../../domain/genre.js";
import { Author } from "../../domain/author.js";

export class OzonProvider implements Provider {
  public static provider = "ozon";
  private static apiUrl = "https://fake-api.ozon.ru/v1";

  public find(filter: SearchFilter): Promise<Book[]> {
    return HttpHelper.fetchAsJson<BookListResponse>(
      OzonProvider.apiUrl + "/book?" + this.convertFilterToQueryString(filter)
    ).then((response) => {
      this.assertIsValidResponse(response);
      return this.convertBookListResponse(response);
    });
  }

  public getById(id: string): Promise<Book> {
    return HttpHelper.fetchAsJson<BookResponse>(
      OzonProvider.apiUrl + "/book/" + id
    ).then((response) => {
      // проверим, что ответ корректный
      this.assertIsValidResponse(response);
      // сконвертируем JSON-ответ в экземпляр Book
      return this.convertBookResponse(response.item);
    });
  }

  /**
   * Данный провайдер не использует http коды для ответов
   * В случае ошибки, она содержится в errorMessage
   * Необходимо убедиться, что ответ не является ошибкой
   */
  private assertIsValidResponse(
    response: BookListResponse | BookResponse
  ): void {
    if (response.errorMessage != null) {
      throw new Error(response.errorMessage);
    }
  }

  /**
   * Необходимо написать логику преобразования общего фильтра
   * в get-параметры текущего источника
   */
  private convertFilterToQueryString(filter: SearchFilter): string {
    return (
      `search=${filter.name}` +
      `&author=${filter.author.firstName} ${filter.author.lastName}`
    );
  }

  /**
   * Проходимся по каждому объекту и конвертируем его в экземпляр Book
   */
  private convertBookListResponse(response: BookListResponse): Book[] {
    return response.items.map((item) => {
      return this.convertBookResponse(item);
    });
  }

  /**
   * Здесь находится логика преобразования объекта книги из источника
   * в экземпляр Book нашего приложения
   */
  private convertBookResponse(item: OzonBook): Book {
    return new Book(
      OzonProvider.provider,
      String(item.id),
      item.title,
      this.mapGenre(item.genre),
      item.description,
      item.pageCount,
      item.price,
      new Author(item.author[0].name, item.author[0].surname)
    );
  }

  /**
   * Сопоставим жанры
   */
  private mapGenre(genre: string): Genre {
    const map: { [key: string]: Genre } = {
      HORRORS: Genre.Horror,
      FICTIONS: Genre.Fantasy,
      COMEDIES: Genre.Comedy,
      DRAMAS: Genre.Drama,
    };
    let mappedGenre = map[genre];
    if (mappedGenre == null) {
      mappedGenre = Genre.Unknown;
      return mappedGenre;
    }
  }
}