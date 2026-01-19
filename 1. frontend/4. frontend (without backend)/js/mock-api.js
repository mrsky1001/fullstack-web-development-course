/**
 * MOCK API (Заглушка для работы без бэкенда)
 * 
 * Этот файл заменяет реальные API-запросы на работу с localStorage.
 * Позволяет демонстрировать функциональность frontend без сервера.
 * 
 * Реализует:
 * 1. Работу с товарами (из mock-data.js)
 * 2. Авторизацию через localStorage
 * 3. Корзину через localStorage
 */

// ============================================
// КЛЮЧИ ДЛЯ localStorage
// ============================================
const STORAGE_KEYS = {
    USERS: 'techparts_users',           // Список зарегистрированных пользователей
    CURRENT_USER: 'techparts_current_user', // Текущий авторизованный пользователь
    CART: 'techparts_cart'              // Корзина (привязана к пользователю)
};

// ============================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================

/**
 * Получить данные из localStorage
 */
function getFromStorage(key, defaultValue = null) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        console.error('Ошибка чтения из localStorage:', e);
        return defaultValue;
    }
}

/**
 * Сохранить данные в localStorage
 */
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Ошибка записи в localStorage:', e);
        return false;
    }
}

/**
 * Получить ключ корзины для текущего пользователя
 */
function getCartKey() {
    const user = getFromStorage(STORAGE_KEYS.CURRENT_USER);
    if (!user) return null;
    return `${STORAGE_KEYS.CART}_${user.email}`;
}

/**
 * Имитация задержки сети (для реалистичности)
 */
function delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// MOCK API ENDPOINTS
// ============================================

const MockAPI = {
    // ------------------------------------------
    // ТОВАРЫ
    // ------------------------------------------
    products: {
        /**
         * Получить все товары
         */
        async getAll() {
            await delay(200);
            return {
                status: 'success',
                data: window.MOCK_PRODUCTS || []
            };
        },

        /**
         * Получить товар по ID
         */
        async getById(id) {
            await delay(100);
            const product = (window.MOCK_PRODUCTS || []).find(p => p.id === id);
            if (!product) {
                throw new Error('Товар не найден');
            }
            return {
                status: 'success',
                data: product
            };
        }
    },

    // ------------------------------------------
    // АВТОРИЗАЦИЯ
    // ------------------------------------------
    auth: {
        /**
         * Регистрация нового пользователя
         */
        async register(email, password, name) {
            await delay(300);

            // Получаем список пользователей
            const users = getFromStorage(STORAGE_KEYS.USERS, []);

            // Проверяем, не занят ли email
            if (users.find(u => u.email === email)) {
                throw new Error('Пользователь с таким email уже существует');
            }

            // Создаем нового пользователя
            const newUser = {
                id: Date.now(),
                email,
                password, // В реальном приложении пароль хэшируется на сервере!
                name,
                createdAt: new Date().toISOString()
            };

            // Сохраняем
            users.push(newUser);
            saveToStorage(STORAGE_KEYS.USERS, users);

            console.log('📝 Зарегистрирован новый пользователь:', email);

            return {
                status: 'success',
                message: 'Регистрация успешна'
            };
        },

        /**
         * Вход в систему
         */
        async login(email, password) {
            await delay(300);

            const users = getFromStorage(STORAGE_KEYS.USERS, []);
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Неверный email или пароль');
            }

            // Сохраняем текущего пользователя (без пароля)
            const userSession = {
                id: user.id,
                email: user.email,
                name: user.name
            };
            saveToStorage(STORAGE_KEYS.CURRENT_USER, userSession);

            console.log('✅ Вход выполнен:', email);

            return {
                status: 'success',
                message: 'Вход выполнен'
            };
        },

        /**
         * Выход из системы
         */
        async logout() {
            await delay(100);
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
            console.log('👋 Выход из системы');
            return {
                status: 'success',
                message: 'Выход выполнен'
            };
        },

        /**
         * Проверка авторизации
         */
        async check() {
            await delay(100);
            const user = getFromStorage(STORAGE_KEYS.CURRENT_USER);

            if (user) {
                return {
                    status: 'success',
                    isAuth: true,
                    user: user
                };
            }

            return {
                status: 'success',
                isAuth: false,
                user: null
            };
        }
    },

    // ------------------------------------------
    // КОРЗИНА
    // ------------------------------------------
    cart: {
        /**
         * Получить содержимое корзины
         */
        async get() {
            await delay(150);

            const cartKey = getCartKey();
            if (!cartKey) {
                throw new Error('Требуется авторизация');
            }

            const cartItems = getFromStorage(cartKey, []);

            // Добавляем информацию о товарах к записям корзины
            const enrichedCart = cartItems.map(item => {
                const product = (window.MOCK_PRODUCTS || []).find(p => p.id === item.productId);
                return {
                    rowId: item.rowId,
                    productId: item.productId,
                    quantity: item.quantity,
                    name: product?.name || 'Неизвестный товар',
                    price: product?.price || 0,
                    category: product?.category || '',
                    img: product?.img || ''
                };
            });

            return {
                status: 'success',
                data: enrichedCart
            };
        },

        /**
         * Добавить товар в корзину
         */
        async add(productId, quantity = 1) {
            await delay(200);

            const cartKey = getCartKey();
            if (!cartKey) {
                throw new Error('Требуется авторизация');
            }

            // Проверяем, существует ли товар
            const product = (window.MOCK_PRODUCTS || []).find(p => p.id === productId);
            if (!product) {
                throw new Error('Товар не найден');
            }

            const cart = getFromStorage(cartKey, []);

            // Ищем, есть ли уже такой товар в корзине
            const existingItem = cart.find(item => item.productId === productId);

            if (existingItem) {
                // Увеличиваем количество
                existingItem.quantity += quantity;
            } else {
                // Добавляем новый товар
                cart.push({
                    rowId: Date.now(), // Уникальный ID записи в корзине
                    productId,
                    quantity
                });
            }

            saveToStorage(cartKey, cart);
            console.log('🛒 Добавлен в корзину:', product.name);

            return {
                status: 'success',
                message: 'Товар добавлен в корзину'
            };
        },

        /**
         * Обновить количество товара
         */
        async update(rowId, quantity) {
            await delay(150);

            const cartKey = getCartKey();
            if (!cartKey) {
                throw new Error('Требуется авторизация');
            }

            const cart = getFromStorage(cartKey, []);
            const itemIndex = cart.findIndex(item => item.rowId === rowId);

            if (itemIndex === -1) {
                throw new Error('Товар не найден в корзине');
            }

            if (quantity <= 0) {
                // Удаляем товар, если количество <= 0
                cart.splice(itemIndex, 1);
            } else {
                cart[itemIndex].quantity = quantity;
            }

            saveToStorage(cartKey, cart);

            return {
                status: 'success',
                message: 'Количество обновлено'
            };
        },

        /**
         * Удалить товар из корзины
         */
        async remove(rowId) {
            await delay(150);

            const cartKey = getCartKey();
            if (!cartKey) {
                throw new Error('Требуется авторизация');
            }

            const cart = getFromStorage(cartKey, []);
            const newCart = cart.filter(item => item.rowId !== rowId);

            saveToStorage(cartKey, newCart);
            console.log('🗑️ Удален из корзины, rowId:', rowId);

            return {
                status: 'success',
                message: 'Товар удален из корзины'
            };
        }
    }
};

// Экспортируем в глобальную область видимости
window.MockAPI = MockAPI;

console.log('🔧 Mock API загружен. Frontend работает без бэкенда.');
