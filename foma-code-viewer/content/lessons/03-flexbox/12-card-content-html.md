---
title: "Контентная часть"
highlight: html
---

# Название и список удобств

Картинка есть! Теперь добавим текст. 

Всю нижнюю часть карточки (под картинкой) мы обернем в `<div class="card-content">`. Это позволит нам задать внутренние отступы (padding) сразу для всего текста, чтобы он не прилипал к рамке карточки.

Внутри `.card-content` мы разместим:
1. Заголовок карточки: `<h3 class="card-title">`. Внутри заголовка сделаем ссылку `<a>`, чтобы по клику на текст тоже можно было перейти на страницу комнаты. Чтобы ссылка не была синей и подчеркнутой, мы зададим ей *встроенные стили* `style="text-decoration: none; color: inherit;"`.
2. Список оборудования (удобств): `<ul class="card-equipment">`. Это обычный маркированный список с тремя пунктами `<li>`.

## 🛠 Задание

В `index.html` сразу под закрывающим `</div>` от вашей картинки (`.card-img-wrap`) добавьте новую обертку `.card-content` с заголовком и списком!

*(Вы можете скопировать код из решения, чтобы не печатать вручную)*.

```html:start
            <div class="card-img-wrap">
              <a href="pages/catalog.html">
                <img src="img/room-1.jpg" alt="Мини-офис Focus" class="card-img" onerror="this.src='img/no-image.svg'">
              </a>
            </div>
            
          </div>
```

```html:solution
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
            </div>
          </div>
```
