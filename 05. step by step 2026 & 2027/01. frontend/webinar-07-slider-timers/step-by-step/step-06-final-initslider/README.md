# Шаг 6 — Финальная функция initSlider()

## 🎯 Что изучаем
Собираем все 5 предыдущих шагов в чистую, масштабируемую функцию `initSlider()`.

---

## 💻 Полный код слайдера из main.js Вебинара 7

```javascript
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return; // 1. Защита

  let currentSlide = 0;       // 2. Локальное состояние
  let timerId = null;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // 5. Изящное переключение:
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  function startAuto() {
    stopAuto(); // 4. Сброс перед запуском
    timerId = setInterval(next, 3000); // 3. Автотаймер
  }

  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  // Навешиваем слушатели с перезапуском таймера:
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  startAuto(); // Старт автопрокрутки
}
```

---

## ➡️ Переход к Вебинару 8
Теперь слайдер работает идеально! В 8-м вебинаре мы займемся страницей каталога и создадим живой фильтр по названию, сортировку цен и интерактивный калькулятор бронирования!
