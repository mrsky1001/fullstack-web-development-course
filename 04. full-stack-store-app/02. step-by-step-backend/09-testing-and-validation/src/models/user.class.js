/**
 * ====================================================================
 * MODEL: User (Пользователь)
 * ====================================================================
 * 
 * Класс для работы с данными пользователя.
 * Преобразует данные из БД в удобный формат.
 * 
 * ====================================================================
 */

class User {
    constructor(obj) {
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.email = obj.email;
            this.role = obj.role ?? 'клиент';
            this.password = obj.password;
        }
    }

    /**
     * Создание из записи БД
     */
    fromDB(row) {
        this.id = row.user_id;
        this.name = row.user_name;
        this.email = row.user_email;
        this.role = row.user_role ?? 'клиент';
        this.password = row.user_password;
        return this;
    }

    /**
     * Безопасный JSON (без пароля!)
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role
            // password НЕ включаем!
        };
    }
}

module.exports = User;
