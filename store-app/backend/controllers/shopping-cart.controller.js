/**
 * CONTROLLER: ShoppingCart (Контроллер Корзины)
 * 
 * Управляет логикой работы с корзиной.
 * Основные операции: получение, добавление, обновление количества, удаление.
 */

const { findAllProducts, insertRow, updateQuantityRow, deleteRow } = require('../services/shopping-cart.service');
const ShoppingCartRow = require("../models/shoppingCartRow.class");
const ResObj = require("../models/resObj.class");
const msgs = require("../lib/messages.lib");

/**
 * Получить все товары в корзине пользователя.
 */
exports.getAllProducts = async (req, res) => {
    try {
        const user = req.user; // Пользователь из сессии (гарантировано middleware isAuthenticated)

        // Получаем список товаров из сервиса
        const rows = await findAllProducts(user.id);

        res.json(new ResObj({
            text: msgs.SUCCESS_OPERATION,
            data: rows
        }));
    } catch (err) {
        console.error("Ошибка при получении корзины:", err);
        res.status(500).json(new ResObj({
            text: msgs.ERROR_OPERATION,
            status: 500
        }));
    }
};

/**
 * Добавить товар в корзину.
 * Еcли товар уже есть - увеличивает количество.
 */
exports.addShoppingCartRow = async (req, res) => {
    try {
        const rawData = req.body; // { productId, quantity }
        const user = req.user;

        // 1. Проверяем, есть ли уже этот товар в корзине?
        // Получаем текущую корзину
        const existingItems = await findAllProducts(user.id);

        // Ищем совпадение по ID товара (productId)
        const existingItem = existingItems.find(item => item.productId == rawData.productId);

        if (existingItem) {
            // ВАРИАНТ А: Товар уже есть -> обновляем количество
            // Новое количество = старое + то, что добавляем
            const updatedRow = new ShoppingCartRow({
                id: existingItem.rowId, // ID записи в корзине
                quantity: existingItem.quantity + (rawData.quantity || 1)
            });

            await updateQuantityRow(updatedRow);

        } else {
            // ВАРИАНТ Б: Товара нет -> создаем новую запись
            const shoppingCartRow = new ShoppingCartRow({
                userId: user.id,
                productId: rawData.productId,
                quantity: rawData.quantity || 1,
            });

            await insertRow(shoppingCartRow);
        }

        res.json(new ResObj({
            text: msgs.SUCCESS_OPERATION
        }));

    } catch (err) {
        console.error('Ошибка добавления в корзину:', err);
        res.status(500).json(new ResObj({
            text: msgs.ERROR_OPERATION,
            status: 500
        }));
    }
};

/**
 * Изменить количество товара.
 */
exports.changeQuantityShoppingCartRow = async (req, res) => {
    try {
        const rowId = req.params.id; // ID записи корзины из URL
        const rawData = req.body;    // { quantity: ... }
        const newQuantity = rawData.quantity;

        if (newQuantity <= 0) {
            // Если количество <= 0, то удаляем товар из корзины совсем
            await deleteRow(rowId);
        } else {
            // Иначе обновляем значение
            const shoppingCartRow = new ShoppingCartRow({
                id: rowId,
                quantity: newQuantity
            });

            await updateQuantityRow(shoppingCartRow);
        }

        res.json(new ResObj({
            text: msgs.SUCCESS_OPERATION,
        }));
    } catch (err) {
        console.error('Ошибка обновления количества:', err);
        res.status(500).json(new ResObj({
            text: msgs.ERROR_OPERATION,
            status: 500
        }));
    }
};

/**
 * Удалить товар из корзины полностью.
 */
exports.removeShoppingCartRow = async (req, res) => {
    try {
        const rowId = req.params.id; // ID записи корзины

        await deleteRow(rowId);

        res.json(new ResObj({
            text: msgs.SUCCESS_OPERATION,
        }));
    } catch (err) {
        console.error('Ошибка удаления из корзины:', err);
        res.status(500).json(new ResObj({
            text: msgs.ERROR_OPERATION,
            status: 500
        }));
    }
};