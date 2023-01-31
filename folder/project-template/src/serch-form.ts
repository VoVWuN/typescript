import { dateToUnixStamp, filter, renderBlock, renderToast } from './lib';
import { DateTime } from 'ts-luxon';
import { Flat, Place, SearchFormData, SearchFunction } from './types';
import axios, { AxiosResponse } from 'axios';
import { renderSearchResultsBlock } from './search-results';
// import { FlatRentSdk } from 'typescript-flatrent-sdk';

const minDate = DateTime.local();
const maxDate = minDate.plus({ months: 1 }).endOf('month');

const startDate = minDate.plus({ days: 1 });
const endDate = minDate.plus({ days: 2 });

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
          <div class='providers'>
            <label><input type='checkbox' id='homy' name='provider' value='homy' checked /> Homy</label>
            <label><input type='checkbox' id='flat' name='provider' value='flat-rent' /> FlatRent</label>
          </div>
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
  console.log('search values:', values);
};

export const search = (form, cb) => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const elements = event.currentTarget.elements as SearchFormData;
    const values = {
      city: elements.city.value,
      checkInDate: new Date(elements.checkin.value),
      checkOutDate: new Date(elements.checkout.value),
      price: +elements.price.value,
      homy: elements.homy.checked,
      flatRent: elements.flat.checked,
    };

    localStorage.setItem('values', JSON.stringify(values));
    try {
      let placesArray = [];

      /*if (values.flatRent) {
        const sdk = new FlatRentSdk();
        sdk
          .search({
            city: values.city,
            checkInDate: values.checkInDate,
            checkOutDate: values.checkOutDate,
            priceLimit: values.price,
          })
          .then(flats => {
            for (const flat of flats) {
              const flatPLace: Partial<Place> = {
                id: flat.id,
                image: flat.photos[1],
                name: flat.title,
                description: flat.details,
                bookedDates: flat.bookedDates,
                price: flat.price,
              };
              placesArray.push(flatPLace);
            }
          })
          .catch(result => {
            console.error('serach incorrect city', result);
          });
      }*/

      if (values.homy) {
        const response = await axios.get<Place[]>(
          `http://localhost:3030/places?checkInDate=${dateToUnixStamp(
            values.checkInDate,
          )}&checkOutDate=${dateToUnixStamp(
            values.checkOutDate,
          )}&coordinates=59.9386,30.3141`,
        );
        response.data.forEach(place => {
          placesArray.push(place);
        });
      }
      localStorage.setItem('places', JSON.stringify(placesArray));
      renderSearchResultsBlock(placesArray);
    } catch (e) {
      console.log(e);
      renderToast(
        {
          text: 'Сервер не работает',
          type: 'unsuccessful',
        },
        {
          name: 'Понял',
          handler: () => {
            console.log('Уведомление закрыто');
          },
        },
      );
    }
    searchFunction(values);
  });
};