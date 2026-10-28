// Шаг 3: Поиск элементов в DOM
// Ищем логотип по CSS-классу
const logo = document.querySelector('.logo');
console.log('Найденный логотип:', logo);

// Ищем все ссылки навигации
const navLinks = document.querySelectorAll('.nav-link');
console.log('Количество ссылок в меню:', navLinks.length);
