/**
 * ФАЙЛ КОНФИГУРАЦИИ (Frontend) - MOCK ВЕРСИЯ
 * 
 * ⚠️ ЭТО ВЕРСИЯ ДЛЯ РАБОТЫ БЕЗ БЭКЕНДА!
 * 
 * Вместо реальных HTTP-запросов используется MockAPI,
 * который хранит данные в localStorage браузера.
 * 
 * Содержит:
 * 1. Идентификаторы endpoints (для совместимости с оригинальным кодом).
 * 2. Функция `apiRequest` перенаправляет вызовы на MockAPI.
 * 3. Экспорт объекта API в глобальную область видимости (window).
 */

// Заглушка URL (не используется, но оставлена для совместимости)
const API_BASE_URL = 'mock://localhost';

// Идентификаторы endpoints (используются для маршрутизации в apiRequest)
const API_ENDPOINTS = {
    // Товары
    products: {
        all: 'mock://products/all',
        byId: (id) => `mock://products/${id}`
    },
    // Авторизация
    auth: {
        register: 'mock://auth/register',
        login: 'mock://auth/login',
        logout: 'mock://auth/logout',
        check: 'mock://auth/check'
    },
    // Корзина
    cart: {
        get: 'mock://cart/get',
        add: 'mock://cart/add',
        remove: (id) => `mock://cart/remove/${id}`,
        update: (id) => `mock://cart/update/${id}`
    }
};

/**
 * Mock-версия функции для отправки запросов.
 * Вместо реальных HTTP-запросов вызывает методы MockAPI.
 * 
 * @param {string} url - Идентификатор endpoint'а
 * @param {Object} options - Настройки (метод, body)
 * @returns {Promise<Object>} - Ответ MockAPI
 */
async function apiRequest(url, options = {}) {
    try {
        // Парсим body если оно есть
        let body = null;
        if (options.body) {
            body = JSON.parse(options.body);
        }

        // Маршрутизация на основе URL
        // ============================================

        // ТОВАРЫ
        if (url === API_ENDPOINTS.products.all) {
            return await MockAPI.products.getAll();
        }

        if (url.startsWith('mock://products/') && url !== 'mock://products/all') {
            const id = parseInt(url.split('/').pop());
            return await MockAPI.products.getById(id);
        }

        // АВТОРИЗАЦИЯ
        if (url === API_ENDPOINTS.auth.register) {
            return await MockAPI.auth.register(body.email, body.password, body.name);
        }

        if (url === API_ENDPOINTS.auth.login) {
            return await MockAPI.auth.login(body.email, body.password);
        }

        if (url === API_ENDPOINTS.auth.logout) {
            return await MockAPI.auth.logout();
        }

        if (url === API_ENDPOINTS.auth.check) {
            return await MockAPI.auth.check();
        }

        // КОРЗИНА
        if (url === API_ENDPOINTS.cart.get) {
            return await MockAPI.cart.get();
        }

        if (url === API_ENDPOINTS.cart.add) {
            return await MockAPI.cart.add(body.productId, body.quantity || 1);
        }

        if (url.startsWith('mock://cart/remove/')) {
            const rowId = parseInt(url.split('/').pop());
            return await MockAPI.cart.remove(rowId);
        }

        if (url.startsWith('mock://cart/update/')) {
            const rowId = parseInt(url.split('/').pop());
            return await MockAPI.cart.update(rowId, body.quantity);
        }

        // Если endpoint не найден
        throw new Error(`Неизвестный endpoint: ${url}`);

    } catch (error) {
        console.error('Ошибка Mock API:', error);
        throw error;
    }
}

// Делаем API доступным везде через глобальный объект window
window.API = {
    endpoints: API_ENDPOINTS,
    request: apiRequest
};

// Функция для правильного построения путей к страницам
function getPagePath(page) {
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    if (isInPagesFolder) {
        return `./${page}`;
    } else {
        return `./pages/${page}`;
    }
}

window.getPagePath = getPagePath;

// Информация для разработчика
console.log('⚠️ Frontend работает в MOCK-режиме (без бэкенда)');
console.log('📦 Данные хранятся в localStorage браузера');

