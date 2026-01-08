/**
 * ====================================================================
 * SERVICE: Product (Сервис товаров)
 * ====================================================================
 * 
 * Этот сервис содержит бизнес-логику для работы с товарами.
 * Он взаимодействует с базой данных и возвращает данные контроллеру.
 * 
 * Почему нужен Service?
 * ---------------------
 * Контроллер отвечает только за HTTP (получение запроса, отправка ответа).
 * Сервис содержит бизнес-логику и работу с БД.
 * 
 * Это разделение упрощает тестирование и поддержку кода.
 * 
 * ====================================================================
 */

const db = require('./db.service');

// Резервные данные на случай недоступности БД
const mockProducts = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA GeForce RTX 4090', price: 159990, category: 'Видеокарты' },
    { id: 4, name: 'AMD Radeon RX 7900 XTX', price: 89990, category: 'Видеокарты' },
    { id: 5, name: 'ASUS ROG STRIX Z790-E', price: 42990, category: 'Материнские платы' }
];

// Флаг: использовать ли mock-данные
let useMockData = false;

/**
 * Получить все товары
 * 
 * @returns {Promise<Array>} Массив товаров
 */
exports.findAllProducts = async () => {
    // Попытка получить данные из БД
    try {
        // ШАГ 1: Выполняем SQL запрос
        // --------------------------------------------------------------------
        // db.execute() возвращает массив [rows, fields]
        // rows — результат запроса (массив объектов)
        // fields — метаданные (обычно не нужны)
        // 
        // Мы используем деструктуризацию [rows] чтобы получить только данные

        const [rows] = await db.execute('SELECT * FROM products');

        // ШАГ 2: Преобразуем данные из формата БД в формат приложения
        // --------------------------------------------------------------------
        // В базе: product_id, product_name (snake_case)
        // В JS: id, name (camelCase)

        return rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
            category: row.product_category,
            img: row.product_img
        }));

    } catch (error) {
        // Если БД недоступна — переключаемся на mock-данные
        console.warn('⚠️ БД недоступна, используем mock-данные:', error.message);
        useMockData = true;
        return mockProducts;
    }
};

/**
 * Найти товар по ID
 * 
 * @param {number} productId - ID товара
 * @returns {Promise<Object|null>} Товар или null
 */
exports.findProduct = async (productId) => {
    try {
        // ШАГ 1: Выполняем параметризованный запрос
        // --------------------------------------------------------------------
        // ВАЖНО: НИКОГДА не вставляйте данные в SQL строку напрямую!
        // Это создаёт уязвимость SQL Injection!
        // 
        // Неправильно (уязвимо): 
        //   `SELECT * FROM products WHERE product_id = ${productId}`
        // 
        // Правильно (безопасно):
        //   'SELECT * FROM products WHERE product_id = ?', [productId]
        // 
        // Символ ? заменяется на значение из массива (с экранированием)

        const [rows] = await db.execute(
            'SELECT * FROM products WHERE product_id = ?',
            [productId]
        );

        if (rows.length > 0) {
            const row = rows[0];
            return {
                id: row.product_id,
                name: row.product_name,
                price: row.product_price,
                category: row.product_category,
                img: row.product_img
            };
        }

        return null; // Товар не найден

    } catch (error) {
        console.warn('⚠️ Ошибка БД:', error.message);
        useMockData = true;

        // Fallback: ищем в mock-данных
        return mockProducts.find(p => p.id === productId) || null;
    }
};
