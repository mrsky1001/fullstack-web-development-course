/**
 * УРОК 8: МОДУЛЬ АВТОРИЗАЦИИ (Frontend)
 * =========================================
 * 
 * Отвечает за:
 * 1. Проверку авторизации (Check Auth).
 * 2. Вход (Login).
 * 3. Регистрацию (Register).
 * 4. Выход (Logout).
 * 5. Обновление интерфейса (показать "Войти" или "Имя пользователя").
 * 
 * КОНЦЕПЦИИ:
 * - Модульная организация кода
 * - Работа с сессиями через cookies
 * - Обновление UI в зависимости от состояния
 */

const Auth = {
    // Храним текущее состояние авторизации
    currentUser: null,
    isAuthenticated: false,

    /**
     * Проверка: авторизован ли пользователь?
     * Делает запрос на сервер при каждой загрузке страницы.
     */
    async checkAuth() {
        try {
            console.log('🔄 Проверка авторизации...');
            const response = await API.request(API.endpoints.auth.check);
            console.log('Результат проверки:', response);

            if (response.status === 'success' && response.isAuth) {
                // Если сервер подтвердил авторизацию
                this.currentUser = response.user;
                this.isAuthenticated = true;
                this.updateUI();
                return true;
            }
        } catch (error) {
            console.error('Ошибка проверки авторизации:', error);
        }

        // Если проверка не прошла
        this.isAuthenticated = false;
        this.currentUser = null;
        this.updateUI();
        return false;
    },

    /**
     * Вход в систему.
     * @param {string} email - Email пользователя
     * @param {string} password - Пароль
     * @returns {Object} - Результат: { success: true/false, error: 'текст ошибки' }
     */
    async login(email, password) {
        try {
            const response = await API.request(API.endpoints.auth.login, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (response.status === 'success') {
                // После успешного входа обновляем статус
                await this.checkAuth();
                return { success: true };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Ошибка входа' };
    },

    /**
     * Регистрация нового аккаунта.
     * @param {string} email - Email
     * @param {string} password - Пароль
     * @param {string} name - Имя пользователя
     */
    async register(email, password, name) {
        try {
            const response = await API.request(API.endpoints.auth.register, {
                method: 'POST',
                body: JSON.stringify({ email, password, name })
            });

            if (response.status === 'success') {
                return { success: true };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Ошибка регистрации' };
    },

    /**
     * Выход из системы.
     */
    async logout() {
        try {
            await API.request(API.endpoints.auth.logout, {
                method: 'POST'
            });
            Toast.success('Вы успешно вышли');
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } finally {
            // Очищаем состояние на клиенте
            this.currentUser = null;
            this.isAuthenticated = false;
            this.updateUI();

            // Редирект на главную страницу
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            setTimeout(() => {
                window.location.href = isInPagesFolder ? '../index.html' : './index.html';
            }, 800);
        }
    },

    /**
     * Обновление интерфейса (кнопки в шапке).
     * Если вошли — показываем имя и кнопку "Выход".
     * Если нет — кнопку "Войти".
     */
    updateUI() {
        const authLink = document.getElementById('auth-link');
        if (!authLink) return;

        if (this.isAuthenticated && this.currentUser) {
            // Отображаем имя пользователя
            const displayName = this.currentUser.name || this.currentUser.email || 'Пользователь';
            authLink.innerHTML = `👤 ${displayName} <span style="font-size: 0.8em; opacity: 0.7">(Выйти)</span>`;
            authLink.href = '#';

            // Вешаем обработчик клика для выхода
            authLink.onclick = (e) => {
                e.preventDefault();
                if (confirm('Вы действительно хотите выйти из аккаунта?')) {
                    this.logout();
                }
            };
        } else {
            // Возвращаем кнопку "Войти"
            authLink.textContent = 'Войти';
            authLink.href = getPagePath('login.html');
            authLink.onclick = null;
        }
    }
};

// Запускаем проверку авторизации сразу при загрузке любой страницы
document.addEventListener('DOMContentLoaded', () => {
    Auth.checkAuth();
});

// Экспортируем модуль глобально
window.Auth = Auth;

/*
 * КАК ЭТО РАБОТАЕТ:
 * 
 * 1. При загрузке страницы вызывается Auth.checkAuth()
 * 2. Отправляется запрос на /auth/check
 * 3. Сервер проверяет cookie сессии
 * 4. Если сессия валидна — возвращает данные пользователя
 * 5. updateUI() обновляет интерфейс (ссылку "Войти" / "Имя пользователя")
 * 
 * ВАЖНО:
 * - credentials: 'include' в fetch() обязателен для работы cookies
 * - Сессии хранятся на сервере, а не в браузере
 * - Cookie с ID сессии автоматически отправляется с каждым запросом
 */
