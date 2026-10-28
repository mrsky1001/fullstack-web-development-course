// Шаг 4: Сортировка по цене
const roomsCopy = [...OFFICE_ROOMS];

// Сортировка от дешёвых к дорогим:
roomsCopy.sort((a, b) => a.pricePerHour - b.pricePerHour);
console.log('По возрастанию цены:', roomsCopy.map(r => r.title + ': ' + r.pricePerHour));

// Сортировка от дорогих к дешёвым:
roomsCopy.sort((a, b) => b.pricePerHour - a.pricePerHour);
console.log('По убыванию цены:', roomsCopy.map(r => r.title + ': ' + r.pricePerHour));
