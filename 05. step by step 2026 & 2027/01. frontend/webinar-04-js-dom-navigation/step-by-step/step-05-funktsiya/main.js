// Шаг 5: Функции
// Объявляем функцию
function highlightLink(linkElement) {
  linkElement.classList.add('active');
  console.log('Ссылка успешно подсвечена:', linkElement.textContent.trim());
}

// Находим вторую ссылку («Каталог») и вызываем функцию
const allLinks = document.querySelectorAll('.nav-link');
if (allLinks.length > 1) {
  highlightLink(allLinks[1]);
}
