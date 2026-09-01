// ============================================================
// TechParts — Контроллер заказов (MVC — Controller)
// Критерий №19: Оформление заказа (до 6 баллов)
// Критерий №20: Мои заказы (до 5 баллов)
// ============================================================

const db = require('../config/db');

// --- Создать новый заказ ---
// POST /api/orders
// Критерий №19: 2 балла — корректная отработка нажатия «Оформить заказ»
exports.create = async (req, res) => {
  try {
    // Получаем user_id из сессии (авторизованный пользователь)
    const userId = req.session.user_id;
    const { product_id, delivery_date, quantity, total_price, comment } = req.body;

    // Вставка нового заказа в таблицу orders
    const [result] = await db.query(
      `INSERT INTO orders (user_id, product_id, delivery_date, quantity, total_price, comment)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, product_id, delivery_date, quantity, total_price, comment || null]
    );

    // Возвращаем ID созданного заказа
    res.json({
      message: 'Заказ оформлен',
      order_id: result.insertId   // ID новой записи в таблице orders
    });
  } catch (err) {
    console.error('Ошибка создания заказа:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// --- Получить заказы текущего пользователя ---
// GET /api/orders/my
// Критерий №20: 3 балла — корректный вывод информации
exports.getMyOrders = async (req, res) => {
  try {
    // Получаем user_id из сессии
    const userId = req.session.user_id;

    // Запрос заказов с JOIN на таблицу products для получения информации о товарах
    const [orders] = await db.query(
      `SELECT o.*, p.name, p.image, p.price AS unit_price
       FROM orders o
       JOIN products p ON o.product_id = p.id
       WHERE o.user_id = ?
       ORDER BY o.created_at DESC`,
      [userId]
    );

    // Возвращаем массив заказов с информацией о товарах
    res.json(orders);
  } catch (err) {
    console.error('Ошибка получения заказов:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
