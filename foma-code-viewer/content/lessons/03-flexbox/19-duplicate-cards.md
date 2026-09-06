---
title: "Размножаем карточки!"
highlight: html
---

# Размножаем карточки!

У нас есть одна идеальная карточка. Но на сайте их должно быть много!
Самый простой способ — скопировать её HTML-код.

## 🛠 Задание

В файле `index.html` найдите вашу карточку `<div class="room-card">...</div>`. 
**Скопируйте** её целиком (от открывающего тега до закрывающего) и вставьте ниже еще два раза (внутри обертки `.rooms-grid`).

Чтобы они не были одинаковыми, измените контент во второй и третьей карточке (как в решении ниже):
1. **Вторая карточка:** Картинка `img/room-2.jpg`, Название `Конференц-зал Alpha`, Удобства (`Проектор 4K`, `Спикерфон`, `Флипчарт`), Цена `1200 ₽`.
2. **Третья карточка:** Картинка `img/room-3.jpg`, Название `Опенспейс Hub`, Удобства (`Личный стол`, `Wi-Fi`, `Кофе-поинт`), Цена `250 ₽`.

*(Вы можете скопировать весь блок `.rooms-grid` из решения).*

```html:start
        <div class="rooms-grid">
          <div class="room-card">
            <!-- Тут ваш огромный код первой карточки -->
          </div>
        </div>
```

```html:solution
        <div class="rooms-grid">
          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Мини-офис Focus</a></h3>
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">450 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-2.jpg" alt="Конференц-зал Alpha" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Конференц-зал Alpha</a></h3>
              <ul class="card-equipment">
                <li>Проектор 4K</li>
                <li>Спикерфон</li>
                <li>Флипчарт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">1200 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>

          <div class="room-card">
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-3.jpg" alt="Опенспейс Hub" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            <div class="card-content">
              <h3 class="card-title"><a href="pages/catalog.html" style="text-decoration: none; color: inherit;">Опенспейс Hub</a></h3>
              <ul class="card-equipment">
                <li>Личный стол</li>
                <li>Wi-Fi</li>
                <li>Кофе-поинт</li>
              </ul>
              <div class="card-footer">
                <div class="card-price">250 ₽ <span>/ час</span></div>
                <div class="card-btns">
                  <a href="pages/catalog.html" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
                  <a href="pages/catalog.html" class="btn btn-primary">Забронировать</a>
                </div>
              </div>
            </div>
          </div>
        </div>
```
