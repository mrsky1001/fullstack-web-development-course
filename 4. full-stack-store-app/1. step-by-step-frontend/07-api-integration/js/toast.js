/**
 * УРОК 6: СИСТЕМА УВЕДОМЛЕНИЙ (Toast Notifications)
 * =========================================
 * 
 * Создает всплывающие сообщения в углу экрана.
 * Используется вместо alert() для красивого интерфейса.
 * 
 * КОНЦЕПЦИИ:
 * - document.createElement() — создание DOM-элементов
 * - appendChild() / remove() — добавление и удаление из DOM
 * - setTimeout() — таймеры JavaScript
 * - CSS-анимации через добавление классов
 */

const Toast = {
    container: null,

    /**
     * Инициализация контейнера для уведомлений.
     * Создаем его один раз и переиспользуем.
     */
    init() {
        if (!this.container) {
            // Создаем div-контейнер в памяти
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            // Добавляем в конец body
            document.body.appendChild(this.container);
        }
    },

    /**
     * Основной метод показа уведомления.
     * @param {string} message - Текст сообщения
     * @param {string} type - Тип (success, error, warning, info)
     * @param {number} duration - Время показа в миллисекундах
     */
    show(message, type = 'info', duration = 3000) {
        // Убеждаемся, что контейнер существует
        this.init();

        // Создаем элемент уведомления
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        // Подбираем иконку в зависимости от типа
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        // Формируем HTML содержимое
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Добавляем уведомление в контейнер
        this.container.appendChild(toast);

        // ВАЖНО: Запускаем CSS-анимацию через небольшую задержку.
        // Без задержки браузер не "увидит" добавление элемента,
        // и анимация не сработает.
        setTimeout(() => toast.classList.add('show'), 10);

        // Устанавливаем таймер на автоматическое скрытие
        setTimeout(() => {
            // Сначала убираем класс show (запускает анимацию исчезновения)
            toast.classList.remove('show');
            // Через 300мс (время CSS-анимации) удаляем элемент полностью
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return toast;
    },

    // === Удобные методы-обёртки для разных типов ===

    /**
     * Показать успешное уведомление (зелёное)
     */
    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    /**
     * Показать ошибку (красное)
     */
    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    /**
     * Показать предупреждение (оранжевое)
     */
    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    /**
     * Показать информационное сообщение (синее/фиолетовое)
     */
    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

// Делаем Toast доступным глобально (из любого места)
window.Toast = Toast;

/*
 * КАК ЭТО РАБОТАЕТ:
 * 
 * 1. При первом вызове Toast.show() создается контейнер
 * 2. Создается div с уведомлением и добавляется в контейнер
 * 3. Через 10мс добавляется класс 'show' (CSS-анимация)
 * 4. Через N секунд класс 'show' убирается (анимация исчезновения)
 * 5. Через 300мс элемент удаляется из DOM
 * 
 * ПОПРОБУЙТЕ В КОНСОЛИ:
 * Toast.success('Отлично!')
 * Toast.error('Ошибка!')
 * Toast.warning('Внимание!')
 * Toast.info('Информация')
 */
