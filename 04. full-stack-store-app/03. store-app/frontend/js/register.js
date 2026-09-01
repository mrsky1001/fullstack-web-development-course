/**
 * СКРИПТ РЕГИСТРАЦИИ (Frontend)
 * 
 * Обрабатывает форму создания аккаунта.
 * Почти идентичен login.js, но проверяет больше полей.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Сброс ошибок
        clearErrors();

        // 2. Сбор данных
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // 3. Валидация
        let hasError = false;

        // Проверка имени
        if (!username || username.length < 2) {
            showError('username-error', 'Имя должно быть не короче 2 символов');
            hasError = true;
        }

        // Проверка Email (простая)
        if (!email || !email.includes('@')) {
            showError('email-error', 'Введите корректный Email');
            hasError = true;
        }

        // Проверка пароля
        if (!password || password.length < 6) {
            showError('password-error', 'Пароль должен быть не менее 6 символов');
            hasError = true;
        }

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            showError('confirm-password-error', 'Пароли не совпадают!');
            hasError = true;
        }

        if (hasError) return; // Если есть ошибки, не отправляем запрос

        // 4. Отправка на сервер
        // Блокируем кнопку, чтобы не нажали дважды
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Создаем аккаунт...';

        try {
            const result = await Auth.register(email, password, username);

            if (result.success) {
                Toast.success('Регистрация успешна! Входим...');

                // Даем время прочитать сообщение перед переадресацией
                setTimeout(() => {
                    window.location.href = './catalog.html';
                }, 1500);
            } else {
                showError('form-error', result.error || 'Ошибка при регистрации. Возможно, email уже занят.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Зарегистрироваться';
            }
        } catch (err) {
            console.error(err);
            showError('form-error', 'Сетевая ошибка. Попробуйте позже.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Зарегистрироваться';
        }
    });
});

/**
 * Вывод сообщения об ошибке под конкретным полем.
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Очистка всех ошибок формы.
 */
function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
    });
}
