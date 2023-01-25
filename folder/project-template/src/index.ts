import('./styles/index.css');
// import('./styles/reset.css');


import { renderSearchFormBlock, search } from './search-form';
import { renderEmptyOrErrorSearchBlock, renderSearchStubBlock } from './search-results';
import { getFavoritesAmount, getUserDate, renderUserBlock } from './user';
import { renderToast } from './lib';
import { Place } from './types';


window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('User', './img/avatar.png');
  renderSearchFormBlock();
  renderSearchStubBlock();
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто');
      },
    },
  );
  getUserDate('user');
  // getFavoritesAmount();

  const form = document.getElementById('search-form');
  const cb = (places: Place[]) => {

    // setTimeout(() => {
    //   const chance = Math.random();
    //   // console.log('chance: ', chance);
    //   if (chance < 0.5) {
    //     if (!result) {
    //       console.log([]);
    //     }
    //     // else console.log(result);
    //   } else {
    //     console.log(err);
    //   }
    // }, 2000);
  };

  search(form, cb);
});