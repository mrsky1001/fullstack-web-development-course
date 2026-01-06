/**
 * MODEL: User (Пользователь)
 * 
 * Представляет пользователя системы.
 * Используется для работы с данными пользователя после авторизации.
 */
class User {
    /**
     * Конструктор
     * @param {Object} obj - Объект с данными пользователя
     */
    constructor(obj) {
        if (obj) {
            this.id = obj.id;                // Уникальный ID пользователя
            this.name = obj.name;            // Имя
            this.email = obj.email;          // Email (используется как логин)
            this.role = obj.role ?? 'клиент';// Роль (админ / клиент). По умолчанию - клиент.
            this.password = obj.password;    // Хэш пароля (никогда не возвращаем на клиент!)
        }
    }

    /**
     * Конвертация из формата БД
     * @param {Object} obj - Строка из таблицы users
     */
    fromDB(obj) {
        this.id = obj.user_id;
        this.name = obj.user_name;
        this.email = obj.user_email;
        this.role = obj.user_role ?? 'клиент';
        this.password = obj.user_password;

        return this;
    }
}

module.exports = User;