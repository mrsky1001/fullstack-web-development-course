/**
 * УРОК 3: СКРИПТ МОБИЛЬНОГО МЕНЮ
 * =========================================
 * 
 * Это наш первый JavaScript!
 * Скрипт управляет открытием/закрытием мобильного меню.
 * 
 * КОНЦЕПЦИИ:
 * - Событие DOMContentLoaded
 * - querySelector для поиска элементов
 * - addEventListener для обработки кликов
 * - classList для управления классами
 */

// Ждем полной загрузки DOM-дерева перед выполнением скрипта
// Это важно, потому что скрипт находится в конце body,
// но лучше всегда обеспечивать готовность DOM
document.addEventListener('DOMContentLoaded', () => {

    // === 1. Находим нужные элементы на странице ===

    // querySelector ищет ПЕРВЫЙ элемент по CSS-селектору
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    // === 2. Проверяем, что элементы существуют ===
    // Если элемента нет на странице, дальнейший код вызовет ошибку
    if (!mobileMenuBtn || !navLinks) {
        console.log('Мобильное меню не найдено на странице');
        return; // Выходим из функции
    }

    // === 3. Добавляем обработчик клика на кнопку-гамбургер ===
    mobileMenuBtn.addEventListener('click', () => {

        // toggle() добавляет класс, если его нет, или удаляет, если есть
        // Это переключатель состояния
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Для отладки - выводим в консоль
        console.log('Меню переключено:', navLinks.classList.contains('active'));
    });

    // === 4. Закрываем меню при клике на ссылку ===
    // querySelectorAll возвращает ВСЕ элементы, подходящие под селектор
    const menuLinks = navLinks.querySelectorAll('a');

    // forEach перебирает каждый элемент массива/коллекции
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Закрываем меню после клика на ссылку
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
});

/*
 * ОБЪЯСНЕНИЕ РАБОТЫ СКРИПТА:
 * 
 * 1. При загрузке страницы находим кнопку и блок меню
 * 2. При клике на кнопку добавляем/убираем класс 'active'
 * 3. CSS "видит" класс active и показывает/скрывает меню
 * 4. Это разделение ответственности: JS управляет состоянием, CSS - отображением
 */
