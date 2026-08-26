# Вебинар 7. Функциональный подход и таймеры: Слайдер на главной странице

## 📋 Описание занятия
- **Дисциплина:** ПИРИП (ПМ08. Разработка веб-приложения)
- **Уровень:** 1 курс колледжа
- **Тема:** Таймеры в JavaScript (`setInterval`, `clearInterval`), создание интерактивного слайдера на чистом JS.

---

## 🎯 Подзадачи из общего ТЗ на этот вебинар

| № | Подзадача | Описание требований ТЗ |
|---|---|---|
| 7.1 | **Разметка слайдера в `index.html`** | Секция `.slider-section` с 4 слайдами (`.slide`), кнопками переключения («‹», «›») и блоком точек-индикаторов (`.slider-dots`). |
| 7.2 | **Стилизация слайдера в CSS** | Ширина слайдера 100% (адаптивно в контейнере), высота 400px, абсолютное позиционирование слайдов, плавная смена прозрачности (`opacity: 0` → `opacity: 1`, `transition: opacity 0.3s`). |
| 7.3 | **Автоматическая смена каждые 3 секунды** | Запуск интервала `setInterval(nextSlide, 3000)` на Vanilla JS. |
| 7.4 | **Ручное управление стрелками** | Обработка кликов по кнопкам `.slider-prev` и `.slider-next` с циклическим переключением слайдов (0 → 1 → 2 → 3 → 0). |
| 7.5 | **Индикаторы (точки/dots)** | Активный класс `.active` на соответствующей точке и переключение на выбранный слайд по клику на точку. |
| 7.6 | **Сброс таймера при ручном клике** | Перезапуск интервала при действиях пользователя, чтобы слайд не переключался мгновенно после ручного клика. |

---

## 💡 Теоретический минимум
1. **Таймеры в JS:** `setInterval(callback, ms)` для регулярного вызова и `clearInterval(timerId)` для остановки.
2. **Абсолютное позиционирование слайдов:** `position: absolute; width: 100%; height: 100%;` внутри родителя с `position: relative; overflow: hidden;`.
3. **Циклический индекс:** Формула `(currentIndex + 1) % slides.length` и `(currentIndex - 1 + slides.length) % slides.length`.
4. **Управление классами активности:** Добавление/снятие класса `.active` со слайдов и точек без прямой манипуляции стилями `style.display`.

---

## 📝 Пошаговый план выполнения
1. В `index.html` между Hero-секцией и популярными комнатами добавить разметку слайдера:
   ```html
   <section class="slider-section">
     <div class="slider">
       <div class="slide active"><img src="img/slider-1.jpg" alt="Слайд 1" class="slide-img"></div>
       <div class="slide"><img src="img/slider-2.jpg" alt="Слайд 2" class="slide-img"></div>
       <div class="slide"><img src="img/slider-3.jpg" alt="Слайд 3" class="slide-img"></div>
       <div class="slide"><img src="img/slider-4.jpg" alt="Слайд 4" class="slide-img"></div>
       <button class="slider-btn slider-prev">‹</button>
       <button class="slider-btn slider-next">›</button>
       <div class="slider-dots"></div>
     </div>
   </section>
   ```
2. В `css/style.css` настроить правила для `.slider` (`width: 100%`, `height: 400px`), `.slide`, `.slide.active`, `.slider-btn` и `.dot`.
3. В `js/main.js` реализовать функцию инициализации слайдера `initSlider()`:
   ```javascript
   function initSlider() {
     const slider = document.querySelector('.slider');
     if (!slider) return;
     
     const slides = slider.querySelectorAll('.slide');
     const prevBtn = slider.querySelector('.slider-prev');
     const nextBtn = slider.querySelector('.slider-next');
     const dotsContainer = slider.querySelector('.slider-dots');
     let currentIndex = 0;
     let timer = null;
     
     // Создание точек
     slides.forEach((_, i) => {
       const dot = document.createElement('div');
       dot.className = `dot ${i === 0 ? 'active' : ''}`;
       dot.addEventListener('click', () => { goToSlide(i); resetTimer(); });
       dotsContainer.appendChild(dot);
     });
     
     const dots = dotsContainer.querySelectorAll('.dot');
     
     function showSlide(index) {
       slides.forEach(s => s.classList.remove('active'));
       dots.forEach(d => d.classList.remove('active'));
       slides[index].classList.add('active');
       dots[index].classList.add('active');
       currentIndex = index;
     }
     
     function nextSlide() { showSlide((currentIndex + 1) % slides.length); }
     function prevSlide() { showSlide((currentIndex - 1 + slides.length) % slides.length); }
     function resetTimer() { clearInterval(timer); timer = setInterval(nextSlide, 3000); }
     
     nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
     prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });
     
     timer = setInterval(nextSlide, 3000);
   }
   ```

---

## 🏁 Результат вебинара (Критерии приемки)
- [x] Слайдер занимает 100% ширины контейнера и 400px высоты.
- [x] Автоматическое переключение слайдов каждые 3 секунды.
- [x] Стрелки «‹» и «›» корректно переключают слайды вперед и назад по кругу.
- [x] Индикаторы-точки подсвечивают текущий слайд и переключают на нужный при клике.
