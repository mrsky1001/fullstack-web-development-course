// Шаг 3: Функция showSlide(index)
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  // Циклическая проверка границ
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Переключаем слайды
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === currentSlide);
  });

  // Переключаем точки
  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === currentSlide);
  });

  console.log('Показан слайд №', currentSlide + 1);
}

// Попробуем показать второй слайд (индекс 1)
showSlide(1);
