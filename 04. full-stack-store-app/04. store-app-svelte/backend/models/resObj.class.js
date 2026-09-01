class ResObj {
    constructor(obj) {
        this.text = obj.text ?? 'SUCCESS'
        this.status = obj.status ?? 200
        this.data = obj.data ?? null
    }
}

module.exports = ResObj