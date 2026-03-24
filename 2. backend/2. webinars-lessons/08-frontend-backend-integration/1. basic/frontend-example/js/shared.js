const API_URL = 'http://localhost:3000';

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

// Показать сообщение
function showMessage(text, type = 'success') {
    let messageEl = document.getElementById('message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'message';
        document.querySelector('.container').appendChild(messageEl);
    }
    messageEl.textContent = text;
    messageEl.className = `message ${type}`;
    messageEl.classList.remove('hidden');
    setTimeout(() => messageEl.classList.add('hidden'), 3000);
}
