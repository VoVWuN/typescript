export interface IBookResponse {
    kind: string;
    totalItems: number;
    items: IBook[];
}
export interface IBook {
    id: string;
    kind: string;
    etag: string;
    volumeInfo: {
        title: string;
        authors: string[];
        description: string;
        publishedDate: string;
    };
}
export declare function getBookInfo(isbn: string): Promise<IBook>;