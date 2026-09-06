---
title: "Стили картинки"
highlight: css
---

# Стили для картинки комнаты

Если вы посмотрите в превью, то увидите, что картинка либо вылезает за пределы рамки, либо выглядит сплюснутой.

Нам нужно сказать нашей обертке `.card-img-wrap`, что она должна быть ровно 200px в высоту, а самой картинке `.card-img` — чтобы она полностью заполняла эту обертку, не искажая пропорции!

## 1. Стили обертки (.card-img-wrap)
- `width: 100%;` — растягиваем обертку на всю ширину карточки.
- `height: 200px;` — жестко задаем высоту.
- `overflow: hidden;` — обрезаем всё, что вылезает.
- `background-color: #f0f4f8;` — страховочный светло-серый фон на случай, если картинка не загрузится вообще.

## 2. Стили картинки (.card-img)
- `width: 100%;` и `height: 100%;` — заставляем саму картинку занять 100% от её обертки (т.е. стать 373px на 200px).
- `object-fit: cover;` — **Супер-свойство!** Оно говорит браузеру: "Увеличь и обрежь края картинки так, чтобы она полностью заполнила квадрат без искажения пропорций (не сплющивалась)".
- `object-position: center;` — если картинка обрезается, мы хотим, чтобы центр всегда оставался в фокусе.
- `display: block;` — картинка по умолчанию ведет себя как строчный текст, это может вызывать небольшие "фантомные" отступы снизу. Делаем её блочной, чтобы избежать этого.

## 🛠 Задание

В `style.css` добавьте стили для `.card-img-wrap` и `.card-img`.

```css:start
.room-card {
  width: 373px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

```

```css:solution
.room-card {
  width: 373px;
  border: 1px solid #dddddd;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.card-img-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: #f0f4f8;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
```
