# Шаг 5 — classList.toggle('active', условие)

## 🎯 Что изучаем
Как второй аргумент метода `.toggle(класс, булево)` позволяет заменить 6 строк кода на одну изящную строчку.

---

## 💡 Сравнение двух подходов

Обычно студенты пишут так:
```javascript
// Длинный вариант:
slides.forEach((slide, i) => {
    if (i === currentSlide) {
        slide.classList.add('active');
    } else {
        slide.classList.remove('active');
    }
});
```

А вот как пишут профессионалы:
```javascript
// Лаконичный вариант в 1 строку:
slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
```

Если `i === currentSlide` равно `true` — класс `.active` добавится.
Если `false` — класс снимется!

---

## ➡️ Следующий шаг
[Шаг 6 — Финальная функция initSlider()](../step-06-final-initslider/README.md)
