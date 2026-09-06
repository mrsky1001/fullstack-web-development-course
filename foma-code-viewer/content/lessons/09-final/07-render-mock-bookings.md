---
title: "Рендер заявок (.map)"
highlight: js
---

# Маппинг массива заявок

Если скрипт прошел проверку на пустоту, значит в массиве `MOCK_BOOKINGS` есть хотя бы одна заявка!
Мы применим наш любимый и самый часто используемый метод в разработке интерфейсов — `.map()`.

Он возьмет каждый объект из массива (мы назовем его переменной `item`) и превратит в кусок HTML-кода с классом `.booking-item`. В конце, мы склеим этот массив кусков с помощью `.join('')` и запишем результат в `container.innerHTML`.

## 🛠 Задание
Напишите каркас маппинга.

```js:start
  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    // ...
    return;
  }

```

```js:solution
  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    // ...
    return;
  }

  container.innerHTML = MOCK_BOOKINGS.map(item => `
    <div class="booking-item">
      <!-- Сюда вставим внутренности -->
    </div>
  `).join('');
```
