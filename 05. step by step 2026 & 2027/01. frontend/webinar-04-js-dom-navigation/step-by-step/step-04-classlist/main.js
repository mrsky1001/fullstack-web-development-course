// Шаг 4: Управление классами через classList
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Находим первую ссылку в меню
const firstLink = document.querySelector('.nav-link');

// Добавляем класс active (синий цвет и жирный шрифт из style.css)
firstLink.classList.add('active');
console.log('Класс active добавлен к первой ссылке');

// Проверяем, есть ли класс у элемента (вернет true или false)
const isLinkActive = firstLink.classList.contains('active');
console.log('Активна ли ссылка сейчас:', isLinkActive);
