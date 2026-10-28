// Шаг 3: Массив объектов из файла data.js
// Теория по этой теме подробно описана в файле README.md в этой папке.

// OFFICE_ROOMS объявлен в файле data.js и доступен здесь
console.log('База данных комнат загружена, всего записей:', OFFICE_ROOMS.length);

// Перебираем комнаты циклом forEach и выводим информацию:
OFFICE_ROOMS.forEach(function (room, index) {
  console.log((index + 1) + '. ' + room.title + ' — ' + room.pricePerHour + ' руб/час');
});
