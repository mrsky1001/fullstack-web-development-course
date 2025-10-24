/**
 * SYMBOL в JavaScript
 *
 * Symbol - это примитивный тип данных, который представляет собой уникальный идентификатор.
 *
 * Особенности:
 * - Каждый Symbol уникален (Symbol() !== Symbol())
 * - Может иметь описание (для отладки)
 * - Не участвует в итерации по объекту
 * - Используется для создания скрытых свойств
 *
 * Применение:
 * - Создание уникальных ключей для свойств объектов
 * - Создание констант с уникальными значениями
 */

// СОЗДАНИЕ SYMBOL

// Базовое создание
const id = Symbol();
console.log('Тип Symbol:', typeof id); // symbol

// Symbol с описанием
const idWithDescription = Symbol('id');
console.log('Symbol с описанием:', idWithDescription.toString()); // Symbol(id)

// Уникальность Symbol
const sym1 = Symbol('test');
const sym2 = Symbol('test');
console.log('Сравнение Symbol:', sym1 === sym2); // false

// ГЛОБАЛЬНЫЙ SYMBOL REGISTRY

// Symbol.for() - создает или получает глобальный Symbol
const globalSym1 = Symbol.for('globalId');
const globalSym2 = Symbol.for('globalId');
console.log('Глобальные Symbol одинаковы:', globalSym1 === globalSym2); // true

// Symbol.keyFor() - получение описания глобального Symbol
console.log('Ключ глобального Symbol:', Symbol.keyFor(globalSym1)); // globalId

// SYMBOL В ОБЪЕКТАХ

const user = {
    name: 'Alice',
    age: 30,
    [Symbol('id')]: 123, // скрытое свойство
    [Symbol.for('token')]: 'abc123' // глобальное скрытое свойство
};

// Symbol свойства не видны при обычной итерации
console.log('Object.keys():', Object.keys(user)); // ['name', 'age']
console.log('Object.getOwnPropertyNames():', Object.getOwnPropertyNames(user)); // ['name', 'age']

// Но доступны через специальные методы
const symbolKeys = Object.getOwnPropertySymbols(user);
console.log('Symbol свойства:', symbolKeys);

// Доступ к Symbol свойствам
console.log('Значение Symbol свойства:', user[Symbol.for('token')]); // abc123

// WELL-KNOWN SYMBOLS
// Специальные Symbol, которые изменяют поведение объектов

// Symbol.iterator - для создания итерируемых объектов
const iterableObject = {
    data: [1, 2, 3],
    [Symbol.iterator]: function() {
        let index = 0;
        return {
            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                }
                return { done: true };
            }
        };
    }
};

console.log('Итерируемый объект:');
for (const item of iterableObject) {
    console.log(item); // 1, 2, 3
}

// Symbol.toPrimitive - для преобразования объекта к примитивам
const price = {
    value: 100,
    currency: 'USD',
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'string':
                return `${this.value} ${this.currency}`;
            case 'number':
                return this.value;
            default:
                return this.value;
        }
    }
};

console.log('String контекст:', String(price)); // "100 USD"
console.log('Number контекст:', Number(price)); // 100
console.log('Сложение:', price + 50); // 150

// Symbol.toStringTag - для кастомизации Object.prototype.toString()
const customObject = {
    [Symbol.toStringTag]: 'CustomObject'
};
console.log('toString кастомного объекта:', Object.prototype.toString.call(customObject)); // [object CustomObject]

// ПРАКТИЧЕСКИЕ ПРИМЕРЫ

// Создание констант с Symbol
const USER_ROLES = {
    ADMIN: Symbol('ADMIN'),
    USER: Symbol('USER'),
    GUEST: Symbol('GUEST')
};

function checkAccess(userRole) {
    if (userRole === USER_ROLES.ADMIN) {
        return 'Полный доступ';
    } else if (userRole === USER_ROLES.USER) {
        return 'Ограниченный доступ';
    } else {
        return 'Гостевой доступ';
    }
}

console.log('Проверка доступа:', checkAccess(USER_ROLES.ADMIN));

// Скрытые метаданные в объектах
const META = Symbol('meta');

function createEntity(data) {
    return {
        ...data,
        [META]: {
            createdAt: new Date(),
            version: 1
        }
    };
}

const entity = createEntity({ id: 1, name: 'Test' });
console.log('Основные данные:', entity.id, entity.name);
console.log('Метаданные:', entity[META]);

// Защита от конфликтов имен в библиотеках
const MyLibrary = (function() {
    const internalState = Symbol('internalState');

    return class {
        constructor() {
            this[internalState] = { count: 0 };
        }

        increment() {
            this[internalState].count++;
            return this[internalState].count;
        }

        getCount() {
            return this[internalState].count;
        }
    };
})();

const libInstance = new MyLibrary();
libInstance.increment();
libInstance.increment();
console.log('Счетчик библиотеки:', libInstance.getCount()); // 2