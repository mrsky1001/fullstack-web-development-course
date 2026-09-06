---
title: "Синяя кнопка (Primary)"
highlight: css
---

# Синяя кнопка (Primary)

Мы задали **форму** кнопок через `.btn`. Теперь давайте зададим им **цвет**. 

Главная кнопка на сайте (например, "Забронировать") называется `Primary`. Она должна быть самой яркой, чтобы привлекать внимание пользователя. Мы создадим класс-модификатор `.btn-primary`. 

В HTML мы будем применять сразу два класса: `<a class="btn btn-primary">`. Один даст форму, другой — цвет!

## Стили цвета
- `background-color: #007bff;` — заливаем кнопку фирменным синим цветом.
- `color: #ffffff;` — текст делаем белым.

## Эффект наведения
Когда пользователь наводит мышку на кнопку, она должна реагировать. Для этого мы используем псевдокласс `:hover`.
Для `.btn-primary:hover`:
- `background-color: #0056b3;` — делаем цвет чуть темнее при наведении.

## 🛠 Задание
Под классом `.btn` добавьте классы `.btn-primary` и `.btn-primary:hover`.

```css:start
.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

```

```css:solution
.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  background-color: #007bff;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
```
