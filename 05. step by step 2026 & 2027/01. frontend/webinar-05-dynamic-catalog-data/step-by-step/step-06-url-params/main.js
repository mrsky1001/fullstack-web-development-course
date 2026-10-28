// Шаг 6: Чтение параметров URL
// Теория по этой теме подробно описана в файле README.md в этой папке.

// window.location.search содержит строку параметров адреса после знака '?'
console.log('Хвост адреса:', window.location.search);

// Создаем парсер параметров
const params = new URLSearchParams(window.location.search);

// Получаем значение параметра id (или берем focus-1 по умолчанию)
const currentId = params.get('id') || 'focus-1';

console.log('Идентификатор комнаты из адреса:', currentId);

const out = document.getElementById('urlOutput');
if (out) {
  out.textContent = 'Текущий ID комнаты: ' + currentId;
}
