// Шаг 5: Функции в JavaScript
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Объявление функции, которая принимает элемент в качестве параметра:
function highlightLink(linkElement) {
  if (!linkElement) return;

  linkElement.classList.add('active');
  console.log('Подсвечен пункт меню:', linkElement.textContent.trim());
}

// Находим ссылки меню
const allLinks = document.querySelectorAll('.nav-link');

// Вызываем функцию для второй ссылки («Каталог» с индексом 1):
if (allLinks.length > 1) {
  highlightLink(allLinks[1]);
}
