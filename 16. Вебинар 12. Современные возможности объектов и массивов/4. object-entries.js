/**
 * Object.entries(), Object.keys(), Object.values() в JavaScript
 *
 * Эти методы предоставляют способы работы с объектами как с коллекциями.
 *
 * Object.keys(obj) - возвращает массив ключей объекта
 * Object.values(obj) - возвращает массив значений объекта
 * Object.entries(obj) - возвращает массив пар [ключ, значение]
 * Object.fromEntries() - преобразует массив пар [ключ, значение] обратно в объект
 *
 * Применение:
 * - Итерация по объектам
 * - Преобразование объектов
 * - Фильтрация и маппинг объектов
 */

const person = {
    name: 'Alice',
    age: 30,
    profession: 'developer',
    city: 'Paris'
};

// OBJECT.KEYS()
// Получение массива ключей объекта
const keys = Object.keys(person);
console.log('Object.keys():', keys); // ['name', 'age', 'profession', 'city']

// OBJECT.VALUES()
// Получение массива значений объекта
const values = Object.values(person);
console.log('Object.values():', values); // ['Alice', 30, 'developer', 'Paris']

// OBJECT.ENTRIES()
// Получение массива пар [ключ, значение]
const entries = Object.entries(person);
console.log('Object.entries():', entries);
// [ ['name', 'Alice'], ['age', 30], ['profession', 'developer'], ['city', 'Paris'] ]

// ИТЕРАЦИЯ ПО ОБЪЕКТУ

// for...of с Object.entries()
for (const [key, value] of Object.entries(person)) {
    console.log(`Ключ: ${key}, Значение: ${value}`);
}

// forEach с Object.entries()
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});

// OBJECT.FROMENTRIES()
// Преобразование массива пар обратно в объект
const entriesArray = [['a', 1], ['b', 2], ['c', 3]];
const newObj = Object.fromEntries(entriesArray);
console.log('Object.fromEntries():', newObj); // { a: 1, b: 2, c: 3 }

// ПРЕОБРАЗОВАНИЕ ОБЪЕКТОВ

// Фильтрация объекта - оставить только строковые свойства
const stringProperties = Object.fromEntries(
    Object.entries(person).filter(([key, value]) => typeof value === 'string')
);
console.log('Только строковые свойства:', stringProperties);

// Трансформация значений объекта
const uppercasedPerson = Object.fromEntries(
    Object.entries(person).map(([key, value]) =>
        [key, typeof value === 'string' ? value.toUpperCase() : value]
    )
);
console.log('Значения в верхнем регистре:', uppercasedPerson);

// Инвертирование объекта (ключи ↔ значения)
const invertedPerson = Object.fromEntries(
    Object.entries(person).map(([key, value]) => [value, key])
);
console.log('Инвертированный объект:', invertedPerson);

// ПРАКТИЧЕСКИЕ ПРИМЕРЫ

// Подсчет количества свойств
const countProperties = obj => Object.keys(obj).length;
console.log('Количество свойств:', countProperties(person)); // 4

// Проверка на пустой объект
const isEmpty = obj => Object.keys(obj).length === 0;
console.log('Пустой объект?:', isEmpty({})); // true
console.log('Пустой объект?:', isEmpty(person)); // false

// Слияние объектов с условиями
const defaultSettings = { theme: 'light', notifications: true, language: 'en' };
const userSettings = { theme: 'dark', language: 'ru' };

const mergedSettings = Object.fromEntries([
    ...Object.entries(defaultSettings),
    ...Object.entries(userSettings)
]);
console.log('Объединенные настройки:', mergedSettings);

// Сортировка объекта по ключам
const unsorted = { z: 3, a: 1, m: 2 };
const sorted = Object.fromEntries(
    Object.entries(unsorted).sort(([a], [b]) => a.localeCompare(b))
);
console.log('Отсортированный объект:', sorted); // { a: 1, m: 2, z: 3 }

// Группировка массива объектов по свойству
const items = [
    { category: 'fruit', name: 'apple' },
    { category: 'vegetable', name: 'carrot' },
    { category: 'fruit', name: 'banana' },
    { category: 'vegetable', name: 'potato' }
];

const grouped = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
}, {});
console.log('Сгруппированные элементы:', grouped);