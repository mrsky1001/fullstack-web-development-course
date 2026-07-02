// ============================================================
// TechParts — Контроллер товаров (MVC — Controller)
// Критерий №18: Каталог — динамический вывод карточек из БД
// ============================================================

const db = require('../config/db');

// --- Получить все товары ---
// GET /api/products
// Критерий №18: 1 балл — динамический вывод карточек из БД
exports.getAll = async (req, res) => {
  try {
    // Запрос всех товаров из таблицы products
    const [products] = await db.query('SELECT * FROM products ORDER BY id');
    // Возвращаем массив товаров в формате JSON
    res.json(products);
  } catch (err) {
    console.error('Ошибка получения товаров:', err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};
