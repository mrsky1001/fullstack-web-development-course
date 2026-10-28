// Шаг 1: Связка всех страниц через localStorage
console.log('Проверяем текущие сохранённые данные в системе:');
const user = localStorage.getItem('currentUser');
const bookings = localStorage.getItem('myBookings');

console.log('Авторизованный пользователь:', user ? JSON.parse(user) : 'Не авторизован');
console.log('Бронирования в памяти:', bookings ? JSON.parse(bookings) : 'Список пуст');
