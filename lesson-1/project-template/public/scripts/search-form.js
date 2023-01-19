import { renderBlock } from './lib.js';
import { DateTime } from './ts-luxon.js';
const minDate = DateTime.local();
const maxDate = minDate.plus({ months: 1 }).endOf('month');
let startDate = minDate.plus({ days: 1 });
let endDate = minDate.plus({ days: 2 });
export function renderSearchFormBlock() {
    renderBlock('search-form-block', `
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
            <input id='check-in-date' type='date' value='${startDate.toFormat('yyyy-MM-dd')}' min='${minDate.toFormat('yyyy-MM-dd')}' max='${maxDate.toFormat('yyyy-MM-dd')}' name='checkin' />
          </div>
          <div>
            <label for='check-out-date'>Дата выезда</label>
            <input id='check-out-date' type='date' value='${endDate.toFormat('yyyy-MM-dd')}' min='${minDate.toFormat('yyyy-MM-dd')}' max='${maxDate.toFormat('yyyy-MM-dd')}' name='checkout' />
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
    `);
}
export const searchFunction = values => {
    console.log(values);
};
export const search = (form, cb) => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        console.log('form submitted');
        const elements = event.currentTarget.elements;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTNELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFeEMsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxXQUFXLENBQ1QsbUJBQW1CLEVBQ25COzs7Ozs7Ozs7Ozs7Ozs7OzsyREFpQnVELFNBQVMsQ0FBQyxRQUFRLENBQy9ELFlBQVksQ0FDYixVQUFVLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsT0FBTyxDQUFDLFFBQVEsQ0FDekUsWUFBWSxDQUNiOzs7OzREQUl1RCxPQUFPLENBQUMsUUFBUSxDQUM5RCxZQUFZLENBQ2IsVUFBVSxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLE9BQU8sQ0FBQyxRQUFRLENBQ3pFLFlBQVksQ0FDYjs7Ozs7Ozs7Ozs7O0tBWUEsQ0FDRixDQUFDO0FBQ0osQ0FBQztBQVFELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBbUIsTUFBTSxDQUFDLEVBQUU7SUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUU7SUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRTtRQUN0QyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBMEIsQ0FBQztRQUNoRSxNQUFNLE1BQU0sR0FBRztZQUNiLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDekIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSztZQUMvQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLO1lBQ2pDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDNUIsQ0FBQztRQUNGLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixFQUFFLEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcyc7XG5pbXBvcnQgeyBEYXRlVGltZSB9IGZyb20gJy4vdHMtbHV4b24uanMnO1xuaW1wb3J0IHsgUGxhY2UsIFNlYXJjaEZvcm1EYXRhLCBTZWFyY2hGdW5jdGlvbiB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBtaW5EYXRlID0gRGF0ZVRpbWUubG9jYWwoKTtcbmNvbnN0IG1heERhdGUgPSBtaW5EYXRlLnBsdXMoeyBtb250aHM6IDEgfSkuZW5kT2YoJ21vbnRoJyk7XG5cbmxldCBzdGFydERhdGUgPSBtaW5EYXRlLnBsdXMoeyBkYXlzOiAxIH0pO1xubGV0IGVuZERhdGUgPSBtaW5EYXRlLnBsdXMoeyBkYXlzOiAyIH0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyU2VhcmNoRm9ybUJsb2NrKCkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybSBpZD0nc2VhcmNoLWZvcm0nPlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPSdzZWFyY2gtZmlsZWRzZXQnPlxuICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPSdjaXR5Jz7Qk9C+0YDQvtC0PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD0nY2l0eScgdHlwZT0ndGV4dCcgZGlzYWJsZWQgdmFsdWU9J9Ch0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzJyAvPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9J2hpZGRlbicgZGlzYWJsZWQgdmFsdWU9JzU5LjkzODYsMzAuMzE0MScgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInByb3ZpZGVyc1wiPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImhvbXlcIiBjaGVja2VkIC8+IEhvbXk8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwicHJvdmlkZXJcIiB2YWx1ZT1cImZsYXQtcmVudFwiIGNoZWNrZWQgLz4gRmxhdFJlbnQ8L2xhYmVsPlxuICAgICAgICAgIDwvZGl2Pi0tPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz0ncm93Jz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj0nY2hlY2staW4tZGF0ZSc+0JTQsNGC0LAg0LfQsNC10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD0nY2hlY2staW4tZGF0ZScgdHlwZT0nZGF0ZScgdmFsdWU9JyR7c3RhcnREYXRlLnRvRm9ybWF0KFxuICAgICAgICAgICAgICAneXl5eS1NTS1kZCcsXG4gICAgICAgICAgICApfScgbWluPScke21pbkRhdGUudG9Gb3JtYXQoJ3l5eXktTU0tZGQnKX0nIG1heD0nJHttYXhEYXRlLnRvRm9ybWF0KFxuICAgICAgJ3l5eXktTU0tZGQnLFxuICAgICl9JyBuYW1lPSdjaGVja2luJyAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPSdjaGVjay1vdXQtZGF0ZSc+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD0nY2hlY2stb3V0LWRhdGUnIHR5cGU9J2RhdGUnIHZhbHVlPScke2VuZERhdGUudG9Gb3JtYXQoXG4gICAgICAgICAgICAgICd5eXl5LU1NLWRkJyxcbiAgICAgICAgICAgICl9JyBtaW49JyR7bWluRGF0ZS50b0Zvcm1hdCgneXl5eS1NTS1kZCcpfScgbWF4PScke21heERhdGUudG9Gb3JtYXQoXG4gICAgICAneXl5eS1NTS1kZCcsXG4gICAgKX0nIG5hbWU9J2NoZWNrb3V0JyAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPSdtYXgtcHJpY2UnPtCc0LDQutGBLiDRhtC10L3QsCDRgdGD0YLQvtC6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD0nbWF4LXByaWNlJyB0eXBlPSdudW1iZXInIHZhbHVlPScnIG5hbWU9J3ByaWNlJyBjbGFzcz0nbWF4LXByaWNlJyAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PjxidXR0b24gaWQ9J3N1Ym1pdCc+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGAsXG4gICk7XG59XG5cbmludGVyZmFjZSBTZWFyY2hGb3JtIHtcbiAgY2I6IChlcnI/OiBFcnJvciwgcmVzdWx0PzogUGxhY2UpID0+IHZvaWQ7XG5cbiAgKGZvcm06IEhUTUxGb3JtRWxlbWVudCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBzZWFyY2hGdW5jdGlvbjogU2VhcmNoRnVuY3Rpb24gPSB2YWx1ZXMgPT4ge1xuICBjb25zb2xlLmxvZyh2YWx1ZXMpO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlYXJjaCA9IChmb3JtLCBjYikgPT4ge1xuICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnNvbGUubG9nKCdmb3JtIHN1Ym1pdHRlZCcpO1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZXZlbnQuY3VycmVudFRhcmdldC5lbGVtZW50cyBhcyBTZWFyY2hGb3JtRGF0YTtcbiAgICBjb25zdCB2YWx1ZXMgPSB7XG4gICAgICBjaXR5OiBlbGVtZW50cy5jaXR5LnZhbHVlLFxuICAgICAgY2hlY2tpbjogZWxlbWVudHMuY2hlY2tpbi52YWx1ZSxcbiAgICAgIGNoZWNrb3V0OiBlbGVtZW50cy5jaGVja291dC52YWx1ZSxcbiAgICAgIHByaWNlOiBlbGVtZW50cy5wcmljZS52YWx1ZSxcbiAgICB9O1xuICAgIHNlYXJjaEZ1bmN0aW9uKHZhbHVlcyk7XG4gICAgY2IoKTtcbiAgfSk7XG59O1xuIl19