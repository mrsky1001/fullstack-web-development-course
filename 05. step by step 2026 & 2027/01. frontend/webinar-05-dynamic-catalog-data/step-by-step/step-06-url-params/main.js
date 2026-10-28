// Шаг 6: Чтение параметров URL
const params = new URLSearchParams(window.location.search);
const currentId = params.get('id') || 'focus-1';

console.log('Текущий id из адресной строки:', currentId);

const out = document.getElementById('urlOutput');
if (out) {
  out.textContent = 'Выбранный ID комнаты: ' + currentId;
}
