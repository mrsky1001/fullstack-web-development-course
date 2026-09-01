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

    /**
     * Преобразование в JSON для отправки клиенту.
     * ВАЖНО: Пароль (даже хэш) НИКОГДА не отправляется клиенту!
     * Это защита от утечки данных.
     * 
     * Метод toJSON() автоматически вызывается при JSON.stringify() и res.json().
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role
            // password НЕ включен - это критически важно для безопасности!
        };
    }
}

module.exports = User;