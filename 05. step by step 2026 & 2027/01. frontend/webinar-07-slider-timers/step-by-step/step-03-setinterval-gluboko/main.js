// Шаг 3: Функция переключения слайдов showSlide(index)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  // Циклическая проверка: если вышли за край, идем в начало или в конец
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Вешаем класс active только выбранному слайду:
  slides.forEach(function (slide, idx) {
    if (idx === currentSlide) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Переключаем точки:
  dots.forEach(function (dot, idx) {
    if (idx === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  console.log('Показан слайд номер:', currentSlide + 1);
}

// Проверяем: переключаем на второй слайд (индекс 1)
showSlide(1);
