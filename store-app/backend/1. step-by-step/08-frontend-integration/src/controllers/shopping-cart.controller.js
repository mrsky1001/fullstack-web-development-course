/**
 * ====================================================================
 * CONTROLLER: Shopping Cart (Корзина)
 * ====================================================================
 * 
 * ВАЖНО: Все методы здесь защищены middleware isAuthenticated,
 * поэтому req.user ВСЕГДА существует.
 * 
 * ====================================================================
 */

const cartService = require('../services/shopping-cart.service');

/**
 * GET /shopping-cart/
 * Получить корзину текущего пользователя
 */
exports.getAllProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const items = await cartService.findAllProducts(userId);

        res.json({
            status: 'success',
            data: items,
            count: items.length
        });
    } catch (error) {
        console.error('Ошибка получения корзины:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка получения корзины'
        });
    }
};

/**
 * POST /shopping-cart/add
 * Добавить товар в корзину
 * Body: { productId, quantity }
 */
exports.addShoppingCartRow = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({
                status: 'error',
                message: 'Необходимо указать productId'
            });
        }

        // Проверяем, есть ли уже этот товар в корзине
        const existingItems = await cartService.findAllProducts(userId);
        const existing = existingItems.find(item => item.productId == productId);

        if (existing) {
            // Увеличиваем количество
            await cartService.updateQuantityRow({
                id: existing.rowId,
                quantity: existing.quantity + quantity
            }, userId);
        } else {
            // Добавляем новый товар
            await cartService.insertRow({
                userId,
                productId,
                quantity
            });
        }

        res.json({
            status: 'success',
            message: 'Товар добавлен в корзину'
        });

    } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка добавления в корзину'
        });
    }
};

/**
 * PUT /shopping-cart/update/:id
 * Изменить количество товара
 * Body: { quantity }
 */
exports.changeQuantityShoppingCartRow = async (req, res) => {
    try {
        const rowId = parseInt(req.params.id);
        const { quantity } = req.body;
        const userId = req.user.id;

        if (quantity <= 0) {
            // Если количество <= 0, удаляем товар
            await cartService.deleteRow(rowId, userId);
        } else {
            await cartService.updateQuantityRow({
                id: rowId,
                quantity
            }, userId);
        }

        res.json({
            status: 'success',
            message: 'Количество обновлено'
        });

    } catch (error) {
        console.error('Ошибка обновления:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка обновления количества'
        });
    }
};

/**
 * DELETE /shopping-cart/remove/:id
 * Удалить товар из корзины
 */
exports.removeShoppingCartRow = async (req, res) => {
    try {
        const rowId = parseInt(req.params.id);
        const userId = req.user.id;

        const deleted = await cartService.deleteRow(rowId, userId);

        if (deleted) {
            res.json({
                status: 'success',
                message: 'Товар удалён из корзины'
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Товар не найден'
            });
        }

    } catch (error) {
        console.error('Ошибка удаления:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка удаления из корзины'
        });
    }
};
