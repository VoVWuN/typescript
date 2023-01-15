import { renderBlock } from './lib.js';
import { DateTime } from './luxon.js';
const minDate = DateTime.local();
const maxDate = minDate.plus({ months: 1 }).endOf('month');
let startDate = minDate.plus({ days: 1 });
let endDate = minDate.plus({ days: 2 });
export function renderSearchFormBlock() {
    renderBlock('search-form-block', `
    <form>
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
            <input id='max-price' type='text' value='' name='price' class='max-price' />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUN2QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNqQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTNELElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMxQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFeEMsTUFBTSxVQUFVLHFCQUFxQjtJQUNuQyxXQUFXLENBQ1QsbUJBQW1CLEVBQ25COzs7Ozs7Ozs7Ozs7Ozs7OzsyREFpQnVELFNBQVMsQ0FBQyxRQUFRLENBQy9ELFlBQVksQ0FDYixVQUFVLE9BQU8sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsT0FBTyxDQUFDLFFBQVEsQ0FDekUsWUFBWSxDQUNiOzs7OzREQUl1RCxPQUFPLENBQUMsUUFBUSxDQUM5RCxZQUFZLENBQ2IsVUFBVSxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLE9BQU8sQ0FBQyxRQUFRLENBQ3pFLFlBQVksQ0FDYjs7Ozs7Ozs7Ozs7O0tBWUEsQ0FDRixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlckJsb2NrIH0gZnJvbSAnLi9saWIuanMnO1xuaW1wb3J0IHsgRGF0ZVRpbWUgfSBmcm9tICcuL2x1eG9uLmpzJztcblxuY29uc3QgbWluRGF0ZSA9IERhdGVUaW1lLmxvY2FsKCk7XG5jb25zdCBtYXhEYXRlID0gbWluRGF0ZS5wbHVzKHsgbW9udGhzOiAxIH0pLmVuZE9mKCdtb250aCcpO1xuXG5sZXQgc3RhcnREYXRlID0gbWluRGF0ZS5wbHVzKHsgZGF5czogMSB9KTtcbmxldCBlbmREYXRlID0gbWluRGF0ZS5wbHVzKHsgZGF5czogMiB9KTtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jaygpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1mb3JtLWJsb2NrJyxcbiAgICBgXG4gICAgPGZvcm0+XG4gICAgICA8ZmllbGRzZXQgY2xhc3M9J3NlYXJjaC1maWxlZHNldCc+XG4gICAgICAgIDxkaXYgY2xhc3M9J3Jvdyc+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9J2NpdHknPtCT0L7RgNC+0LQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPSdjaXR5JyB0eXBlPSd0ZXh0JyBkaXNhYmxlZCB2YWx1ZT0n0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LMnIC8+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT0naGlkZGVuJyBkaXNhYmxlZCB2YWx1ZT0nNTkuOTM4NiwzMC4zMTQxJyAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+LS0+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPSdjaGVjay1pbi1kYXRlJz7QlNCw0YLQsCDQt9Cw0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPSdjaGVjay1pbi1kYXRlJyB0eXBlPSdkYXRlJyB2YWx1ZT0nJHtzdGFydERhdGUudG9Gb3JtYXQoXG4gICAgICAgICAgICAgICd5eXl5LU1NLWRkJyxcbiAgICAgICAgICAgICl9JyBtaW49JyR7bWluRGF0ZS50b0Zvcm1hdCgneXl5eS1NTS1kZCcpfScgbWF4PScke21heERhdGUudG9Gb3JtYXQoXG4gICAgICAneXl5eS1NTS1kZCcsXG4gICAgKX0nIG5hbWU9J2NoZWNraW4nIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9J2NoZWNrLW91dC1kYXRlJz7QlNCw0YLQsCDQstGL0LXQt9C00LA8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPSdjaGVjay1vdXQtZGF0ZScgdHlwZT0nZGF0ZScgdmFsdWU9JyR7ZW5kRGF0ZS50b0Zvcm1hdChcbiAgICAgICAgICAgICAgJ3l5eXktTU0tZGQnLFxuICAgICAgICAgICAgKX0nIG1pbj0nJHttaW5EYXRlLnRvRm9ybWF0KCd5eXl5LU1NLWRkJyl9JyBtYXg9JyR7bWF4RGF0ZS50b0Zvcm1hdChcbiAgICAgICd5eXl5LU1NLWRkJyxcbiAgICApfScgbmFtZT0nY2hlY2tvdXQnIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9J21heC1wcmljZSc+0JzQsNC60YEuINGG0LXQvdCwINGB0YPRgtC+0Lo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPSdtYXgtcHJpY2UnIHR5cGU9J3RleHQnIHZhbHVlPScnIG5hbWU9J3ByaWNlJyBjbGFzcz0nbWF4LXByaWNlJyAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PjxidXR0b24+0J3QsNC50YLQuDwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgPC9mb3JtPlxuICAgIGAsXG4gICk7XG59XG4iXX0=