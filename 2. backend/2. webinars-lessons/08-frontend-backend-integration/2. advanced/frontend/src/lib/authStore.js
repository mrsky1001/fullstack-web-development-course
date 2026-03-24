import { writable } from 'svelte/store';

const API_URL = 'http://localhost:3000';

export const user = writable(null);
export const loading = writable(true);

// Универсальная функция для запросов к API
const apiFetch = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        /** @type {RequestCredentials} */
        credentials: 'include' // Важно для работы с сессиями (cookies)
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(`${API_URL}${endpoint}`, options);
        return await res.json();
    } catch (err) {
        console.error(err);
        return { status: 'error', message: 'Ошибка связи с сервером' };
    }
};

export const auth = {
    // Проверка: авторизован ли пользователь (при загрузке страницы)
    async check() {
        loading.set(true);
        const data = await apiFetch('/auth/check');
        if (data.status === 'success') {
            user.set(data.user);
        } else {
            user.set(null);
        }
        loading.set(false);
    },

    // Вход в систему
    async login(email, password) {
        const data = await apiFetch('/auth/login', 'POST', { email, password });
        if (data.status === 'success') {
            user.set(data.user);
        }
        return data;
    },

    // Регистрация нового пользователя
    async register(name, email, password) {
        return await apiFetch('/auth/register', 'POST', { name, email, password });
    },

    // Выход из системы
    async logout() {
        const data = await apiFetch('/auth/logout', 'POST');
        if (data.status === 'success') {
            user.set(null); // Очищаем данные из хранилища
        }
        return data;
    }
};
