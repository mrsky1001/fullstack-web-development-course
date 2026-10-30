// Шаг 6: Финальная сборка модуля слайдера initSlider
// Теория по этой теме подробно описана в файле README.md в этой папке.

initSlider();

function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const sliderElem = document.querySelector('.slider');

  if (!slides.length) return;

  let currentIndex = 0;
  let timerId = null;

  function showSlide(index) {
    if (index >= slides.length) currentIndex = 0;
    else if (index < 0) currentIndex = slides.length - 1;
    else currentIndex = index;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  function startAutoplay() {
    stopAutoplay();
    timerId = setInterval(() => showSlide(currentIndex + 1), 3500);
  }

  function stopAutoplay() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      startAutoplay();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startAutoplay();
    });
  });

  if (sliderElem) {
    sliderElem.addEventListener('mouseenter', stopAutoplay);
    sliderElem.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
  console.log('Слайдер СмартОфис успешно запущен.');
}
