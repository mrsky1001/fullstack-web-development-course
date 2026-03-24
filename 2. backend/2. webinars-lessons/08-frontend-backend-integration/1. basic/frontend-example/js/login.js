document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const data = await apiFetch('/login', 'POST', { email, password });
    if (data.status === 'success') {
        showMessage('Успешный вход!');
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 1000);
    } else {
        showMessage('Неверный логин или пароль', 'error');
    }
};
