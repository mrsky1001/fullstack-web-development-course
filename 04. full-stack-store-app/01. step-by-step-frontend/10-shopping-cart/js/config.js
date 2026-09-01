/**
 * ФАЙЛ КОНФИГУРАЦИИ (Frontend)
 * 
 * Здесь хранятся глобальные настройки приложения:
 * 1. Адрес API сервера (backend).
 * 2. Список всех URL-адресов (Endpoints) для запросов.
 * 3. Вспомогательная функция `apiRequest` для упрощения fetch-запросов.
 * 4. Экспорт объекта API в глобальную область видимости (window).
 */

// Базовый URL сервера. Если frontend и backend на одном компьютере - обычно localhost:3000
const API_BASE_URL = 'http://localhost:3000';

// Объект со всеми ссылками API.
// Централизованное хранение ссылок позволяет легко менять их в одном месте.
const API_ENDPOINTS = {
    // Товары
    products: {
        all: `${API_BASE_URL}/product/all`,            // Получить все товары
        byId: (id) => `${API_BASE_URL}/product/${id}`  // Получить один товар (функция принимает ID)
    },
    // Авторизация
    auth: {
        register: `${API_BASE_URL}/auth/register`,     // Регистрация
        login: `${API_BASE_URL}/auth/login`,           // Вход
        logout: `${API_BASE_URL}/auth/logout`,         // Выход
        check: `${API_BASE_URL}/auth/check`            // Проверка статуса (кто залогинен?)
    },
    // Корзина
    cart: {
        get: `${API_BASE_URL}/shopping-cart`,              // Получить корзину
        add: `${API_BASE_URL}/shopping-cart/add`,          // Добавить товар
        remove: (id) => `${API_BASE_URL}/shopping-cart/remove/${id}`, // Удалить (принимает ID записи!)
        update: (id) => `${API_BASE_URL}/shopping-cart/update/${id}`  // Обновить кол-во (принимает ID записи!)
    }
};

/**
 * Универсальная функция для отправки запросов (fetch wrapper).
 * Автоматически добавляет нужные заголовки и настройки.
 * 
 * @param {string} url - Адрес запроса
 * @param {Object} options - Настройки fetch (метод, body, headers...)
 * @returns {Promise<Object>} - Ответ сервера в формате JSON
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
        throw error; // Пробрасываем ошибку дальше, чтобы её мог обработать вызывающий код
    }
}

// Делаем API доступным везде через глобальный объект window
window.API = {
    endpoints: API_ENDPOINTS,
    request: apiRequest
};

// Функция для правильного построения путей к страницам (фикс для GitHub Pages / вложенных папок)
function getPagePath(page) {
    // Проверяем, где мы сейчас находимся
    const isInPagesFolder = window.location.pathname.includes('/pages/');

    if (isInPagesFolder) {
        // Если мы уже внутри /pages/, то путь к другой странице - просто имя файла
        return `./${page}`;
    } else {
        // Если мы в корне (index.html), то нужно зайти в /pages/
        return `./pages/${page}`;
    }
}

window.getPagePath = getPagePath;
