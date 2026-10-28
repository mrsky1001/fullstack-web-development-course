// ==========================================================================
// СмартОфис — Вебинар 07: Интерактивный слайдер и таймеры
// Подробная учебная версия с комментариями к каждой строке для 1 курса
// ==========================================================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Инициализируем слайдер...');
  initNavigation();
  initSlider();
});

// 1. Навигация сайта
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Модуль интерактивного слайдера
function initSlider() {
  // Находим все элементы слайдера в DOM
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  // Если слайдера на текущей странице нет, прерываем выполнение
  if (slides.length === 0) return;

  // Переменная состояния: хранит индекс текущего активного слайда (0, 1, 2, 3)
  let currentSlide = 0;
  // Идентификатор таймера для setInterval
  let timerId = null;

  // Функция для отображения слайда с заданным индексом
  function showSlide(index) {
    // Циклическая проверка:
    // если вышли за правый край — возвращаемся к первому слайду (индекс 0)
    if (index >= slides.length) {
      currentSlide = 0;
    // если вышли за левый край — переходим к последнему слайду
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    // Переключаем класс active у каждого слайда
    slides.forEach(function (slide, idx) {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Переключаем класс active у каждой точки-индикатора
    dots.forEach(function (dot, idx) {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Переход к следующему слайду
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Переход к предыдущему слайду
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Запуск автоматического переключения
  function startAutoPlay() {
    stopAutoPlay(); // Сначала очищаем старый таймер, чтобы не накапливать дубли
    timerId = setInterval(nextSlide, 3500); // Каждые 3.5 секунды вызываем nextSlide
  }

  // Остановка таймера
  function stopAutoPlay() {
    if (timerId) {
      clearInterval(timerId);
    }
  }

  // Слушатель клика на кнопку «Вперёд»
  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      startAutoPlay(); // Сбрасываем таймер, чтобы у пользователя было полных 3.5 сек
    });
  }

  // Слушатель клика на кнопку «Назад»
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      startAutoPlay();
    });
  }

  // Слушатели кликов по круглым точкам-индикаторам
  dots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      showSlide(idx);
      startAutoPlay();
    });
  });

  // Запускаем автопрокрутку при загрузке страницы
  startAutoPlay();
}
