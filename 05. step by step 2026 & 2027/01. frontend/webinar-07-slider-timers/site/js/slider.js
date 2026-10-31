// ==========================================================================
// СмартОфис — Вебинар 07: Модуль интерактивного слайдера (slider.js)
// ==========================================================================

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  // Если слайдера на текущей странице нет, прерываем выполнение
  if (slides.length === 0) return;

  let currentSlide = 0;
  let timerId = null;

  // Функция переключения активного слайда
  function showSlide(index) {
    // Зацикливание слайдов: после последнего идет первый, перед первым — последний
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // Переключаем класс active у всех слайдов
    slides.forEach(function (slide, idx) {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Переключаем класс active у индикаторных точек
    dots.forEach(function (dot, idx) {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Запуск автопрокрутки слайдов каждые 3.5 секунды через setInterval
  function startAutoPlay() {
    stopAutoPlay();
    timerId = setInterval(nextSlide, 3500);
  }

  // Остановка таймера через clearInterval
  function stopAutoPlay() {
    if (timerId) {
      clearInterval(timerId);
    }
  }

  // Слушатели клика по стрелкам слайдера
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      startAutoPlay();
    });
  }

  // Слушатель клика по точкам
  dots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      showSlide(idx);
      startAutoPlay();
    });
  });

  // Запускаем автопрокрутку при загрузке страницы
  startAutoPlay();
}
