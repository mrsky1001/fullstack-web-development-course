/**
 * Контроллер продуктов
 * 
 * Обрабатывает запросы для:
 * - Получения списка всех продуктов
 * - Получения информации о конкретном продукте
 * 
 * Для каждого запроса учитывает:
 * - Аутентификацию пользователя
 * - Наличие продукта в корзине пользователя
 */

const { findAllProducts, findProduct } = require("../services/product.service") // Сервис для работы с продуктами
const msgs = require("../lib/messages.lib") // Библиотека сообщений
const ResObj = require("../models/resObj.class") // Модель ответа

/**
 * Получение списка всех продуктов
 * 
 * Возвращает список всех продуктов с информацией о наличии в корзине
 * для аутентифицированного пользователя
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * @returns {Object} Список продуктов с дополнительной информацией
 */
exports.getAllProducts = async (req, res) => {
    const user = await req.user
    const userId = user ? user.id : null

    const allProducts = await findAllProducts(userId)

    res.send(new ResObj({
        data: allProducts,
    }))
}

/**
 * Получение информации о конкретном продукте
 * 
 * Возвращает детальную информацию о продукте с учетом
 * его наличия в корзине пользователя
 * 
 * @param {Object} req - Объект запроса Express
 * @param {Object} res - Объект ответа Express
 * 
 * @param {string} req.params.id - ID запрашиваемого продукта
 * @returns {Object} Информация о продукте
 */
exports.getProduct = async (req, res) => {
    const user = await req.user
    const userId = user ? user.id : null
    const productId = req.params.id

    const product = await findProduct(userId, productId)

    res.send(new ResObj({
        data: product,
    }))
}