/**
 * ====================================================================
 * CONTROLLER: Product (Контроллер товаров)
 * ====================================================================
 * 
 * Controller (Контроллер) — это часть паттерна MVC.
 * Он содержит логику обработки HTTP запросов.
 * 
 * Задачи контроллера:
 * 1. Получить данные из запроса (req.params, req.body, req.query)
 * 2. Обработать данные (или вызвать Service для этого)
 * 3. Отправить ответ клиенту (res.json, res.send)
 * 
 * Контроллер НЕ должен:
 * - Содержать бизнес-логику (это задача Service)
 * - Работать напрямую с базой данных (это задача Service)
 * 
 * ====================================================================
 */

// Временные данные (mock data)
// В следующих уроках мы перенесём это в Service и базу данных
const mockProducts = [
    {
        id: 1,
        name: 'Intel Core i9-13900K',
        price: 55990,
        category: 'Процессоры'
    },
    {
        id: 2,
        name: 'AMD Ryzen 9 7950X',
        price: 62990,
        category: 'Процессоры'
    },
    {
        id: 3,
        name: 'NVIDIA GeForce RTX 4090',
        price: 159990,
        category: 'Видеокарты'
    },
    {
        id: 4,
        name: 'AMD Radeon RX 7900 XTX',
        price: 89990,
        category: 'Видеокарты'
    },
    {
        id: 5,
        name: 'ASUS ROG STRIX Z790-E',
        price: 42990,
        category: 'Материнские платы'
    }
];

/**
 * Получить все товары
 * 
 * Маршрут: GET /product/all
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 */
exports.getAllProducts = (req, res) => {
    // Формируем стандартизированный ответ
    // В будущем мы создадим класс ResObj для этого
    res.json({
        status: 'success',
        message: 'Список товаров получен',
        data: mockProducts,
        count: mockProducts.length
    });
};

/**
 * Получить один товар по ID
 * 
 * Маршрут: GET /product/:id
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 */
exports.getProduct = (req, res) => {
    // ШАГ 1: Извлекаем ID из параметров URL
    // --------------------------------------------------------------------
    // req.params содержит параметры маршрута (обозначенные через :param)
    // Для маршрута '/product/:id' и URL '/product/5':
    //   req.params = { id: '5' }
    // 
    // ВАЖНО: Параметр всегда string! Для сравнения с числом
    // нужно преобразовать через parseInt() или использовать ==

    const productId = parseInt(req.params.id);

    // ШАГ 2: Ищем товар в массиве
    // --------------------------------------------------------------------
    // Array.find() возвращает первый элемент, удовлетворяющий условию,
    // или undefined, если такой элемент не найден

    const product = mockProducts.find(p => p.id === productId);

    // ШАГ 3: Отправляем ответ
    // --------------------------------------------------------------------

    if (product) {
        // Товар найден
        res.json({
            status: 'success',
            message: 'Товар найден',
            data: product
        });
    } else {
        // Товар не найден — возвращаем 404
        res.status(404).json({
            status: 'error',
            message: `Товар с ID ${productId} не найден`,
            statusCode: 404
        });
    }
};
