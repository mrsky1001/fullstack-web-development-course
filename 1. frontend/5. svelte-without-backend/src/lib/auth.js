const AUTH_STATE_KEY = 'authState'
const USERS_KEY = 'authUsers'

const defaultState = {
    isAuthenticated: false,
    user: null
}

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

function readFromStorage(key, fallback) {
    if (!isBrowser) return fallback

    try {
        const raw = window.localStorage.getItem(key)
        return raw ? JSON.parse(raw) : fallback
    } catch (err) {
        console.warn('Failed to parse localStorage value', err)
        return fallback
    }
}

function saveToStorage(key, value) {
    if (!isBrowser) return
    window.localStorage.setItem(key, JSON.stringify(value))
}

export function getAuthState() {
    return readFromStorage(AUTH_STATE_KEY, defaultState)
}

export function saveAuthState(state) {
    saveToStorage(AUTH_STATE_KEY, state)
}

export function clearAuthState() {
    saveAuthState(defaultState)
}

function getUsers() {
    return readFromStorage(USERS_KEY, [])
}

function saveUsers(users) {
    saveToStorage(USERS_KEY, users)
}


// Имитация проверки учетных данных по списку пользователей
export function fakeLogin(email, password) {
    const users = getUsers()
    const user = users.find((candidate) => candidate.email === email)

    if (!user) {
        return {success: false, message: 'Пользователь не найден'}
    }

    if (user.password !== password) {
        return {success: false, message: 'Неверный пароль'}
    }

    saveAuthState({
        isAuthenticated: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })

    return {success: true, message: 'Успешный вход', user}
}

function generateId() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID()
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}


// Имитация регистрации, сохраняет нового пользователя в localStorage
export function fakeRegister({name, email, password}) {
    const users = getUsers()
    const isEmailUsed = users.some((candidate) => candidate.email === email)

    if (isEmailUsed) {
        return {success: false, message: 'Пользователь с таким email уже существует'}
    }

    const newUser = {
        id: generateId(),
        name,
        email,
        password
    }

    users.push(newUser)
    saveUsers(users)

    return {success: true, message: 'Регистрация прошла успешно', user: newUser}
}


export function isAuthenticated() {
    return getAuthState().isAuthenticated
}

// Функция выхода из системы - очищает состояние авторизации
export function logout() {
    clearAuthState()
}
