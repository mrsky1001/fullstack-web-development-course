// Шаг 3: Массив объектов из файла data.js
console.log('Загружена база данных комнат:', OFFICE_ROOMS);
console.log('Всего комнат в каталоге:', OFFICE_ROOMS.length);

// Выводим название каждой комнаты в цикле forEach
OFFICE_ROOMS.forEach(function (room, index) {
  console.log((index + 1) + '. ' + room.title + ' — ' + room.pricePerHour + ' ₽/час');
});
