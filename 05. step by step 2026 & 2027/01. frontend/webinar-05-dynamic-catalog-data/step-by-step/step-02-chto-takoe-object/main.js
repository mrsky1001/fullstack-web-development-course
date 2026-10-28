// Шаг 2: Что такое объект в JavaScript
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Объект хранит набор именованных свойств ключ: значение в фигурных скобках {}:
const room = {
  id: 'focus-1',
  title: 'Мини-офис Focus',
  pricePerHour: 450,
  capacity: '1-2 человека'
};

console.log('Объект комнаты:', room);
console.log('Название комнаты (через точку):', room.title);
console.log('Цена аренды:', room.pricePerHour, 'рублей в час');
