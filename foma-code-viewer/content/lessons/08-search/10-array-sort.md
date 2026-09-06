---
title: "Сортировка массива (sort)"
highlight: js
---

# Магия сортировки (.sort)

Еще один мощнейший метод — `.sort()`. 
Он сортирует массив. Но как он поймет, по какому правилу сортировать? По алфавиту? По цене? По размеру?
Мы должны передать ему функцию-правило, которая берет два элемента (`a` и `b`) и сравнивает их.
- Если мы вернем отрицательное число (`a - b`), элемент `a` встанет перед `b` (по возрастанию).
- Если вернем положительное (`b - a`), будет сортировка по убыванию.

## 🛠 Задание
Напишите обработчики кликов для обеих кнопок сортировки по цене. 
Обратите внимание, что мы сортируем массив `displayedRooms`, чтобы сортировка применялась даже к результатам поиска! После сортировки мы снова вызываем `render`.

```js:start
  if (searchInput) searchInput.addEventListener('input', applyFilter);

```

```js:solution
  if (searchInput) searchInput.addEventListener('input', applyFilter);

  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(displayedRooms);
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }
```
