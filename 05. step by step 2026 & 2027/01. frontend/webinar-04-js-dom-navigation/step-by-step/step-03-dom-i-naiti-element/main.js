// Шаг 3: Поиск элементов в DOM-дереве
// Теория по этой теме подробно описана в файле README.md в этой папке.

// 1. Поиск одного первого элемента по CSS-селектору (.logo):
const logo = document.querySelector('.logo');
console.log('Найденный логотип:', logo);

// 2. Поиск всех элементов с классом .nav-link (возвращает коллекцию NodeList):
const navLinks = document.querySelectorAll('.nav-link');
console.log('Количество найденных ссылок в меню:', navLinks.length);

// 3. Доступ к первой ссылке по индексу 0:
console.log('Текст первой ссылки:', navLinks[0].textContent.trim());
