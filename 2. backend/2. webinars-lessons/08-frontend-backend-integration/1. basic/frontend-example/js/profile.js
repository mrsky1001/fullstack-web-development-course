async function checkAuth() {
    const data = await apiFetch('/profile');
    if (data.status === 'success') {
        document.getElementById('user-name').textContent = data.user.name;
        document.getElementById('user-email').textContent = data.user.email;
    } else {
        // Редирект в случае неуспеха (уже обрабатывается в apiFetch, но на всякий случай)
        window.location.href = 'login.html';
    }
}

document.getElementById('logout-btn').onclick = async () => {
    const data = await apiFetch('/logout', 'POST');
    if (data.status === 'success') {
        showMessage('Вы вышли из системы');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
};

checkAuth();
