export declare const getFavoritesAmount: () => number;
export declare function renderUserBlock(userName: string, avatarLink: string, favoriteItemsAmount?: number): void;
interface getUserDate {
    (user: string): void;
}
export declare const getUserDate: getUserDate;
export {};