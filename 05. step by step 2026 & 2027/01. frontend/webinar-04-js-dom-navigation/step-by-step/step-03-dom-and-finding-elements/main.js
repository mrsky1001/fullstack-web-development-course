// Шаг 3: Поиск элементов в DOM через querySelector и querySelectorAll
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Ищем один элемент по CSS-селектору:
const logo = document.querySelector('.logo');
console.log('Найден элемент логотипа:', logo);

// Ищем все ссылки навигации в шапке сайта:
const navLinks = document.querySelectorAll('.nav-link');
console.log('Найдено ссылок меню на странице:', navLinks.length);
