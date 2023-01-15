import { renderBlock } from './lib.js';

interface renderUserBlockProps {
  favoriteItemsAmount: number;
  userName: string;
  avatarLink: string;
}

export function renderUserBlock(
  favoriteItemsAmount: number,
  userName: string,
  avatarLink: string,
) {
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