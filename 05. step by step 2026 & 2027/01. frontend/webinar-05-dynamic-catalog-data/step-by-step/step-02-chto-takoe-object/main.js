// Шаг 2: Объекты в JavaScript
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Объект описывает одну конкретную комнату парами «ключ: значение»
const room = {
  id: 'focus-1',
  title: 'Мини-офис Focus',
  pricePerHour: 450,
  capacity: '1-2 человека'
};

console.log('Объект комнаты целиком:', room);

// Доступ к отдельным свойствам через точку:
console.log('Название:', room.title);
console.log('Цена за час аренды:', room.pricePerHour, 'рублей');
console.log('Вместимость:', room.capacity);
