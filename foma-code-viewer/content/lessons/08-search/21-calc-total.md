---
title: "Итоговая стоимость"
highlight: js
---

# Математика и вывод

Теперь получим количество часов из поля ввода. Мы используем функцию `Math.max(1, ...)`, чтобы пользователь не смог ввести `0` или `-5` часов! Минимум 1 час.

А дальше всё просто: `цена * часы`. 
Полученные цифры мы запишем внутрь наших HTML-элементов с помощью свойства `.textContent` (которое перезаписывает текст внутри тега).

## 🛠 Задание
Допишите функцию `updatePrice()`.

```js:start
  function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    
  }
```

```js:solution
  function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = price * hours;

    if (pricePerHourSpan) pricePerHourSpan.textContent = price + ' ₽';
    if (totalPriceSpan) totalPriceSpan.textContent = total + ' ₽';
  }
```
