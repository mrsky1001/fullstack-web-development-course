/**
 * CONTROLLER: Shopping Cart (Финальная версия с валидацией)
 */

const cartService = require('../services/shopping-cart.service');
const ResObj = require('../models/resObj.class');
const msgs = require('../lib/messages.lib');

exports.getAllProducts = async (req, res) => {
    try {
        const items = await cartService.findAllProducts(req.user.id);
        res.json(new ResObj({
            text: msgs.CART_LOADED,
            data: items
        }));
    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json(new ResObj({ status: 500, text: msgs.SERVER_ERROR }));
    }
};

exports.addShoppingCartRow = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;
        const userId = req.user.id;

        // Валидация
        if (!productId) {
            return res.status(400).json(new ResObj({
                status: 400,
                text: 'Необходимо указать productId'
            }));
        }

        if (quantity <= 0) {
            return res.status(400).json(new ResObj({
                status: 400,
                text: 'Количество должно быть больше 0'
            }));
        }

        const existingItems = await cartService.findAllProducts(userId);
        const existing = existingItems.find(item => item.productId == productId);

        if (existing) {
            await cartService.updateQuantityRow({
                id: existing.rowId,
                quantity: existing.quantity + quantity
            }, userId);
        } else {
            await cartService.insertRow({ userId, productId, quantity });
        }

        res.json(new ResObj({ text: msgs.CART_ITEM_ADDED }));

    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json(new ResObj({ status: 500, text: msgs.SERVER_ERROR }));
    }
};

exports.changeQuantityShoppingCartRow = async (req, res) => {
    try {
        const rowId = parseInt(req.params.id);
        const { quantity } = req.body;
        const userId = req.user.id;

        // Валидация
        if (isNaN(rowId)) {
            return res.status(400).json(new ResObj({
                status: 400,
                text: 'Некорректный ID'
            }));
        }

        if (typeof quantity !== 'number') {
            return res.status(400).json(new ResObj({
                status: 400,
                text: 'Необходимо указать quantity'
            }));
        }

        if (quantity <= 0) {
            await cartService.deleteRow(rowId, userId);
        } else {
            await cartService.updateQuantityRow({ id: rowId, quantity }, userId);
        }

        res.json(new ResObj({ text: msgs.CART_ITEM_UPDATED }));

    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json(new ResObj({ status: 500, text: msgs.SERVER_ERROR }));
    }
};

exports.removeShoppingCartRow = async (req, res) => {
    try {
        const rowId = parseInt(req.params.id);
        const userId = req.user.id;

        if (isNaN(rowId)) {
            return res.status(400).json(new ResObj({
                status: 400,
                text: 'Некорректный ID'
            }));
        }

        const deleted = await cartService.deleteRow(rowId, userId);

        if (deleted) {
            res.json(new ResObj({ text: msgs.CART_ITEM_REMOVED }));
        } else {
            res.status(404).json(new ResObj({ status: 404, text: 'Товар не найден' }));
        }

    } catch (error) {
        console.error('Ошибка:', error);
        res.status(500).json(new ResObj({ status: 500, text: msgs.SERVER_ERROR }));
    }
};
