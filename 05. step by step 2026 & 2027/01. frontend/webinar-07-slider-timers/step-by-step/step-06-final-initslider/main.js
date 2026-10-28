// Шаг 6: Финальная сборка модуля слайдера
// Теория по этой теме подробно описана в файле README.md в этой папке.

document.addEventListener('DOMContentLoaded', function () {
  initSlider();
});

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return;

  let currentSlide = 0;
  let timerId = null;

  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function startAuto() {
    // Сначала останавливаем старый таймер, чтобы они не накладывались друг на друга:
    clearInterval(timerId);
    timerId = setInterval(() => showSlide(currentSlide + 1), 3500);
  }

  // При ручных кликах сбрасываем таймер:
  if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); startAuto(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => { showSlide(idx); startAuto(); });
  });

  startAuto();
  console.log('Слайдер полностью готов и запущен.');
}
