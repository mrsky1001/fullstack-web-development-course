# Вебинар 7. Функциональный подход и таймеры: Слайдер на главной странице

## 📋 О занятии простыми словами
Сегодня мы добавим на главную страницу эффектный элемент — **автоматический слайдер фотографий**!

Слайдер будет:
- Автоматически менять картинку каждые 3 секунды.
- Реагировать на клики по стрелочкам «‹» и «›».
- Переключаться при нажатии на круглые точки-индикаторы снизу.
- Сбрасывать таймер, если пользователь кликнул вручную (чтобы слайд не переключился сразу же после клика).

---

## 🎯 Что мы сегодня сделаем:
1. Добавим HTML-разметку слайдера (4 слайда, 2 кнопки, 4 индикатора) в `index.html`.
2. Настроим стили слайдера в `style.css` с плавным переходом (`transition: opacity 0.3s`).
3. Поймем, как работают таймеры `setInterval()` и `clearInterval()`.
4. Напишем функцию `initSlider()` в `js/main.js`.

---

## 💡 Теория простыми словами

### 1. Как работает наложение слайдов?
Все 4 слайда имеют `position: absolute` и накладываются друг на друга в одной точке.  
Слайд без класса `.active` имеет `opacity: 0` (невидимый).  
Когда мы добавляем класс `.active`, его прозрачность становится `opacity: 1` (видимый), а `transition: opacity 0.3s` делает появление очень плавным и мягким.

### 2. Что такое таймер `setInterval`?
```javascript
const timerId = setInterval(nextSlide, 3000);
```
Эта команда заставляет браузер вызывать функцию `nextSlide` каждые 3000 миллисекунд (3 секунды).  
А команда `clearInterval(timerId)` мгновенно останавливает таймер.

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Добавляем разметку слайдера в `index.html`
Внутри `<main>` между блоком `hero-section` и `popular-section`:
```html
<section class="slider-section">
  <div class="slider">
    <div class="slide active">
      <img src="img/slider-1.jpg" alt="Слайд 1" class="slide-img">
    </div>
    <div class="slide">
      <img src="img/slider-2.jpg" alt="Слайд 2" class="slide-img">
    </div>
    <div class="slide">
      <img src="img/slider-3.jpg" alt="Слайд 3" class="slide-img">
    </div>
    <div class="slide">
      <img src="img/slider-4.jpg" alt="Слайд 4" class="slide-img">
    </div>
    <button class="slider-btn slider-prev">‹</button>
    <button class="slider-btn slider-next">›</button>
    <div class="slider-dots">
      <span class="dot active"></span>
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  </div>
</section>
```

### Шаг 2. Добавляем логику слайдера в `js/main.js`
```javascript
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

  let currentSlide = 0;
  let timerId = null;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  function startAuto() {
    stopAuto();
    timerId = setInterval(next, 3000);
  }

  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  startAuto();
}
```

---

## 🏁 Чек-лист для самопроверки
- [x] Слайдер плавно меняет фото каждые 3 секунды.
- [x] Стрелки «‹» и «›» корректно переключают слайды вперед и назад.
- [x] Нижние точки подсвечивают текущий слайд и переключают на нужный при клике.
