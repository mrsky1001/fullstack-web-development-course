/**
 * УРОК 8: СКРИПТ РЕГИСТРАЦИИ (Frontend)
 * =========================================
 * 
 * Обрабатывает форму создания аккаунта.
 * Аналогичен login.js, но проверяет больше полей.
 * 
 * КОНЦЕПЦИИ:
 * - Расширенная валидация
 * - Проверка совпадения паролей
 * - Обработка ошибок сервера
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('register-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Сброс ошибок
        clearErrors();

        // 2. Сбор данных из формы
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // 3. Валидация
        let hasError = false;

        // Проверка имени (минимум 2 символа)
        if (!username || username.length < 2) {
            showError('username-error', 'Имя должно быть не короче 2 символов');
            hasError = true;
        }

        // Проверка Email (простая — наличие @)
        if (!email || !email.includes('@')) {
            showError('email-error', 'Введите корректный Email');
            hasError = true;
        }

        // Проверка пароля (минимум 6 символов)
        if (!password || password.length < 6) {
            showError('password-error', 'Пароль должен быть не менее 6 символов');
            hasError = true;
        }

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            showError('confirm-password-error', 'Пароли не совпадают!');
            hasError = true;
        }

        // Если есть ошибки, не отправляем запрос
        if (hasError) return;

        // 4. Отправка на сервер
        // Блокируем кнопку, чтобы не нажали дважды
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Создаем аккаунт...';

        try {
            const result = await Auth.register(email, password, username);

            if (result.success) {
                Toast.success('Регистрация успешна! Входим...');

                // Автоматически логиним пользователя
                const loginResult = await Auth.login(email, password);

                if (loginResult.success) {
                    // Редирект на главную
                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 1500);
                } else {
                    // Если автологин не удался, просто переходим на страницу входа
                    setTimeout(() => {
                        window.location.href = './login.html';
                    }, 1500);
                }
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

/*
 * ВАЛИДАЦИЯ НА КЛИЕНТЕ vs ВАЛИДАЦИЯ НА СЕРВЕРЕ:
 * 
 * Клиентская валидация (этот файл):
 * - Улучшает UX — мгновенная обратная связь
 * - НЕ обеспечивает безопасность!
 * - Можно обойти через DevTools
 * 
 * Серверная валидация (backend):
 * - Обязательна для безопасности
 * - Проверяет уникальность email
 * - Хеширует пароль перед сохранением
 * 
 * ВАЖНО: Всегда валидируйте данные И на клиенте, И на сервере!
 */
