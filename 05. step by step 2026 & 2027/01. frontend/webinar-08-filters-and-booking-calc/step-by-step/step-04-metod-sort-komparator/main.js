// Шаг 4: Сортировка массива через метод .sort()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const roomsCopy = [...OFFICE_ROOMS];

// 1. Сортировка от дешевых к дорогим (по возрастанию):
roomsCopy.sort((a, b) => a.pricePerHour - b.pricePerHour);
console.log('По возрастанию цены:', roomsCopy.map(r => r.title + ': ' + r.pricePerHour));

// 2. Сортировка от дорогих к дешевым (по убыванию):
roomsCopy.sort((a, b) => b.pricePerHour - a.pricePerHour);
console.log('По убыванию цены:', roomsCopy.map(r => r.title + ': ' + r.pricePerHour));
