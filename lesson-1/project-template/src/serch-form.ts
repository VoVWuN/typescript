import { renderBlock } from './lib.js';
import { DateTime } from './ts-luxon.js';
import { Place, SearchFormData, SearchFunction } from './types';

const minDate = DateTime.local();
const maxDate = minDate.plus({ months: 1 }).endOf('month');

let startDate = minDate.plus({ days: 1 });
let endDate = minDate.plus({ days: 2 });

export function renderSearchFormBlock() {
  renderBlock(
    'search-form-block',
    `
    <form id='search-form'>
      <fieldset class='search-filedset'>
        <div class='row'>
          <div>
            <label for='city'>Город</label>
            <input id='city' type='text' disabled value='Санкт-Петербург' />
            <input type='hidden' disabled value='59.9386,30.3141' />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>-->
        </div>
        <div class='row'>
          <div>
            <label for='check-in-date'>Дата заезда</label>
            <input id='check-in-date' type='date' value='${startDate.toFormat(
              'yyyy-MM-dd',
            )}' min='${minDate.toFormat('yyyy-MM-dd')}' max='${maxDate.toFormat(
      'yyyy-MM-dd',
    )}' name='checkin' />
          </div>
          <div>
            <label for='check-out-date'>Дата выезда</label>
            <input id='check-out-date' type='date' value='${endDate.toFormat(
              'yyyy-MM-dd',
            )}' min='${minDate.toFormat('yyyy-MM-dd')}' max='${maxDate.toFormat(
      'yyyy-MM-dd',
    )}' name='checkout' />
          </div>
          <div>
            <label for='max-price'>Макс. цена суток</label>
            <input id='max-price' type='number' value='' name='price' class='max-price' />
          </div>
          <div>
            <div><button id='submit'>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `,
  );
}

interface SearchForm {
  cb: (err?: Error, result?: Place) => void;

  (form: HTMLFormElement): void;
}

export const searchFunction: SearchFunction = values => {
  console.log(values);
};

export const search = (form, cb) => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('form submitted');
    const elements = event.currentTarget.elements as SearchFormData;
    const values = {
      city: elements.city.value,
      checkin: elements.checkin.value,
      checkout: elements.checkout.value,
      price: elements.price.value,
    };
    searchFunction(values);
    cb();
  });
};