import { renderBlock } from './lib';

export const getFavoritesAmount = () => {
  const favoriteList = JSON.parse(localStorage.getItem('favoriteItems'));
  let favoriteItemsAmount = 0;
  if (favoriteList === null) {
    localStorage.setItem('favoriteItemsAmount', JSON.stringify(favoriteItemsAmount));
    return favoriteItemsAmount;
    console.log(localStorage.getItem('favoriteItemsAmount'));
  } else {
    favoriteItemsAmount = favoriteList.length;
    localStorage.setItem('favoriteItemsAmount', JSON.stringify(favoriteItemsAmount));
    return favoriteItemsAmount;
  }

  // if (favoriteItemsAmount instanceof If) {
  //   console.log('favorite items amount: ', favoriteItemsAmount);
  // }
};

interface renderUserBlockProps {
  favoriteItemsAmount: number;
  userName: string;
  avatarLink: string;
}

export function renderUserBlock(
  userName: string,
  avatarLink: string,
  favoriteItemsAmount?: number,
) {
  localStorage.clear();
  localStorage.setItem(
    'user',
    JSON.stringify({ userName: userName, avatarLink: avatarLink }),
  );
  if (favoriteItemsAmount) {
    localStorage.setItem(
      'favoritesAmount',
      JSON.stringify({ favoriteItemsAmount: favoriteItemsAmount }),
    );
  } else {
    favoriteItemsAmount = getFavoritesAmount();
  }
  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    'user-block',
    `
    <div class='header-container'>
      <img class='avatar' src='${avatarLink}' 'alt='Wade Warren' />
    <div class='info'>
    <p class='name'>${userName}</p>
    <p class='fav'>
    <i class='heart-icon${
      hasFavoriteItems ? ' active' : ''
    }'></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `,
  );
}


class IUser implements Omit<renderUserBlockProps, 'favoriteItemsAmount'> {
  userName: string;
  avatarLink: string;
}

interface getUserDate {
  (user: string): void;
}

export const getUserDate: getUserDate = localStorageUser => {
  const user: unknown = JSON.parse(localStorage.getItem(localStorageUser));
  if (user instanceof IUser) {
    console.log('user: ', user.userName, user.avatarLink);
  }
};

class If implements Pick<renderUserBlockProps, 'favoriteItemsAmount'> {
  favoriteItemsAmount: number;
}

interface getFavoriteAmount {
  (localFavoriteAmounts: string): void;
}
