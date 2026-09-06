---
title: "Шаблонные строки (Backticks)"
highlight: js
---

# Шаблонные строки (Backticks)

Вы заметили, что мы использовали необычные кавычки `\`` (находятся на клавише Ё в английской раскладке)? Они называются **обратными кавычками** (backticks).

Они обладают двумя суперсилами:
1. Позволяют писать текст в несколько строк (обычные кавычки выдали бы ошибку).
2. Позволяют вставлять переменные прямо внутрь текста с помощью конструкции `${ ... }`. Это называется **интерполяция**.

## 🛠 Задание
Скопируйте HTML-код карточки (из нашего `index.html`) и вставьте его внутрь обратных кавычек. Сразу замените все статичные тексты на переменные из объекта `room` (например, `${room.title}`, `${room.pricePerHour}`, `${room.image}`). 

*(Списки удобств пока оставим статичными, мы исправим их на следующем шаге).*

```js:start
  container.innerHTML = OFFICE_ROOMS.map(room => `
    
  `)
```

```js:solution
  container.innerHTML = OFFICE_ROOMS.map(room => `
    <div class="room-card">
      <div class="card-img-wrap">
        <a href="room-details.html?id=${room.id}">
          <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
        </a>
      </div>
      <div class="card-content">
        <h3 class="card-title">
          <a href="room-details.html?id=${room.id}" style="text-decoration: none; color: inherit;">${room.title}</a>
        </h3>
        <ul class="card-equipment">
          <li>Wi-Fi</li>
          <li>Монитор</li>
        </ul>
        <div class="card-footer">
          <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
          <div class="card-btns">
            <a href="room-details.html?id=${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
            <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    </div>
  `)
```
