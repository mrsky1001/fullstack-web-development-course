// ============================================================
// TechParts — Динамическое навигационное меню (navigation.js)
// Критерий №13: Навигационное меню (до 4 баллов)
// 1 балл — тег nav (в HTML)
// 1 балл — меню для неавторизованных
// 1 балл — меню для авторизованных
// 1 балл — корректное отображение для обоих состояний
// ============================================================

// Адрес API сервера
const API_URL = 'http://localhost:3000/api';

// --- Проверка статуса авторизации при загрузке каждой страницы ---
// Выполняется JavaScript-запрос к серверу
async function updateNavigation() {
  try {
    // Запрос к серверу: GET /api/auth/check
    const response = await fetch(API_URL + '/auth/check', {
      credentials: 'include' // Отправляем cookies (сессию) с запросом
    });
    const data = await response.json();

    // Получаем контейнер навигационного меню
    const navMenu = document.getElementById('nav-menu');

    if (data.authorized) {
      // --- Меню для АВТОРИЗОВАННЫХ пользователей ---
      // 4 элемента: Главная, Каталог, Корзина (мои заказы), Выйти
      navMenu.innerHTML = `
        <a href="index.html">Главная</a>
        <a href="catalog.html">Каталог</a>
        <a href="my-orders.html">Мои заказы</a>
        <button class="nav-btn logout" onclick="logout()">Выйти</button>
      `;
    } else {
      // --- Меню для НЕАВТОРИЗОВАННЫХ посетителей ---
      // 3 элемента: Главная, Каталог, Войти
      navMenu.innerHTML = `
        <a href="index.html">Главная</a>
        <a href="catalog.html">Каталог</a>
        <a href="login.html" class="nav-btn">Войти</a>
      `;
    }
  } catch (err) {
    console.error('Ошибка проверки авторизации:', err);
  }
}

// --- Выход из системы ---
// Критерий №13: кнопка «Выйти» — завершение сессии
async function logout() {
  try {
    // Запрос к серверу: POST /api/auth/logout
    await fetch(API_URL + '/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    // Перенаправляем на главную страницу
    window.location.href = 'index.html';
  } catch (err) {
    console.error('Ошибка выхода:', err);
  }
}

// Вызываем обновление навигации при загрузке страницы
updateNavigation();
