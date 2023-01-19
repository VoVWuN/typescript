import { renderSearchFormBlock, search } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { getFavoritesAmount, getUserDate, renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import { Place } from './types';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('User', './img/avatar.png', 0);
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
  getFavoritesAmount('favoritesAmount');

  const form = document.getElementById('search-form');

  const cb = (err: Error, result?: Place[]) => {
    setTimeout(() => {
      const chance = Math.random();
      console.log(chance);
      if (chance < 0.5) {
        if (!result) console.log([]);
        else console.log(result);
      } else {
        console.log(err);
      }
    }, 2000);
  };

  search(form, cb);
});