const API_URL = 'http://localhost:3000';

/**
 * Универсальный fetch с куками (для работы с сессиями)
 * @param {string} endpoint - Путь (например, '/login')
 * @param {string} method - HTTP метод (GET, POST, etc.)
 * @param {object} body - Объект с данными для тела запроса
 */
async function apiFetch(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // ВАЖНО: разрешает браузеру передавать куки (Session ID)
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const res = await fetch(`${API_URL}${endpoint}`, options);
        return await res.json();
    } catch (err) {
        console.error('API Error:', err);
        return { status: 'error', message: 'Ошибка связи с сервером' };
    }
}

/**
 * Показать всплывающее уведомление
 * @param {string} text - Текст сообщения
 * @param {string} type - Тип ('success' или 'error')
 */
function showMessage(text, type = 'success') {
    let messageEl = document.getElementById('message');
    
    // Если элемента нет на странице, создаем его динамически
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'message';
        messageEl.className = 'message hidden';
        document.body.appendChild(messageEl);
    }
    
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.classList.remove('hidden');
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        messageEl.classList.add('hidden');
    }, 3000);
}
