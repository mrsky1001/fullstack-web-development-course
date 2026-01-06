/**
 * MODEL: ResObj (Объект ответа сервера)
 * 
 * Этот класс служит для стандартизации ответов API.
 * Вместо того чтобы каждый раз вручную формировать объект { status: 'ok', data: ... },
 * мы используем этот класс.
 * 
 * Пример ответа:
 * {
 *   status: 'success',
 *   statusCode: 200,
 *   message: 'Товар добавлен',
 *   data: { ... }
 * }
 */
class ResObj {
    /**
     * @param {Object} obj - Параметры ответа
     * @param {number} obj.status - HTTP статус код (200, 400, 404, 500...)
     * @param {string} obj.text - Текстовое сообщение
     * @param {any} obj.data - Данные для отправки
     * @param {string} obj.dataField - (Опционально) Имя поля, в которое положить данные (вместо 'data')
     * @param {Object} obj.user - (Опционально) Данные пользователя
     * @param {boolean} obj.isAuth - (Опционально) Статус авторизации
     */
    constructor(obj = {}) {
        // 1. Определяем HTTP статус (по умолчанию 200 OK)
        const statusCode = obj.status ?? 200;

        // 2. Вычисляем статус 'success' или 'error' на основе кода
        // Коды 200-299 считаются успешными.
        this.status = statusCode >= 200 && statusCode < 300 ? 'success' : 'error';

        // Сохраняем код для отладки
        this.statusCode = statusCode;

        // 3. Формируем сообщение
        this.message = obj.text ?? (this.status === 'success' ? 'Операция выполнена успешно' : 'Ошибка выполнения операции');

        // 4. Обрабатываем данные (payload)
        if (obj.data !== undefined && obj.data !== null) {
            // Если указано конкретное имя поля (например, products), используем его
            if (obj.dataField) {
                this[obj.dataField] = obj.data;
            } else {
                // Иначе кладем всё в поле 'data'
                this.data = obj.data;
            }
        }

        // 5. Добавляем мета-данные (если есть)
        if (obj.user) this.user = obj.user;
        if (obj.isAuth !== undefined) this.isAuth = obj.isAuth;
    }
}

module.exports = ResObj;