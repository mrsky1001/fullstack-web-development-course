/**
 * ====================================================================
 * SERVICE: Product (Полный CRUD)
 * ====================================================================
 * 
 * CRUD — это акроним для четырёх базовых операций с данными:
 * 
 * | CRUD     | HTTP метод | SQL команда | Описание             |
 * |----------|------------|-------------|----------------------|
 * | Create   | POST       | INSERT      | Создание записи      |
 * | Read     | GET        | SELECT      | Чтение записи        |
 * | Update   | PUT/PATCH  | UPDATE      | Обновление записи    |
 * | Delete   | DELETE     | DELETE      | Удаление записи      |
 * 
 * ====================================================================
 */

const db = require('./db.service');

// Mock данные (если БД недоступна)
const mockProducts = [
    { id: 1, name: 'Intel Core i9-13900K', price: 55990, category: 'Процессоры' },
    { id: 2, name: 'AMD Ryzen 9 7950X', price: 62990, category: 'Процессоры' },
    { id: 3, name: 'NVIDIA GeForce RTX 4090', price: 159990, category: 'Видеокарты' },
    { id: 4, name: 'AMD Radeon RX 7900 XTX', price: 89990, category: 'Видеокарты' },
    { id: 5, name: 'ASUS ROG STRIX Z790-E', price: 42990, category: 'Материнские платы' }
];

let useMockData = false;
let mockIdCounter = 6;

// ====================================================================
// READ (Чтение)
// ====================================================================

/**
 * Получить все товары
 * SQL: SELECT * FROM products
 */
exports.findAllProducts = async () => {
    try {
        const [rows] = await db.execute('SELECT * FROM products');
        return rows.map(row => ({
            id: row.product_id,
            name: row.product_name,
            price: row.product_price,
            category: row.product_category,
            img: row.product_img
        }));
    } catch (error) {
        console.warn('⚠️ Mock mode:', error.message);
        useMockData = true;
        return [...mockProducts];
    }
};

/**
 * Найти товар по ID
 * SQL: SELECT * FROM products WHERE product_id = ?
 */
exports.findProduct = async (productId) => {
    try {
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
        return null;
    } catch (error) {
        useMockData = true;
        return mockProducts.find(p => p.id === productId) || null;
    }
};

// ====================================================================
// CREATE (Создание)
// ====================================================================

/**
 * Создать новый товар
 * SQL: INSERT INTO products (product_name, product_price, product_category) VALUES (?, ?, ?)
 * 
 * @param {Object} productData - Данные нового товара
 * @returns {Promise<Object>} Созданный товар с ID
 */
exports.createProduct = async (productData) => {
    try {
        // ШАГ 1: Выполняем INSERT запрос
        // --------------------------------------------------------------------
        // INSERT возвращает объект ResultSetHeader с информацией о вставке
        // result[0].insertId — ID созданной записи (AUTO_INCREMENT)

        const [result] = await db.execute(
            `INSERT INTO products (product_name, product_price, product_category, product_img) 
             VALUES (?, ?, ?, ?)`,
            [
                productData.name,
                productData.price,
                productData.category || null,
                productData.img || null
            ]
        );

        // ШАГ 2: Возвращаем созданный объект с новым ID
        return {
            id: result.insertId,
            name: productData.name,
            price: productData.price,
            category: productData.category,
            img: productData.img
        };

    } catch (error) {
        console.warn('⚠️ Mock mode (create):', error.message);
        useMockData = true;

        // Mock-создание
        const newProduct = {
            id: mockIdCounter++,
            name: productData.name,
            price: productData.price,
            category: productData.category,
            img: productData.img
        };
        mockProducts.push(newProduct);
        return newProduct;
    }
};

// ====================================================================
// UPDATE (Обновление)
// ====================================================================

/**
 * Обновить товар
 * SQL: UPDATE products SET product_name = ?, product_price = ? WHERE product_id = ?
 * 
 * @param {number} productId - ID товара
 * @param {Object} productData - Новые данные
 * @returns {Promise<Object|null>} Обновлённый товар или null
 */
exports.updateProduct = async (productId, productData) => {
    try {
        // ШАГ 1: Выполняем UPDATE
        // --------------------------------------------------------------------
        // result[0].affectedRows — количество изменённых строк
        // Если 0 — запись с таким ID не найдена

        const [result] = await db.execute(
            `UPDATE products 
             SET product_name = ?, product_price = ?, product_category = ?, product_img = ?
             WHERE product_id = ?`,
            [
                productData.name,
                productData.price,
                productData.category || null,
                productData.img || null,
                productId
            ]
        );

        // ШАГ 2: Проверяем, была ли обновлена запись
        if (result.affectedRows === 0) {
            return null; // Товар не найден
        }

        // ШАГ 3: Возвращаем обновлённый объект
        return {
            id: productId,
            name: productData.name,
            price: productData.price,
            category: productData.category,
            img: productData.img
        };

    } catch (error) {
        console.warn('⚠️ Mock mode (update):', error.message);
        useMockData = true;

        // Mock-обновление
        const index = mockProducts.findIndex(p => p.id === productId);
        if (index === -1) return null;

        mockProducts[index] = { id: productId, ...productData };
        return mockProducts[index];
    }
};

// ====================================================================
// DELETE (Удаление)
// ====================================================================

/**
 * Удалить товар
 * SQL: DELETE FROM products WHERE product_id = ?
 * 
 * @param {number} productId - ID товара
 * @returns {Promise<boolean>} true если удалён, false если не найден
 */
exports.deleteProduct = async (productId) => {
    try {
        const [result] = await db.execute(
            'DELETE FROM products WHERE product_id = ?',
            [productId]
        );

        // affectedRows > 0 означает, что запись была удалена
        return result.affectedRows > 0;

    } catch (error) {
        console.warn('⚠️ Mock mode (delete):', error.message);
        useMockData = true;

        // Mock-удаление
        const index = mockProducts.findIndex(p => p.id === productId);
        if (index === -1) return false;

        mockProducts.splice(index, 1);
        return true;
    }
};
