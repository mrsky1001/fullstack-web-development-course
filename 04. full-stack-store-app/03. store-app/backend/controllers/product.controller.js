/**
 * CONTROLLER: Product (Контроллер Товаров)
 * 
 * Обрабатывает запросы, связанные с товарами.
 * Обращается к сервису ProductService для получения данных.
 */

const { findAllProducts, findProduct } = require("../services/product.service");
const ResObj = require("../models/resObj.class");

const msgs = require("../lib/messages.lib");

/**
 * Получение списка всех товаров.
 * Если пользователь авторизован, мы также проверяем, какие товары уже есть у него в корзине.
 */
exports.getAllProducts = async (req, res) => {
    // Получаем текущего пользователя из сессии (если он есть)
    // req.user добавляется библиотекой passport
    const user = req.user;
    const userId = user ? user.id : null;

    // Запрашиваем данные у сервиса
    const allProducts = await findAllProducts(userId);

    // Отправляем ответ
    res.json(new ResObj({
        data: allProducts,
        text: msgs.PRODUCTS_LOADED
    }));
};

/**
 * Получение данных одного товара.
 */
exports.getProduct = async (req, res) => {
    const user = req.user;
    const userId = user ? user.id : null;

    // Получаем ID товара из URL (например, /products/5 -> id=5)
    const productId = req.params.id;

    const product = await findProduct(userId, productId);

    if (product) {
        res.json(new ResObj({
            data: product,
            text: msgs.PRODUCT_FOUND
        }));
    } else {
        // Если товар не найден - возвращаем 404
        res.status(404).json(new ResObj({
            status: 404,
            text: msgs.PRODUCT_NOT_FOUND
        }));
    }
};