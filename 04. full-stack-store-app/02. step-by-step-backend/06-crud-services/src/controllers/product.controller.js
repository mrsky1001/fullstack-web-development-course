/**
 * ====================================================================
 * CONTROLLER: Product (Полный CRUD)
 * ====================================================================
 * 
 * Контроллер обрабатывает HTTP запросы и вызывает соответствующие
 * методы сервиса. Он не содержит бизнес-логику — только
 * преобразование данных между HTTP и сервисом.
 * 
 * ====================================================================
 */

const productService = require('../services/product.service');

// ====================================================================
// READ (Чтение)
// ====================================================================

/**
 * GET /product/all
 * Получить все товары
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.findAllProducts();

        res.json({
            status: 'success',
            message: 'Список товаров получен',
            data: products,
            count: products.length
        });
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка получения товаров'
        });
    }
};

/**
 * GET /product/:id
 * Получить товар по ID
 */
exports.getProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const product = await productService.findProduct(productId);

        if (product) {
            res.json({
                status: 'success',
                message: 'Товар найден',
                data: product
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `Товар с ID ${productId} не найден`
            });
        }
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка получения товара'
        });
    }
};

// ====================================================================
// CREATE (Создание)
// ====================================================================

/**
 * POST /product/add
 * Создать новый товар
 * 
 * Ожидаемое тело запроса:
 * {
 *   "name": "Название товара",
 *   "price": 12345,
 *   "category": "Категория" (опционально)
 * }
 */
exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Валидация входных данных
        if (!productData.name || !productData.price) {
            return res.status(400).json({
                status: 'error',
                message: 'Необходимо указать name и price'
            });
        }

        // Создаём товар через сервис
        const newProduct = await productService.createProduct(productData);

        // Возвращаем 201 Created
        res.status(201).json({
            status: 'success',
            message: 'Товар успешно создан',
            data: newProduct
        });
    } catch (error) {
        console.error('Ошибка создания:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка создания товара'
        });
    }
};

// ====================================================================
// UPDATE (Обновление)
// ====================================================================

/**
 * PUT /product/:id
 * Обновить товар
 */
exports.updateProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const productData = req.body;

        // Валидация
        if (!productData.name || !productData.price) {
            return res.status(400).json({
                status: 'error',
                message: 'Необходимо указать name и price'
            });
        }

        const updatedProduct = await productService.updateProduct(productId, productData);

        if (updatedProduct) {
            res.json({
                status: 'success',
                message: 'Товар обновлён',
                data: updatedProduct
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `Товар с ID ${productId} не найден`
            });
        }
    } catch (error) {
        console.error('Ошибка обновления:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка обновления товара'
        });
    }
};

// ====================================================================
// DELETE (Удаление)
// ====================================================================

/**
 * DELETE /product/:id
 * Удалить товар
 */
exports.deleteProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.id);
        const deleted = await productService.deleteProduct(productId);

        if (deleted) {
            res.json({
                status: 'success',
                message: `Товар с ID ${productId} удалён`
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: `Товар с ID ${productId} не найден`
            });
        }
    } catch (error) {
        console.error('Ошибка удаления:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка удаления товара'
        });
    }
};
