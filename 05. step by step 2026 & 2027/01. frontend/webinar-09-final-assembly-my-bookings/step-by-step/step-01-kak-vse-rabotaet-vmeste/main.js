// Шаг 1: Связь всех страниц через localStorage
// Теория по этой теме подробно описана в файле README.md в этой папке.

console.log('Проверка сохраненных данных проекта:');

const savedUser = localStorage.getItem('currentUser');
const savedBookings = localStorage.getItem('myBookings');

console.log('Текущий пользователь:', savedUser ? JSON.parse(savedUser) : 'не вошел');
console.log('Список бронирований:', savedBookings ? JSON.parse(savedBookings) : 'пусто');
