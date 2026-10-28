// Шаг 4: Кнопки навигации слайдера
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentSlide = 0;

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

if (nextBtn) {
  nextBtn.addEventListener('click', function () {
    showSlide(currentSlide + 1);
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', function () {
    showSlide(currentSlide - 1);
  });
}
