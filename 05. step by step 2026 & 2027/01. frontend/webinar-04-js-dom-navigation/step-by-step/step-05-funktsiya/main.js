// Шаг 5: Функции в JavaScript
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Объявляем функцию, которая принимает элемент ссылки и выводит ее текст:
function printLinkText(linkElement) {
  const text = linkElement.textContent.trim();
  console.log('Пункт навигации:', text);
}

const firstLink = document.querySelector('.nav-link');
if (firstLink) {
  printLinkText(firstLink);
}
