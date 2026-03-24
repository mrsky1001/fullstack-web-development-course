const API_URL = 'http://localhost:3000';

// Элементы
const regSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');
const profileSection = document.getElementById('profile-section');
const messageEl = document.getElementById('message');

// Переключатели
document.getElementById('to-login').onclick = (e) => {
    e.preventDefault();
    showSection('login');
};
document.getElementById('to-register').onclick = (e) => {
    e.preventDefault();
    showSection('register');
};

// Функция показа секций
function showSection(name) {
    regSection.classList.add('hidden');
    loginSection.classList.add('hidden');
    profileSection.classList.add('hidden');
    
    if (name === 'register') regSection.classList.remove('hidden');
    if (name === 'login') loginSection.classList.remove('hidden');
    if (name === 'profile') profileSection.classList.remove('hidden');
}

// Показать сообщение
function showMessage(text, type = 'success') {
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.classList.remove('hidden');
    setTimeout(() => messageEl.classList.add('hidden'), 3000);
}

// Универсальный fetch с куками
async function apiFetch(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // ВАЖНО для сессий
    };
    if (body) options.body = JSON.stringify(body);
    
    try {
        const res = await fetch(`${API_URL}${endpoint}`, options);
        return await res.json();
    } catch (err) {
        console.error(err);
        return { status: 'error', message: 'Ошибка связи с сервером' };
    }
}

// Регистрация
document.getElementById('register-form').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    const data = await apiFetch('/register', 'POST', { name, email, password });
    if (data.status === 'success') {
        showMessage('Регистрация успешна! Теперь войдите.');
        showSection('login');
    } else {
        showMessage(data.message, 'error');
    }
};

// Вход
document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const data = await apiFetch('/login', 'POST', { email, password });
    if (data.status === 'success') {
        showMessage('Вы вошли!');
        checkAuth(); // Обновляем состояние
    } else {
        showMessage('Неверный логин или пароль', 'error');
    }
};

// Выход
document.getElementById('logout-btn').onclick = async () => {
    const data = await apiFetch('/logout', 'POST');
    if (data.status === 'success') {
        showMessage('До встречи!');
        showSection('login');
    }
};

// Проверка авторизации (при загрузке)
async function checkAuth() {
    const data = await apiFetch('/profile');
    if (data.status === 'success') {
        document.getElementById('user-name').textContent = data.user.name;
        document.getElementById('user-email').textContent = data.user.email;
        showSection('profile');
    } else {
        showSection('login');
    }
}

// Инициализация
checkAuth();
