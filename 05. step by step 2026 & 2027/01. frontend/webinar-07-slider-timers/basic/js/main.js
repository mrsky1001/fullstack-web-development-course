// СмартОфис — Вебинар 07: Интерактивный слайдер и таймеры

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Инициализация слайдера...');
  initNavigation();
  initSlider();
});

// Навигация
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// Модуль интерактивного слайдера
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let timerId = null;

  // Функция показа конкретного слайда
  function showSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach(function (slide, idx) {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

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

  function startAutoPlay() {
    stopAutoPlay();
    timerId = setInterval(nextSlide, 3500);
  }

  function stopAutoPlay() {
    if (timerId) {
      clearInterval(timerId);
    }
  }

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

  dots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      showSlide(idx);
      startAutoPlay();
    });
  });

  startAutoPlay();
}
