import { renderBlock } from './lib.js';
export function renderUserBlock(favoriteItemsAmount, userName, avatarLink) {
    const favoritesCaption = favoriteItemsAmount
        ? favoriteItemsAmount
        : 'ничего нет';
    const hasFavoriteItems = favoriteItemsAmount ? true : false;
    renderBlock('user-block', `
    <div class='header-container'>
      <img class='avatar' src='${avatarLink}' 'alt='Wade Warren' />
    <div class='info'>
    <p class='name'>${userName}</p>
    <p class='fav'>
    <i class='heart-icon${hasFavoriteItems ? ' active' : ''}'></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFRdkMsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsbUJBQTJCLEVBQzNCLFFBQWdCLEVBQ2hCLFVBQWtCO0lBRWxCLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQW1CO1FBQzFDLENBQUMsQ0FBQyxtQkFBbUI7UUFDckIsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUNqQixNQUFNLGdCQUFnQixHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM1RCxXQUFXLENBQ1QsWUFBWSxFQUNaOztpQ0FFNkIsVUFBVTs7c0JBRXJCLFFBQVE7OzBCQUd4QixnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUNqQyxTQUFTLGdCQUFnQjs7OztLQUl4QixDQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcyc7XG5cbmludGVyZmFjZSByZW5kZXJVc2VyQmxvY2tQcm9wcyB7XG4gIGZhdm9yaXRlSXRlbXNBbW91bnQ6IG51bWJlcjtcbiAgdXNlck5hbWU6IHN0cmluZztcbiAgYXZhdGFyTGluazogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyVXNlckJsb2NrKFxuICBmYXZvcml0ZUl0ZW1zQW1vdW50OiBudW1iZXIsXG4gIHVzZXJOYW1lOiBzdHJpbmcsXG4gIGF2YXRhckxpbms6IHN0cmluZyxcbikge1xuICBjb25zdCBmYXZvcml0ZXNDYXB0aW9uID0gZmF2b3JpdGVJdGVtc0Ftb3VudFxuICAgID8gZmF2b3JpdGVJdGVtc0Ftb3VudFxuICAgIDogJ9C90LjRh9C10LPQviDQvdC10YInO1xuICBjb25zdCBoYXNGYXZvcml0ZUl0ZW1zID0gZmF2b3JpdGVJdGVtc0Ftb3VudCA/IHRydWUgOiBmYWxzZTtcbiAgcmVuZGVyQmxvY2soXG4gICAgJ3VzZXItYmxvY2snLFxuICAgIGBcbiAgICA8ZGl2IGNsYXNzPSdoZWFkZXItY29udGFpbmVyJz5cbiAgICAgIDxpbWcgY2xhc3M9J2F2YXRhcicgc3JjPScke2F2YXRhckxpbmt9JyAnYWx0PSdXYWRlIFdhcnJlbicgLz5cbiAgICA8ZGl2IGNsYXNzPSdpbmZvJz5cbiAgICA8cCBjbGFzcz0nbmFtZSc+JHt1c2VyTmFtZX08L3A+XG4gICAgPHAgY2xhc3M9J2Zhdic+XG4gICAgPGkgY2xhc3M9J2hlYXJ0LWljb24ke1xuICAgICAgaGFzRmF2b3JpdGVJdGVtcyA/ICcgYWN0aXZlJyA6ICcnXG4gICAgfSc+PC9pPiR7ZmF2b3JpdGVzQ2FwdGlvbn1cbiAgICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICBgLFxuICApO1xufVxuIl19