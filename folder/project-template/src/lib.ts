import { Place } from './types';
import { renderSearchResultsBlock } from './search-results';

export function renderBlock(elementId, html) {
  const element = document.getElementById(elementId);
  element.innerHTML = html;
}

export function renderToast(message, action) {
  let messageText = '';

  if (message != null) {
    messageText = `
      <div id='info-block' class='info-block ${message.type}'>
        <p>${message.text}</p>
        <button id='toast-main-action'>${action?.name || 'Закрыть'}</button>
      </div>
    `;
  }

  renderBlock('toast-block', messageText);

  const button = document.getElementById('toast-main-action');
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler();
      }
      renderToast(null, null);
    };
  }
}

export function toggleFavoriteItem(item: Place) {
  console.log(localStorage.getItem('favoriteItems'));
  let favoriteList = JSON.parse(localStorage.getItem('favoriteItems'));

  if (favoriteList === null) {
    favoriteList = [];
  }
  const el = {
    id: item.id,
    name: item.name,
    image: item.image,
  };

  favoriteList.push(el);
  localStorage.setItem('favoriteItems', JSON.stringify(favoriteList));

  favoriteList.forEach(favorite => {
    if (favorite.id === item.id) {
      favoriteList.splice(favorite.id, 1);
      localStorage.setItem('favoriteItems', JSON.stringify(favoriteList));
    }
  });
}

export function dateToUnixStamp(date) {
  return date.getTime() / 1000;
}

export function filter(value: string, places: Place[]) {
  switch (value) {
    case 'minToMax':
      places.sort((a, b) => b.price - a.price);
      renderSearchResultsBlock(places);
    case 'maxToMin':
      places.sort((a, b) => a.price - b.price);
      renderSearchResultsBlock(places);
  }
}