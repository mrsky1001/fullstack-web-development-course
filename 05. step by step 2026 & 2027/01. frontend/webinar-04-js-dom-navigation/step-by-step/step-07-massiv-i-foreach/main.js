// Шаг 7: Перебор элементов
const navLinks = document.querySelectorAll('.nav-link');

console.log('Список всех пунктов меню:');
navLinks.forEach(function (link, index) {
  console.log((index + 1) + '. ' + link.textContent.trim());
});
