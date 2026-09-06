---
title: "Подвал карточки (HTML)"
highlight: html
---

# Разметка подвала карточки

Мы подошли к самой интересной части карточки — её нижней панели, где будет отображаться цена и кнопки.

Всё это мы обернем в `<div class="card-footer">` и поместим **ВНУТРЬ** `.card-content` (сразу после списка удобств).

Внутри футера у нас будет два блока (чтобы потом развести их по разным краям с помощью Flexbox):
1. **Цена:** `<div class="card-price">` со значением "450 ₽ / час". Само слово `/ час` мы обернем в `<span>`, чтобы сделать его сереньким и маленьким.
2. **Кнопки:** `<div class="card-btns">`. Сюда мы поместим две ссылки, которым дадим те самые классы, которые мы создали в начале этого вебинара!
   - Кнопку-иконку `<a class="btn-icon">` с длинным кодом SVG (это векторная иконка стрелочки).
   - Основную кнопку `<a class="btn btn-primary">Забронировать</a>`.

## 🛠 Задание

Скопируйте разметку футера из решения ниже и вставьте её сразу после закрывающего `</ul>` внутри вашей карточки.

```html:start
              <ul class="card-equipment">
                <li>Wi-Fi 500 Мбит/с</li>
                <li>4K Монитор</li>
                <li>Эргономичное кресло</li>
              </ul>
              
            </div>
```

```html:solution
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
```
