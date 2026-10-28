// Шаг 2: Переменные let и const
// Теория по этой теме подробно описана в файле README.md в этой папке.

// const задает значение, которое нельзя менять после создания:
const siteName = 'СмартОфис';
const roomsCount = 6;

// let задает значение, которое можно перезаписывать:
let currentCity = 'Москва';

console.log('Название проекта:', siteName);
console.log('Количество комнат:', roomsCount);
console.log('Город:', currentCity);

// Изменяем значение переменной let:
currentCity = 'Санкт-Петербург';
console.log('Новый город:', currentCity);
