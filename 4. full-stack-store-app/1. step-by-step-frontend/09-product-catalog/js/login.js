/**
 * УРОК 8: СКРИПТ СТРАНИЦЫ ВХОДА (Frontend)
 * =========================================
 * 
 * Обрабатывает форму входа:
 * 1. Получает данные из полей ввода.
 * 2. Проверяет их (валидация).
 * 3. Отправляет запрос на сервер через модуль Auth.
 * 4. Обрабатывает результат (переход или показ ошибки).
 * 
 * КОНЦЕПЦИИ:
 * - e.preventDefault() — отмена стандартного поведения
 * - Валидация на клиенте
 * - Асинхронная обработка форм
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');

    // Навешиваем обработчик события 'submit' (отправка формы)
    form.addEventListener('submit', async (e) => {
        // e.preventDefault() отменяет стандартную перезагрузку страницы
        e.preventDefault();

        // 1. Очищаем предыдущие ошибки
        clearErrors();

        // 2. Получаем значения из полей ввода
        //    .value — это текст, введенный пользователем
        //    .trim() — удаляет пробелы по краям
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

        // Если есть ошибки — не отправляем запрос
        if (hasError) return;

        // 4. Показываем индикатор загрузки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Вход...';
        submitBtn.disabled = true;

        // 5. Попытка входа через модуль Auth
        const result = await Auth.login(email, password);

        // 6. Обработка результата
        if (result.success) {
            Toast.success('Добро пожаловать!');

            // Редирект на главную страницу
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1000);
        } else {
            // Ошибка входа
            showError('form-error', result.error || 'Неверный логин или пароль');

            // Возвращаем кнопку в исходное состояние
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });
});

/**
 * Вспомогательная функция для показа ошибки
 * @param {string} elementId - ID элемента для вывода ошибки
 * @param {string} message - Текст ошибки
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

/*
 * КАК ЭТО РАБОТАЕТ:
 * 
 * 1. Пользователь заполняет форму и нажимает "Войти"
 * 2. e.preventDefault() отменяет перезагрузку страницы
 * 3. Получаем данные через .value
 * 4. Проверяем, что поля заполнены
 * 5. Отправляем запрос через Auth.login()
 * 6. При успехе — редирект на главную
 * 7. При ошибке — показываем сообщение
 */
