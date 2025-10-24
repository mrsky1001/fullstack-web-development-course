/**
 * ОПЦИОНАЛЬНАЯ ЦЕПОЧКА (Optional Chaining) в JavaScript
 *
 * Опциональная цепочка (?.) - это безопасный способ доступа к свойствам вложенных объектов,
 * без необходимости проверять каждое звено цепочки на существование.
 *
 * Синтаксис:
 * obj?.prop       - доступ к свойству
 * obj?.[expr]     - доступ к свойству через выражение
 * func?.(...args) - вызов функции, если она существует
 *
 * Преимущества:
 * - Упрощает код с глубокими цепочками свойств
 * - Избегает ошибок "Cannot read property of undefined"
 * - Лаконичная альтернатива проверкам через &&
 */

const user = {
    name: 'Alice',
    age: 30,
    address: {
        city: 'Paris',
        postalCode: '75001',
        coordinates: {
            lat: 48.8566,
            lng: 2.3522
        }
    },
    hobbies: ['reading', 'swimming'],
    getProfile: function() {
        return `${this.name}, ${this.age} years`;
    }
};

// БАЗОВОЕ ИСПОЛЬЗОВАНИЕ

// Доступ к свойствам
console.log('Город пользователя:', user?.address?.city); // Paris
console.log('Несуществующее свойство:', user?.contacts?.phone); // undefined

// Доступ к элементам массива
console.log('Первый хобби:', user?.hobbies?.[0]); // reading
console.log('Несуществующий массив:', user?.skills?.[0]); // undefined

// Вызов методов
console.log('Вызов метода:', user?.getProfile?.()); // Alice, 30 years
console.log('Вызов несуществующего метода:', user?.calculateAge?.()); // undefined

// СРАВНЕНИЕ С ТРАДИЦИОННЫМ ПОДХОДОМ

// Традиционный подход с проверками
const cityTraditional = user && user.address && user.address.city;

// Современный подход с опциональной цепочкой
const cityModern = user?.address?.city;

console.log('Традиционный подход:', cityTraditional); // Paris
console.log('Современный подход:', cityModern); // Paris

// ОБРАБОТКА НЕОПРЕДЕЛЕННЫХ ЗНАЧЕНИЙ

// Комбинация с нулевым coalescing оператором (??)
const phone = user?.contacts?.phone ?? 'Телефон не указан';
console.log('Телефон с fallback:', phone); // Телефон не указан

// Комбинация с оператором OR (||)
const cityOr = user?.address?.city || 'Город не указан';
console.log('Город с OR:', cityOr); // Paris

// ПРАКТИЧЕСКИЕ СЦЕНАРИИ

// 1. Работа с API ответами
const apiResponse = {
    data: {
        users: [
            { name: 'John', profile: { avatar: 'john.jpg' } },
            { name: 'Jane' }
        ]
    }
};

// Безопасный доступ к аватару
const firstUserAvatar = apiResponse?.data?.users?.[0]?.profile?.avatar;
const secondUserAvatar = apiResponse?.data?.users?.[1]?.profile?.avatar;

console.log('Аватар первого пользователя:', firstUserAvatar); // john.jpg
console.log('Аватар второго пользователя:', secondUserAvatar); // undefined

// 2. Обработка конфигураций
const config = {
    theme: 'dark',
    settings: {
        notifications: true
    }
};

const notificationSound = config?.settings?.notifications?.sound ?? 'default.wav';
console.log('Звук уведомлений:', notificationSound); // default.wav

// 3. Работа с DOM элементами
function getElementText(selector) {
    return document.querySelector(selector)?.textContent ?? 'Элемент не найден';
}

// 4. Обработка вложенных объектов с функциями
const payment = {
    processor: 'stripe',
    getDetails: function() {
        return { status: 'processed', amount: 100 };
    }
};

const paymentStatus = payment?.getDetails?.().status;
console.log('Статус платежа:', paymentStatus); // processed

// 5. Динамический доступ к свойствам
const propertyName = 'city';
const dynamicProperty = user?.address?.[propertyName];
console.log('Динамическое свойство:', dynamicProperty); // Paris

// ОГРАНИЧЕНИЯ И ОСОБЕННОСТИ

// Опциональная цепочка работает только для существующих переменных
// console.log(notDefined?.property); // ReferenceError: notDefined is not defined

// Но безопасна для null и undefined
const nullValue = null;
console.log('Доступ к null:', nullValue?.property); // undefined

const undefinedValue = undefined;
console.log('Доступ к undefined:', undefinedValue?.property); // undefined

// Не работает для присваивания
const obj = {};
// obj?.property = 'value'; // SyntaxError

// УПРАЖНЕНИЯ

// Функция для безопасного получения email пользователя
function getUserEmail(user) {
    return user?.profile?.contact?.email ?? 'Email не указан';
}

// Функция для безопасного выполнения callback
function safeCallback(callback, ...args) {
    return callback?.(...args);
}

// Пример использования
const testUser = {
    profile: {
        contact: {
            email: 'test@example.com'
        }
    }
};

console.log('Email пользователя:', getUserEmail(testUser)); // test@example.com
console.log('Email отсутствующего пользователя:', getUserEmail(null)); // Email не указан

// Безопасный вызов callback
const result1 = safeCallback(() => 'Hello World');
const result2 = safeCallback(null);
console.log('Результат callback:', result1); // Hello World
console.log('Результат отсутствующего callback:', result2); // undefined