// Шаг 5: Автоматическая смена слайдов через setInterval
// Теория по этой теме подробно описана в файле README.md в этой папке.

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

// setInterval запускает переключение каждые 3500 миллисекунд (3.5 секунды)
const timerId = setInterval(function () {
  showSlide(currentSlide + 1);
}, 3500);

console.log('Автопрокрутка включена, номер таймера:', timerId);
