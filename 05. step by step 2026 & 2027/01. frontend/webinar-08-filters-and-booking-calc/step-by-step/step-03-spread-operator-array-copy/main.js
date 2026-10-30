// Шаг 3: Spread-оператор [...] для безопасной копии массива
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Исходный массив из базы данных:
console.log('Оригинальный массив OFFICE_ROOMS:', OFFICE_ROOMS.length);

// Создаем независимую поверхностную копию с помощью трех точек [...]:
const roomsCopy = [...OFFICE_ROOMS];

console.log('Скопированный массив:', roomsCopy.length);
console.log('Являются ли массивы одной и той же ссылкой в памяти?', roomsCopy === OFFICE_ROOMS);
