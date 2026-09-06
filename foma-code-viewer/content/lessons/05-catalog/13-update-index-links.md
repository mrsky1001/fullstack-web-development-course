---
title: "Обновление ссылок на Главной"
highlight: html
---

# Параметры URL

Карточки генерируются, но куда ведут ссылки? Они ведут на `room-details.html?id=${room.id}`.
Знак вопроса в ссылке означает начало **GET-параметров**. Это способ передать данные странице прямо в адресной строке. В нашем случае мы передаем параметр `id` со значением уникального ID комнаты (например, `?id=focus-1`).

На главной странице (`index.html`) мы не будем генерировать карточки через JS, мы оставим их "захардкоженными" как витрину (3 лучшие комнаты). Но мы должны обновить их ссылки!

## 🛠 Задание
Переключитесь на вкладку `html` (Представим, что мы снова открыли наш `index.html`). 
Найдите все 3 карточки комнат. Измените их ссылки:
- Везде, где было `pages/catalog.html`, поставьте `pages/room-details.html?id=ID_КОМНАТЫ`.
- Для первой комнаты ID — `focus-1`.
- Для второй — `alpha-2`.
- Для третьей — `hub-3`.

*(В решении ниже показан пример для первой карточки, сделайте так для всех трех!)*

```html:start
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
```

```html:solution
            <div class="card-img-wrap">
              <a href="pages/room-details.html?id=focus-1">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/room-details.html?id=focus-1" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
```
