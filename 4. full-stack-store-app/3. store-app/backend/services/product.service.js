/**
 * SERVICE: ProductService (Сервис товаров)
 * 
 * Содержит бизнес-логику для работы с товарами.
 * Отвечает за получение списка товаров и информации о конкретном товаре из БД.
 */

const db = require("./db.service");
const Product = require("../models/product.class");
const mockProducts = require("../lib/mockProducts"); // Запасные данные (если БД не работает)

// Флаг: использовать ли запасные данные (если БД недоступна)
let useMockData = false;

/**
 * Получает список всех товаров.
 * Также проверяет, добавлен ли товар в корзину текущего пользователя.
 * 
 * @param {number|null} userId - ID пользователя (для проверки корзины)
 * @returns {Promise<Product[]>} - Массив объектов товаров
 */
exports.findAllProducts = async (userId) => {
    // 1. Попытка получить данные из реальной Базы Данных
    try {
        /*
         * SQL ЗАПРОС:
         * SELECT p.* ... 
         * FROM products as p
         * LEFT JOIN shopping_cart ...
         * 
         * Мы используем LEFT JOIN, чтобы присоединить данные из корзины.
         * Если товар есть в корзине пользователя (shopping_cart.user_id = ?),
         * то поля item_id и item_quantity будут заполнены.
         * Если нет - они будут NULL.
         */
        const sql = `
            SELECT p.*,
                   shopping_cart.item_id,
                   shopping_cart.item_quantity,
                   (item_id IS NOT NULL) as is_exist_in_shopping_cart
            FROM products as p
            LEFT JOIN shopping_cart 
                   ON p.product_id = shopping_cart.product_id 
                   AND shopping_cart.user_id = ?;
        `;

        const [rows] = await db.execute(sql, [userId]);

        if (rows) {
            // Преобразуем "сырые" данные из БД в красивые объекты класса Product
            return rows.map((item) => new Product().fromDB(item));
        }

    } catch (error) {
        console.warn('⚠️ Основная База Данных недоступна, переключаемся на mock-данные:', error.message);
        useMockData = true;
    }

    // 2. Если БД недоступна или запрос не удался - используем Mock данные (для учебных целей)
    if (useMockData) {
        console.log('ℹ️ Используются тестовые данные (Mock Data)');
        return mockProducts.map(p => ({
            ...p,
            isExistInShoppingCart: false // В мок-данных корзину не проверяем
        }));
    }

    return [];
};

/**
 * Получает данные одного конкретного товара по ID.
 * 
 * @param {number|null} userId - ID пользователя
 * @param {number} productId - ID товара
 * @returns {Promise<Product|null>} - Объект товара или null
 */
exports.findProduct = async (userId, productId) => {
    try {
        const sql = `
            SELECT p.*,
                   shopping_cart.item_id,
                   shopping_cart.item_quantity,
                   (item_id IS NOT NULL) as is_exist_in_shopping_cart
            FROM products as p
            LEFT JOIN shopping_cart 
                   ON p.product_id = shopping_cart.product_id 
                   AND shopping_cart.user_id = ?
            WHERE p.product_id = ?;
        `;

        const [rows] = await db.execute(sql, [userId, productId]);

        if (rows && rows.length > 0) {
            return new Product().fromDB(rows[0]);
        }

    } catch (error) {
        console.warn('⚠️ Ошибка БД при поиске товара:', error.message);
        useMockData = true;
    }

    // Fallback: поиск в тестовых данных
    if (useMockData) {
        const product = mockProducts.find(p => p.id == productId);
        if (product) {
            return {
                ...product,
                isExistInShoppingCart: false
            };
        }
    }

    return null; // Товар не найден
};
