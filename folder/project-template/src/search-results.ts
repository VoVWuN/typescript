import { filter, renderBlock, toggleFavoriteItem } from './lib';
import { Place } from './types';
import axios from 'axios';

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class='before-results-block'>
      <img src='img/start-search.png' />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `,
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    'search-results-block',
    `
    <div class='no-results-block'>
      <img src='img/no-results.png' />
      <p>${reasonMessage}</p>
    </div>
    `,
  );
}

export function renderList(places, value = 'minToMax') {
  const filterValue = 'minToMax';
  if (value === 'minToMax') {
    places.sort((a, b) => b.price - a.price);
    return places;
  }
  if (value === 'maxToMin') {
    places.sort((a, b) => a.price - b.price);
    return places;
  }
}

export function renderSearchResultsBlock(places: Place[]) {
  if (!places) {
    return renderEmptyOrErrorSearchBlock('Ничего не найдено');
  }

  let list = document.createElement('ul');
  list.classList.add('results-list');
  let item = document.createElement('li');

  const placesArray = renderList(places);
  placesArray.forEach(place => {
    item.classList.add('result');
    item.innerHTML = `
    <div class='result-container'>
          <div class='result-img-container'>
            <div class='favorites'></div>
            <img class='result-img' src='${place.image}' alt=''>
          </div>	
          <div class='result-info'>
            <div class='result-info--header'>
              <p>${place.name}</p>
              <p class='price'>${place.price}</p>
            </div>
            <div class='result-info--map'><i class='map-icon'></i> ${place.remoteness} км от вас</div>
            <div class='result-info--descr'>${place.description}</div>
            <div class='result-info--footer'>
              <div>
                <button id='book'>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
    `;
    list.appendChild(item);
    item = document.createElement('li');
  });

  renderBlock(
    'search-results-block',
    `
    <div class='search-results-header'>
        <p>Результаты поиска</p>
        <div class='search-results-filter'>
            <span><i class='icon icon-filter'></i> Сортировать:</span>
            <select id='filter'>
                <option value='minToMax' selected>Сначала дешёвые</option>
                <option value='maxToMin'>Сначала дорогие</option>
                <option value='close'>Сначала ближе</option>
            </select>
        </div>
    </div>
    ${list.outerHTML}
    `,
  );

  const filterItem: HTMLSelectElement = document.querySelector('#filter');
  filterItem.addEventListener('change', () => {
    const value = filterItem.value;
    // console.log(filterItem.options[filterItem.options.selectedIndex]);
    switch (value) {
      case 'minToMax':
        places.sort((a, b) => b.price - a.price);
        renderBlock(
          'results',
          `
    ${list.outerHTML}
    `,
        );
      case 'maxToMin':
        places.sort((a, b) => a.price - b.price);
      // renderSearchResultsBlock(places);
    }
  });

  const bookButtons = document.querySelectorAll('#book');
  bookButtons.forEach(button => {
    button.addEventListener('click', async event => {
      const listEl = button.closest('.result');
      const el = listEl
        .querySelector('.result-info--header')
        .querySelector('p').textContent;
      const favoriteEl = places.find(place => place.name === el);
      const searchValues = JSON.parse(localStorage.getItem('values'));
      await axios
        .patch(
          `http://localhost:3030/places/
      ${favoriteEl.id}
      ?checkInDate=${searchValues.checkInDate}
      &checkOutDate=${searchValues.checkOutDate}`,
          {
            checkin: new Date(),
            checkout: new Date(),
          },
        )
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
    });
  });

  const favoriteButtons = document.querySelectorAll('.favorites');
  favoriteButtons.forEach(button => {
    button.addEventListener('click', async event => {
      button.classList.toggle('active');
      const listEl = button.closest('.result');
      const el = listEl
        .querySelector('.result-info--header')
        .querySelector('p').textContent;
      const favoriteEl = places.find(place => place.name === el);
      toggleFavoriteItem(favoriteEl);
    });
  });
}