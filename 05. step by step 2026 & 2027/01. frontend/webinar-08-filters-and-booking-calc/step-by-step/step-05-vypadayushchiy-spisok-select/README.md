# Шаг 5 — Генерация выпадающего списка select

## 🎯 Что изучаем
Как заполнить тег `<select>` на странице `pages/booking.html` вариантами `<option>` из массива `OFFICE_ROOMS` и сохранить цену в атрибут `data-price`.

---

## 💡 Пользовательские атрибуты data-*

В каждый пункт `<option>` мы сохраняем тариф комнаты:
```javascript
roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
  <option value="${r.id}" data-price="${r.pricePerHour}">
    ${r.title} (${r.pricePerHour} ₽/час)
  </option>
`).join('');
```

А когда пользователь выбирает комнату, мы считываем цену через `dataset.price`:
```javascript
const selectedOption = roomSelect.options[roomSelect.selectedIndex];
const price = Number(selectedOption.dataset.price);
```

---

## ➡️ Следующий шаг
[Шаг 6 — Интерактивный калькулятор цены](../step-06-kalkulyator-rascheta-stoimosti/README.md)
