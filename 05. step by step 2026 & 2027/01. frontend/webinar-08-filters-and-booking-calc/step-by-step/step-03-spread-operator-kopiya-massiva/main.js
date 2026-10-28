// Шаг 3: Копия массива через [...]
const originalRooms = ['Фокус', 'Альфа', 'Хаб'];
const copiedRooms = [...originalRooms];

copiedRooms.push('Новая комната');

console.log('Оригинал (не изменился):', originalRooms);
console.log('Копия (с новым элементом):', copiedRooms);
