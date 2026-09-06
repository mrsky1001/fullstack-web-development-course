---
title: "Стили валидации (Ошибки)"
highlight: css
---

# Стили состояний ошибки

Остался последний штрих в CSS. Как форма будет сигнализировать об ошибке (например, если логин не введен)?
Мы создадим специальный класс `.is-invalid` (не валидно). Если JavaScript добавит этот класс инпуту, мы закрасим рамку в красный цвет `#dc3545` и сделаем розовый фон.

Также мы настроим логику отображения текста ошибки. 
По умолчанию `.error-text` скрыт (`display: none`). 
Но мы используем **соседский селектор CSS** `+`. 
`.form-control.is-invalid + .error-text` означает: "Найди элемент с классом `error-text`, который находится СРАЗУ ПОСЛЕ инпута с ошибкой, и покажи его (`display: block`)".

## 🛠 Задание
Добавьте эти стили ошибок в конец файла. На этом с версткой и стилизацией форм покончено!

```css:start
.form-control {
  /* ... стили инпута ... */
}
```

```css:solution
.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

/* Красная подсветка поля при ошибке валидации */
.form-control.is-invalid {
  border-color: #dc3545;
  background-color: #fff8f8;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  display: none;
}

.form-control.is-invalid + .error-text {
  display: block;
}

.form-alert {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 14px;
  display: none;
}

.form-alert.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  display: block;
}
```
