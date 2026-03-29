/**
 * Управление профилем (Profile)
 * Файл js/profile.js
 */

/**
 * Проверяем авторизацию при загрузке страницы
 */
async function checkAuth() {
    // Вызываем общую функцию из shared.js
    const data = await apiFetch('/profile');
    
    if (data.status === 'success') {
        // Заполняем данными на странице
        document.getElementById('user-name').textContent = data.user.name;
        document.getElementById('user-email').textContent = data.user.email;
    } else {
        // Если пользователь не залогинен, перенаправляем на вход
        window.location.href = 'login.html';
    }
}

/**
 * Выход из системы (Logout)
 */
document.getElementById('logout-btn').onclick = async () => {
    // Отправляем запрос на логаут (POST)
    const data = await apiFetch('/logout', 'POST');
    
    if (data.status === 'success') {
        showMessage('Вы успешно вышли из системы');
        
        // Переходим на вход через 1 сек
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    } else {
        showMessage(data.message || 'Ошибка выхода', 'error');
    }
};

// Запуск инициализации
checkAuth();
