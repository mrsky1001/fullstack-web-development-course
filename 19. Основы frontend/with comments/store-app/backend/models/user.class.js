/**
 * Класс модели пользователя
 * 
 * Представляет пользователя системы с его основными характеристиками:
 * - Идентификатор
 * - Имя
 * - Email
 * - Роль (по умолчанию 'клиент')
 * - Пароль
 */
class User {
    /**
     * Создает новый экземпляр пользователя
     * @param {Object} [obj] - Объект с данными пользователя
     * @param {number} [obj.id] - ID пользователя
     * @param {string} [obj.name] - Имя пользователя
     * @param {string} [obj.email] - Email пользователя
     * @param {string} [obj.role] - Роль пользователя (по умолчанию 'клиент')
     * @param {string} [obj.password] - Пароль пользователя
     */
    constructor(obj) {
        if (obj) {
            this.id = obj.id
            this.name = obj.name
            this.email = obj.email
            this.role = obj.role ?? 'клиент'
            this.password = obj.password
        }
    }

    /**
     * Преобразует данные из базы данных в объект пользователя
     * @param {Object} obj - Объект с данными из БД
     * @param {number} obj.user_id - ID пользователя
     * @param {string} obj.user_name - Имя пользователя
     * @param {string} obj.user_email - Email пользователя
     * @param {string} [obj.user_role] - Роль пользователя
     * @param {string} obj.user_password - Пароль пользователя
     * @returns {User} Текущий экземпляр пользователя
     */
    fromDB(obj) {
        this.id = obj.user_id
        this.name = obj.user_name
        this.email = obj.user_email
        this.role = obj.user_role ?? 'клиент'
        this.password = obj.user_password

        return this
    }
}

module.exports = User