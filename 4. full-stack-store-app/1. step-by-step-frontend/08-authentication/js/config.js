/**
 * УРОК 7: ФАЙЛ КОНФИГУРАЦИИ API (Frontend)
 * =========================================
 * 
 * Здесь хранятся глобальные настройки приложения:
 * 1. Адрес API сервера (backend).
 * 2. Список всех URL-адресов (Endpoints) для запросов.
 * 3. Вспомогательная функция `apiRequest` для упрощения fetch-запросов.
 * 
 * КОНЦЕПЦИИ:
 * - Fetch API для HTTP-запросов
 * - async/await для асинхронного кода
 * - Централизованная конфигурация
 * - Обработка ошибок
 */

// Базовый URL сервера. Если frontend и backend на одном компьютере — обычно localhost:3000
const API_BASE_URL = 'http://localhost:3000';

/**
 * Объект со всеми ссылками API.
 * Централизованное хранение позволяет легко менять их в одном месте.
 */
const API_ENDPOINTS = {
    // Товары
    products: {
        all: `${API_BASE_URL}/product/all`,              // GET: Получить все товары
        byId: (id) => `${API_BASE_URL}/product/${id}`    // GET: Получить один товар по ID
    },
    // Авторизация
    auth: {
        register: `${API_BASE_URL}/auth/register`,       // POST: Регистрация
        login: `${API_BASE_URL}/auth/login`,             // POST: Вход
        logout: `${API_BASE_URL}/auth/logout`,           // POST: Выход
        check: `${API_BASE_URL}/auth/check`              // GET: Проверка статуса
    },
    // Корзина
    cart: {
        get: `${API_BASE_URL}/shopping-cart`,                  // GET: Получить корзину
        add: `${API_BASE_URL}/shopping-cart/add`,              // POST: Добавить товар
        remove: (id) => `${API_BASE_URL}/shopping-cart/remove/${id}`, // DELETE: Удалить
        update: (id) => `${API_BASE_URL}/shopping-cart/update/${id}`  // PUT: Обновить кол-во
    }
};

/**
 * Универсальная функция для отправки запросов (fetch wrapper).
 * Автоматически добавляет нужные заголовки и настройки.
 * 
 * @param {string} url - Адрес запроса
 * @param {Object} options - Настройки fetch (method, body, headers...)
 * @returns {Promise<Object>} - Ответ сервера в формате JSON
 * 
 * @example
 * // GET-запрос
 * const products = await apiRequest(API_ENDPOINTS.products.all);
 * 
 * @example
 * // POST-запрос
 * const result = await apiRequest(API_ENDPOINTS.auth.login, {
 *     method: 'POST',
 *     body: JSON.stringify({ email: 'test@test.com', password: '123456' })
 * });
 */
async function apiRequest(url, options = {}) {
    // Настройки по умолчанию
    const defaultOptions = {
        // 'include' означает "всегда отправлять cookies".
        // Это КРИТИЧЕСКИ ВАЖНО для работы сессий (логина)!
        credentials: 'include',

        headers: {
            'Content-Type': 'application/json' // Говорим серверу, что отправляем JSON
        }
    };

    // Объединяем дефолтные настройки с переданными
    // Spread оператор (...) копирует свойства объектов
    const config = { ...defaultOptions, ...options };

    try {
        // Отправляем запрос
        const response = await fetch(url, config);

        // Пытаемся прочитать JSON ответ
        // (даже при ошибках 400/500 сервер часто присылает JSON с описанием ошибки)
        const data = await response.json();

        // Если статус ответа не "успешный" (не 200-299)
        if (!response.ok) {
            // Выбрасываем ошибку, чтобы она попала в блок catch
            throw new Error(data.text || data.message || 'Ошибка API');
        }

        return data; // Возвращаем чистые данные
    } catch (error) {
        console.error('Ошибка запроса API:', error);
        throw error; // Пробрасываем ошибку дальше
    }
}

// Делаем API доступным везде через глобальный объект window
window.API = {
    endpoints: API_ENDPOINTS,
    request: apiRequest
};

/**
 * Функция для правильного построения путей к страницам.
 * Нужна для корректной работы при вложенных папках.
 */
function getPagePath(page) {
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    if (isInPagesFolder) {
        return `./${page}`;
    } else {
        return `./pages/${page}`;
    }
}

window.getPagePath = getPagePath;

/*
 * КАК ЭТО РАБОТАЕТ:
 * 
 * 1. Все URL хранятся в одном месте (API_ENDPOINTS)
 * 2. Функция apiRequest() обрабатывает все нюансы fetch:
 *    - Добавляет заголовки
 *    - Отправляет cookies
 *    - Парсит JSON
 *    - Обрабатывает ошибки
 * 3. Объект API доступен глобально: API.request(), API.endpoints
 * 
 * ИСПОЛЬЗОВАНИЕ:
 * // Получить все товары
 * const products = await API.request(API.endpoints.products.all);
 * 
 * // Отправить POST-запрос
 * await API.request(API.endpoints.auth.login, {
 *     method: 'POST',
 *     body: JSON.stringify({ email, password })
 * });
 */
