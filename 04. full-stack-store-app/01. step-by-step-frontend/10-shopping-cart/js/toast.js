/**
 * СИСТЕМА УВЕДОМЛЕНИЙ (Toast Notifications)
 * 
 * Создает всплывающие сообщения в углу экрана.
 * Используется вместо alert() для красивого интерфейса.
 */

const Toast = {
    container: null,

    // Создаем невидимый блок, куда будут складываться сообщения
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    /**
     * Основной метод показа сообщения.
     * @param {string} message - Текст сообщения
     * @param {string} type - Тип (success, error, warning, info)
     * @param {number} duration - Сколько висит сообщение (в мс)
     */
    show(message, type = 'info', duration = 3000) {
        this.init(); // Убеждаемся, что контейнер есть

        // Создаем HTML элемент для сообщения
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`; // Например: toast-success

        // Подбираем иконку
        const icons = {
            success: '✓',  // Галочка
            error: '✕',    // Крестик
            warning: '⚠',  // Знак внимания
            info: 'ℹ'     // Инфо
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Добавляем сообщение на страницу
        this.container.appendChild(toast);

        // Запускаем CSS анимацию появления (через небольшую задержку)
        setTimeout(() => toast.classList.add('show'), 10);

        // Ставим таймер на удаление
        setTimeout(() => {
            // Сначала анимация исчезновения
            toast.classList.remove('show');
            // Потом удаление из DOM
            setTimeout(() => toast.remove(), 300);
        }, duration);

        return toast;
    },

    // --- Удобные методы для разных типов ---

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

// Делаем доступным глобально
window.Toast = Toast;
