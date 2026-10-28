// Шаг 4: Управление классами
const firstLink = document.querySelector('.nav-link');

// Добавляем класс active
firstLink.classList.add('active');
console.log('Класс active добавлен к первой ссылке');

// Проверяем, есть ли класс
console.log('Есть ли класс active?', firstLink.classList.contains('active'));
