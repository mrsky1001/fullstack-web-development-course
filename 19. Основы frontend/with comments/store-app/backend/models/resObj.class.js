/**
 * Класс модели ответа сервера
 * 
 * Стандартизированный формат ответа API со следующими полями:
 * - Текст сообщения
 * - HTTP статус
 * - Данные ответа
 * 
 * Используется для унификации формата ответов API
 */
class ResObj {
    /**
     * Создает новый экземпляр ответа сервера
     * @param {Object} [obj] - Объект с данными ответа
     * @param {string} [obj.text] - Текст сообщения (по умолчанию 'SUCCESS')
     * @param {number} [obj.status] - HTTP статус (по умолчанию 200)
     * @param {*} [obj.data] - Данные ответа (по умолчанию null)
     */
    constructor(obj) {
        this.text = obj.text ?? 'SUCCESS'
        this.status = obj.status ?? 200
        this.data = obj.data ?? null
    }
}

module.exports = ResObj