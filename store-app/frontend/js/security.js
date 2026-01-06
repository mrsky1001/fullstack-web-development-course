/**
 * УТИЛИТЫ БЕЗОПАСНОСТИ (Frontend)
 * 
 * Набор функций для защиты от распространенных уязвимостей.
 * 
 * ⚠️ ВАЖНО ДЛЯ СТУДЕНТОВ:
 * При работе с пользовательскими данными (имена, описания, комментарии)
 * ВСЕГДА нужно экранировать HTML-символы перед вставкой в DOM.
 * Иначе злоумышленник может внедрить вредоносный скрипт (XSS-атака).
 */

const Security = {
    /**
     * Экранирование HTML-символов для защиты от XSS.
     * Заменяет опасные символы на безопасные HTML-сущности.
     * 
     * Пример:
     * escapeHtml('<script>alert("XSS")</script>')
     * -> '&lt;script&gt;alert("XSS")&lt;/script&gt;'
     * 
     * @param {string} text - Текст для экранирования
     * @returns {string} - Безопасный текст
     */
    escapeHtml(text) {
        if (!text) return '';

        // Создаем временный текстовый узел и получаем его содержимое
        // Это безопасный способ экранирования
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Альтернативный метод экранирования через замену символов.
     * Заменяет 5 основных опасных символов.
     * 
     * @param {string} text - Текст для экранирования
     * @returns {string} - Безопасный текст
     */
    escapeHtmlManual(text) {
        if (!text) return '';

        const escapeMap = {
            '&': '&amp;',   // Амперсанд должен быть первым!
            '<': '&lt;',   // Начало тега
            '>': '&gt;',   // Конец тега
            '"': '&quot;', // Двойные кавычки
            "'": '&#039;'  // Одинарные кавычки
        };

        return text.replace(/[&<>"']/g, char => escapeMap[char]);
    }
};

// Экспортируем глобально
window.Security = Security;

// Удобный короткий алиас
window.escapeHtml = Security.escapeHtml;
