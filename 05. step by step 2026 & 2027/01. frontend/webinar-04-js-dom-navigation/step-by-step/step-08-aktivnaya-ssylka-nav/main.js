// Шаг 8: Переключение активной ссылки при клике
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(function (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    // 1. Снимаем active со всех ссылок
    navLinks.forEach(function (item) {
      item.classList.remove('active');
    });

    // 2. Добавляем active только текущей
    link.classList.add('active');
    console.log('Активным стал пункт:', link.textContent.trim());
  });
});
