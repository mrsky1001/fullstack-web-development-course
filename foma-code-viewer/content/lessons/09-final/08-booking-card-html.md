---
title: "HTML Карточки брони"
highlight: js
---

# Заполнение карточки переменными

Осталось только заполнить карточку реальными данными из объекта `item`.
В 8-м вебинаре мы сохраняли туда следующие ключи:
- `roomTitle` (название комнаты)
- `date` (дата бронирования)
- `hours` (количество часов)
- `id` (случайно сгенерированный 5-значный номер заявки)
- `totalPrice` (итоговая стоимость)

## 🛠 Задание
Вставьте этот кусок HTML внутрь вашего блока `.booking-item`. Здесь мы используем интерполяцию строк (знаки доллара и фигурные скобки `${ }`), чтобы вставить переменные JS прямо в разметку HTML.

```js:start
  container.innerHTML = MOCK_BOOKINGS.map(item => `
    <div class="booking-item">
      <!-- Сюда вставим внутренности -->
    </div>
  `).join('');
```

```js:solution
  container.innerHTML = MOCK_BOOKINGS.map(item => `
    <div class="booking-item">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 5px;">${item.roomTitle}</h3>
        <div style="font-size: 13px; color: #666;">
          Дата: <strong>${item.date}</strong> | Длительность: <strong>${item.hours} ч.</strong> | Заявка №${item.id}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 700; color: #007bff;">${item.totalPrice} ₽</div>
        <span style="font-size: 12px; color: #28a745;">Подтверждено</span>
      </div>
    </div>
  `).join('');
```
