// Шаг 3: Функция переключения слайда showSlide(index)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function showSlide(index) {
  // Зацикливаем показ: если дошли до конца, возвращаемся в начало
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  // 1. Снимаем класс active со всех слайдов и точек:
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // 2. Активируем нужный слайд и точку:
  slides[currentIndex].classList.add('active');
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('active');
  }

  console.log('Показан слайд №:', currentIndex + 1);
}

// Тестируем переключение:
showSlide(1);
