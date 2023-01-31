// структура всего ответа
export interface BookResponse {
  kind: string
  totalItems: number
  items: Book[]
}

// структура самой книги
// опишем только основные поля, с которыми планируем работать
export interface Book {
  id: string
  kind: string
  etag: string
  volumeInfo: {
    title: string
    authors: string[]
    description: string
    publishedDate: string
  }
}

export function getBookInfo(isbn: string) {
  return fetch('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
  .then((response) => {
    return response.text()
  })
  // укажем тип результата в этом месте
  .then<BookResponse>((responseText) => {
    return JSON.parse(responseText)
  })
  .then((data) => {
    // таким обрзаом здесь data уже имеет тип BookResponse
    if (data.totalItems === 0) {
      throw Error(`There is no book with isbn ${isbn}.`)
    }

    // вернём первую книгу, так как одному ISBN соответствует одна книга
    return data.items[0]
  })
}