/**
 * Контроллер корзины покупок
 * 
 * Обрабатывает запросы для:
 * - Получения содержимого корзины
 * - Добавления товаров в корзину
 * - Изменения количества товаров
 * - Удаления товаров из корзины
 * 
 * Все операции требуют аутентификации пользователя
 */

const { findAllProducts, insertRow, updateQuantityRow, deleteRow } = require('../services/shopping-cart.service') // Сервис корзины
const ShoppingCartRow = require("../models/shoppingCartRow.class") // Модель строки корзины
const ResObj = require("../models/resObj.class") // Модель ответа
const msgs = require("../lib/messages.lib") // Библиотека сообщений

/**
 * Получение содержимого корзины пользователя
 * 
 * Возвращает список всех товаров в корзине с полной информацией о продуктах
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * @returns {Object} Список товаров в корзине с детальной информацией
 */
exports.getAllProducts = async (req, res) => {
    try {
        const user = await req.user
        const rows = await findAllProducts(user.id)

        res.send(new ResObj({
            text: msgs.SUCCESS_OPERATION,
            data: rows,
        }))
    } catch (err) {
        res.send(new ResObj({
            text: msgs.ERROR_OPERATION + err,
            status: 500,
        }))
    }
}

/**
 * Добавление товара в корзину
 * 
 * Создает новую запись в корзине для указанного товара
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * @param {Object} req.body - Данные запроса
 * @param {number} req.body.productId - ID добавляемого товара
 * @param {number} req.body.quantity - Количество товара
 */
exports.addShoppingCartRow = async (req, res) => {
    const rawData = req.body
    const user = await req.user

    // console.log('--------------------------start------------------')
    // console.log('user')
    // console.log(user)
    // console.log(rawData)

    const shoppingCartRow = new ShoppingCartRow({
        userId: user.id,
        productId: rawData.productId,
        quantity: rawData.quantity,
    })

    // console.log(shoppingCartRow)
    // console.log('--------------------------end------------------')

    await insertRow(shoppingCartRow)

    res.send(new ResObj({
        text: msgs.SUCCESS_OPERATION,
    }))
}

/**
 * Изменение количества товара в корзине
 * 
 * Обновляет количество товара в корзине.
 * Если количество <= 0, товар удаляется из корзины
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * @param {Object} req.body - Данные запроса
 * @param {number} req.body.id - ID строки корзины
 * @param {number} req.body.quantity - Новое количество товара
 */
exports.changeQuantityShoppingCartRow = async (req, res) => {
    const rawData = req.body
    const shoppingCartRow = new ShoppingCartRow(rawData)


    if (shoppingCartRow.quantity <= 0) {
        req.params.id = shoppingCartRow.id
        await this.removeShoppingCartRow(req, res)
    } else {
        await updateQuantityRow(shoppingCartRow)

        res.send(new ResObj({
            text: msgs.SUCCESS_OPERATION,
        }))
    }
}

/**
 * Удаление товара из корзины
 * 
 * Удаляет указанный товар из корзины пользователя
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * @param {string} req.params.id - ID строки корзины для удаления
 */
exports.removeShoppingCartRow = async (req, res) => {
    const rowId = req.params.id

    console.log('--------------------------start------------------')
    console.log('rowId')
    console.log(rowId)
    console.log('--------------------------end------------------')

    await deleteRow(rowId)

    res.send(new ResObj({
        text: msgs.SUCCESS_OPERATION,
    }))
}