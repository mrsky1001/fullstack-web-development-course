document.getElementById('register-form').onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    const data = await apiFetch('/register', 'POST', { name, email, password });
    if (data.status === 'success') {
        showMessage('Регистрация успешна! Переходим ко входу...');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    } else {
        showMessage(data.message, 'error');
    }
};
