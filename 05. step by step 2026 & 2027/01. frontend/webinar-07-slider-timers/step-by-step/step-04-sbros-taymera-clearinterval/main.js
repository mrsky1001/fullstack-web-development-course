// Шаг 4: Ручное переключение кнопками назад и вперед
// Теория по этой теме подробно описана в файле README.md в этой папке.

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let currentIndex = 0;

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slides[currentIndex].classList.add('active');
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

if (prevBtn && nextBtn) {
  nextBtn.addEventListener('click', function () {
    showSlide(currentIndex + 1);
  });

  prevBtn.addEventListener('click', function () {
    showSlide(currentIndex - 1);
  });
}

dots.forEach(function (dot, index) {
  dot.addEventListener('click', function () {
    showSlide(index);
  });
});
