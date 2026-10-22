# Шаг 1 — Защищённый запуск функции initSlider()

## 🎯 Что изучаем
Почему нельзя просто так искать слайдер на странице и зачем нужна проверка `if (!slides.length) return;`.

---

## 💡 Проблема работы на нескольких страницах

Наш файл `main.js` подключается на **всех** страницах сайта:
- на `index.html` (где слайдер есть)
- на `catalog.html` (где слайдера НЕТ)
- на `room-details.html` (где слайдера НЕТ)
- на `login.html` (где слайдера НЕТ)

Если на странице каталога скрипт попытается найти кнопку слайдера и повесить `addEventListener`, браузер выбросит красную ошибку:
`Cannot read properties of null (reading 'addEventListener')` и весь дальнейший JavaScript остановится!

---

## 🛡️ Защитная проверка (Guard Clause)

```javascript
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    
    // Если на этой странице нет слайдов — просто мягко выходим!
    if (!slides.length) return;

    // Дальше код выполнится ТОЛЬКО на главной странице:
    console.log('Слайдер найден, инициализируем!');
}
```

---

## ➡️ Следующий шаг
[Шаг 2 — Область видимости переменных](../step-02-oblast-vidimosti-scope/README.md)
