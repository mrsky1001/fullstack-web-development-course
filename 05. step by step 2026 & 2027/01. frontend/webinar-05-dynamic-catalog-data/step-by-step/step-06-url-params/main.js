// Шаг 6: Чтение параметров адресной строки (URLSearchParams)
// Теория по этой теме подробно описана в файле README.md в этой папке.

// Браузер передает id комнаты в адресной строке: room-details.html?id=focus-1
const params = new URLSearchParams(window.location.search);
const roomId = params.get('id') || 'focus-1';

console.log('Текущий поисковый запрос (search):', window.location.search);
console.log('Извлеченный ID выбранной комнаты:', roomId);
