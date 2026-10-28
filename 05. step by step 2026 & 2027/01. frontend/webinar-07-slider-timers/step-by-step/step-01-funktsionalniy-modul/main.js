// Шаг 1: Поиск элементов слайдера
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Находим все части слайдера в разметке:
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

console.log('Найдено картинок-слайдов:', slides.length);
console.log('Найдено круглых точек:', dots.length);
