/**
 * CКРИПТ СТРАНИЦЫ ВХОДА (Frontend)
 * 
 * Обрабатывает форму входа:
 * 1. Получает данные из полей ввода.
 * 2. Проверяет их (валидация).
 * 3. Отправляет запрос на сервер через модуль Auth.
 * 4. Обрабатывает результат (переход в каталог или показ ошибки).
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    // Навешиваем обработчик события 'submit' (отправка формы)
    form.addEventListener('submit', async (e) => {
        // e.preventDefault() отменяет стандартную перезагрузку страницы при отправке формы
        e.preventDefault();

        // 1. Очищаем предыдущие ошибки
        clearErrors();

        // 2. Получаем значения
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        // 3. Простая валидация на клиенте
        let hasError = false;

        if (!email) {
            showError('email-error', 'Пожалуйста, введите Email');
            hasError = true;
        }

        if (!password) {
            showError('password-error', 'Пожалуйста, введите пароль');
            hasError = true;
        }

        if (hasError) return;

        // 4. Показываем индикатор загрузки (можно добавить спиннер)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Вход...';
        submitBtn.disabled = true;

        // 5. Попытка входа
        const result = await Auth.login(email, password);

        // 6. Обработка результата
        if (result.success) {
            Toast.success('Добро пожаловать!');

            // Если мы пришли с другой страницы (например, пытались открыть корзину),
            // можно было бы вернуться туда. Пока просто идем в каталог.
            setTimeout(() => {
                window.location.href = '../index.html'; // На главную
            }, 1000);
        } else {
            // Ошибка входа
            showError('form-error', 'Неверный логин или пароль'); // Часто сервер возвращает 401

            // Возвращаем кнопку в исходное состояние
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

/**
 * Вспомогательная функция для показа ошибки в нужном месте
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Очистка всех сообщений об ошибках
 */
function clearErrors() {
    document.querySelectorAll('.form-error').forEach(el => {
        el.textContent = '';
    });
}
