class User {
    constructor(obj) {
        if (obj) {
            this.id = obj.id
            this.name = obj.name
            this.email = obj.email
            this.role = obj.role ?? 'клиент'
            this.password = obj.password
        }
    }

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