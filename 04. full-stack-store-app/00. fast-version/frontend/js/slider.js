// ============================================================
// TechParts — Слайдер на главной странице (slider.js)
// Критерий №14: Блок со слайдером (до 3 баллов)
// 1 балл — семантическая разметка и стилизация
// 1 балл — автопереключение каждые 3 секунды
// 1 балл — индикаторы и кнопки Вперёд/Назад
// Реализация на чистом JavaScript без сторонних библиотек
// ============================================================

// --- Получаем элементы слайдера из DOM ---
const slides = document.querySelectorAll('.slider-slide');  // Все слайды
const dots = document.querySelectorAll('.slider-dot');      // Индикаторы (точки)
const prevBtn = document.getElementById('slider-prev');     // Кнопка «Назад»
const nextBtn = document.getElementById('slider-next');     // Кнопка «Вперёд»

// Текущий индекс слайда (начинаем с 0)
let currentSlide = 0;

// --- Функция отображения слайда по индексу ---
function showSlide(index) {
  // Убираем класс active у всех слайдов и точек
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  // Устанавливаем текущий индекс (с зацикливанием)
  currentSlide = (index + slides.length) % slides.length;

  // Добавляем класс active текущему слайду и точке
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

// --- Кнопка «Вперёд» — следующий слайд ---
nextBtn.addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

// --- Кнопка «Назад» — предыдущий слайд ---
prevBtn.addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

// --- Клик по индикаторам (точкам) ---
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Получаем индекс из атрибута data-index
    const index = parseInt(dot.getAttribute('data-index'));
    showSlide(index);
  });
});

// --- Автоматическое переключение каждые 3 секунды ---
// Критерий №14: 1 балл — автопереключение
setInterval(() => {
  showSlide(currentSlide + 1);
}, 3000);
