/**
 * ====================================================================
 * MODEL: ResObj (Стандартизированный ответ)
 * ====================================================================
 * 
 * Этот класс обеспечивает единообразие всех ответов API.
 * Вместо того чтобы вручную формировать JSON каждый раз,
 * мы используем этот класс.
 * 
 * Преимущества:
 * - Единый формат ответов
 * - Автоматическое определение статуса
 * - Легко расширять
 * 
 * ====================================================================
 */

class ResObj {
    /**
     * @param {Object} options
     * @param {number} options.status - HTTP статус код (200, 400, 404, 500)
     * @param {string} options.text - Сообщение
     * @param {any} options.data - Данные
     * @param {Object} options.user - Пользователь
     * @param {boolean} options.isAuth - Статус авторизации
     */
    constructor(options = {}) {
        const statusCode = options.status ?? 200;

        // success для 2xx, error для остальных
        this.status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';
        this.statusCode = statusCode;
        this.message = options.text ?? (this.status === 'success'
            ? 'Операция выполнена успешно'
            : 'Ошибка выполнения операции');

        if (options.data !== undefined) {
            this.data = options.data;
        }

        if (options.user) this.user = options.user;
        if (options.isAuth !== undefined) this.isAuth = options.isAuth;
    }
}

module.exports = ResObj;
