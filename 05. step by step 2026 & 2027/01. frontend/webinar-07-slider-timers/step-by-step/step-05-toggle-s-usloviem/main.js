// Шаг 5: Автоматическая смена слайдов через setInterval
// Теория по этой теме подробно описана в файле README.md в этой папке.

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[currentIndex].classList.add('active');
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  console.log('Автоматически переключен слайд:', currentIndex + 1);
}

// Запускаем таймер смены слайдов каждые 3500 миллисекунд (3.5 секунды):
const timerId = setInterval(nextSlide, 3500);
