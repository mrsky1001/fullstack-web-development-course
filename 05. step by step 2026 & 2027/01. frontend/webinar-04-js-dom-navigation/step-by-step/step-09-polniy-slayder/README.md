# 🏆 Шаг 9 — Полный слайдер с setInterval (Финал!)

## 🎯 Что изучаем
Последний кусочек: `setInterval` для автопрокрутки. Это финальная версия слайдера!

---

## 💡 Что такое setInterval?

`setInterval` — это таймер, который вызывает функцию **автоматически каждые N миллисекунд**.

```javascript
// 1000 мс = 1 секунда
// 3000 мс = 3 секунды

const timerId = setInterval(function() {
    console.log('Прошла секунда!');
}, 1000);

// Остановить таймер:
clearInterval(timerId);
```

Аналогия: будильник. Ты его завёл — он звонит каждые N минут. `clearInterval` — выключить будильник.

---

## 📖 Финальный код слайдера

```javascript
const slides = document.querySelectorAll('.slide');
const dots   = document.querySelectorAll('.dot');
const rightBtn = document.getElementById('rightSliderBtn');
const leftBtn  = document.getElementById('leftSliderBtn');

let currentSlide = 0;
let timerId = null; // Здесь будет хранится id таймера

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0)         currentSlide = slides.length - 1;
    else                        currentSlide = index;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d   => d.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() { showSlide(currentSlide + 1); }

function startAuto() {
    stopAuto();  // Сначала останавливаем старый таймер (если был)
    timerId = setInterval(nextSlide, 3000); // Каждые 3 секунды — следующий слайд!
}

function stopAuto() {
    if (timerId) clearInterval(timerId);
}

// Подключаем кнопки
rightBtn.addEventListener('click', function() { nextSlide(); startAuto(); });
leftBtn.addEventListener('click',  function() { showSlide(currentSlide - 1); startAuto(); });

// Подключаем точки
dots.forEach(function(dot, index) {
    dot.addEventListener('click', function() { showSlide(index); startAuto(); });
});

// Запускаем автопрокрутку!
startAuto();
```

---

## 🏁 Путь который мы прошли

| Шаг | Что добавили | Что стало работать |
|-----|-------------|--------------------|
| 1 | JS, console.log | Код выполняется |
| 2 | const, let | Переменные |
| 3 | getElementById | Нашли элементы |
| 4 | classList | Вручную переключили слайд |
| 5 | function | Вынесли код в функцию |
| 6 | addEventListener | Кнопка реагирует на клик |
| 7 | querySelectorAll + forEach | Универсальная showSlide() |
| 8 | let currentSlide | Стрелки работают правильно |
| **9** | **setInterval** | **Полный слайдер!** ✅ |

---

## 🎉 Поздравляем!
Теперь ты понимаешь **каждую строку** кода слайдера. Это тот же код что будет в `webinar-07` — только ты теперь знаешь как он работает изнутри!
