// Шаг 2: Переменные let и const
// Теория по этой теме подробно описана в файле README.md в этой папке.

// const — константа, значение которой нельзя изменить после создания:
const siteTitle = 'СмартОфис';

// let — переменная, значение которой может меняться в процессе работы:
let availableRoomsCount = 6;

console.log('Название портала:', siteTitle);
console.log('Доступно комнат для бронирования:', availableRoomsCount);

// Изменяем значение переменной let:
availableRoomsCount = availableRoomsCount - 1;
console.log('После бронирования одной комнаты осталось:', availableRoomsCount);
