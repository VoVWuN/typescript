import { renderBlock } from './lib.js';
export function renderSearchStubBlock() {
    renderBlock('search-results-block', `
    <div class='before-results-block'>
      <img src='img/start-search.png' />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `);
}
export function renderEmptyOrErrorSearchBlock(reasonMessage) {
    renderBlock('search-results-block', `
    <div class='no-results-block'>
      <img src='img/no-results.png' />
      <p>${reasonMessage}</p>
    </div>
    `);
}
export function renderSearchResultsBlock() {
    renderBlock('search-results-block', `
    <div class='search-results-header'>
        <p>Результаты поиска</p>
        <div class='search-results-filter'>
            <span><i class='icon icon-filter'></i> Сортировать:</span>
            <select>
                <option selected=''>Сначала дешёвые</option>
                <option selected=''>Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class='results-list'>
      <li class='result'>
        <div class='result-container'>
          <div class='result-img-container'>
            <div class='favorites active'></div>
            <img class='result-img' src='./img/result-1.png' alt=''>
          </div>	
          <div class='result-info'>
            <div class='result-info--header'>
              <p>YARD Residence Apart-hotel</p>
              <p class='price'>13000&#8381;</p>
            </div>
            <div class='result-info--map'><i class='map-icon'></i> 2.5км от вас</div>
            <div class='result-info--descr'>Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class='result-info--footer'>
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class='result'>
        <div class='result-container'>
          <div class='result-img-container'>
            <div class='favorites'></div>
            <img class='result-img' src='./img/result-2.png' alt=''>
          </div>	
          <div class='result-info'>
            <div class='result-info--header'>
              <p>Akyan St.Petersburg</p>
              <p class='price'>13000&#8381;</p>
            </div>
            <div class='result-info--map'><i class='map-icon'></i> 1.1км от вас</div>
            <div class='result-info--descr'>Отель Akyan St-Petersburg с бесплатным Wi-Fi на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class='result-info--footer'>
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLXJlc3VsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QyxNQUFNLFVBQVUscUJBQXFCO0lBQ25DLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7O0tBS0MsQ0FDRixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxhQUFhO0lBQ3pELFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7OztXQUdPLGFBQWE7O0tBRW5CLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsd0JBQXdCO0lBQ3RDLFdBQVcsQ0FDVCxzQkFBc0IsRUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBd0RDLENBQ0YsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZW5kZXJCbG9jayB9IGZyb20gJy4vbGliLmpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaFN0dWJCbG9jaygpIHtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3NlYXJjaC1yZXN1bHRzLWJsb2NrJyxcbiAgICBgXG4gICAgPGRpdiBjbGFzcz0nYmVmb3JlLXJlc3VsdHMtYmxvY2snPlxuICAgICAgPGltZyBzcmM9J2ltZy9zdGFydC1zZWFyY2gucG5nJyAvPlxuICAgICAgPHA+0KfRgtC+0LHRiyDQvdCw0YfQsNGC0Ywg0L/QvtC40YHQuiwg0LfQsNC/0L7Qu9C90LjRgtC1INGE0L7RgNC80YMg0LgmbmJzcDvQvdCw0LbQvNC40YLQtSBcItCd0LDQudGC0LhcIjwvcD5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyRW1wdHlPckVycm9yU2VhcmNoQmxvY2socmVhc29uTWVzc2FnZSkge1xuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLXJlc3VsdHMtYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPSduby1yZXN1bHRzLWJsb2NrJz5cbiAgICAgIDxpbWcgc3JjPSdpbWcvbm8tcmVzdWx0cy5wbmcnIC8+XG4gICAgICA8cD4ke3JlYXNvbk1lc3NhZ2V9PC9wPlxuICAgIDwvZGl2PlxuICAgIGAsXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJTZWFyY2hSZXN1bHRzQmxvY2soKSB7XG4gIHJlbmRlckJsb2NrKFxuICAgICdzZWFyY2gtcmVzdWx0cy1ibG9jaycsXG4gICAgYFxuICAgIDxkaXYgY2xhc3M9J3NlYXJjaC1yZXN1bHRzLWhlYWRlcic+XG4gICAgICAgIDxwPtCg0LXQt9GD0LvRjNGC0LDRgtGLINC/0L7QuNGB0LrQsDwvcD5cbiAgICAgICAgPGRpdiBjbGFzcz0nc2VhcmNoLXJlc3VsdHMtZmlsdGVyJz5cbiAgICAgICAgICAgIDxzcGFuPjxpIGNsYXNzPSdpY29uIGljb24tZmlsdGVyJz48L2k+INCh0L7RgNGC0LjRgNC+0LLQsNGC0Yw6PC9zcGFuPlxuICAgICAgICAgICAgPHNlbGVjdD5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHNlbGVjdGVkPScnPtCh0L3QsNGH0LDQu9CwINC00LXRiNGR0LLRi9C1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiBzZWxlY3RlZD0nJz7QodC90LDRh9Cw0LvQsCDQtNC+0YDQvtCz0LjQtTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24+0KHQvdCw0YfQsNC70LAg0LHQu9C40LbQtTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDx1bCBjbGFzcz0ncmVzdWx0cy1saXN0Jz5cbiAgICAgIDxsaSBjbGFzcz0ncmVzdWx0Jz5cbiAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWNvbnRhaW5lcic+XG4gICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWltZy1jb250YWluZXInPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nZmF2b3JpdGVzIGFjdGl2ZSc+PC9kaXY+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPSdyZXN1bHQtaW1nJyBzcmM9Jy4vaW1nL3Jlc3VsdC0xLnBuZycgYWx0PScnPlxuICAgICAgICAgIDwvZGl2Plx0XG4gICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8nPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8tLWhlYWRlcic+XG4gICAgICAgICAgICAgIDxwPllBUkQgUmVzaWRlbmNlIEFwYXJ0LWhvdGVsPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzcz0ncHJpY2UnPjEzMDAwJiM4MzgxOzwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8tLW1hcCc+PGkgY2xhc3M9J21hcC1pY29uJz48L2k+IDIuNdC60Lwg0L7RgiDQstCw0YE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J3Jlc3VsdC1pbmZvLS1kZXNjcic+0JrQvtC80YTQvtGA0YLQvdGL0Lkg0LDQv9Cw0YDRgi3QvtGC0LXQu9GMINCyINGB0LDQvNC+0Lwg0YHQtdGA0LTRhtC1INCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YDQs9CwLiDQmiDRg9GB0LvRg9Cz0LDQvCDQs9C+0YHRgtC10Lkg0L3QvtC80LXRgNCwINGBINCy0LjQtNC+0Lwg0L3QsCDQs9C+0YDQvtC0INC4INCx0LXRgdC/0LvQsNGC0L3Ri9C5IFdpLUZpLjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8tLWZvb3Rlcic+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbj7Ql9Cw0LHRgNC+0L3QuNGA0L7QstCw0YLRjDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9J3Jlc3VsdCc+XG4gICAgICAgIDxkaXYgY2xhc3M9J3Jlc3VsdC1jb250YWluZXInPlxuICAgICAgICAgIDxkaXYgY2xhc3M9J3Jlc3VsdC1pbWctY29udGFpbmVyJz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2Zhdm9yaXRlcyc+PC9kaXY+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPSdyZXN1bHQtaW1nJyBzcmM9Jy4vaW1nL3Jlc3VsdC0yLnBuZycgYWx0PScnPlxuICAgICAgICAgIDwvZGl2Plx0XG4gICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8nPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8tLWhlYWRlcic+XG4gICAgICAgICAgICAgIDxwPkFreWFuIFN0LlBldGVyc2J1cmc8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPSdwcmljZSc+MTMwMDAmIzgzODE7PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdyZXN1bHQtaW5mby0tbWFwJz48aSBjbGFzcz0nbWFwLWljb24nPjwvaT4gMS4x0LrQvCDQvtGCINCy0LDRgTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncmVzdWx0LWluZm8tLWRlc2NyJz7QntGC0LXQu9GMIEFreWFuIFN0LVBldGVyc2J1cmcg0YEg0LHQtdGB0L/Qu9Cw0YLQvdGL0LwgV2ktRmkg0L3QsCDQstGB0LXQuSDRgtC10YDRgNC40YLQvtGA0LjQuCDRgNCw0YHQv9C+0LvQvtC20LXQvSDQsiDQuNGB0YLQvtGA0LjRh9C10YHQutC+0Lwg0LfQtNCw0L3QuNC4INCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCz0LAuPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPSdyZXN1bHQtaW5mby0tZm9vdGVyJz5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uPtCX0LDQsdGA0L7QvdC40YDQvtCy0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIGAsXG4gICk7XG59XG4iXX0=