/**
 * Обработка входа (Login)
 * Файл js/login.js
 */
document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Вызываем общую функцию fetch из shared.js
    const data = await apiFetch('/login', 'POST', { email, password });
    
    if (data.status === 'success') {
        showMessage('Успешный вход! Переходим в профиль...');
        
        // Редирект в профиль через 1 сек
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    } else {
        showMessage(data.message || 'Неверный логин или пароль', 'error');
    }
};
