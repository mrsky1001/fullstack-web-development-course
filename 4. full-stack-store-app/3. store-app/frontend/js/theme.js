/**
 * CКРИПТ ИНТЕРФЕЙСА (Theme & Menu)
 * 
 * Отвечает за:
 * 1. Переключение темной/светлой темы (сохраняет выбор в LocalStorage).
 * 2. Работу мобильного меню ("гамбургера").
 */

document.addEventListener('DOMContentLoaded', () => {
    // Получаем кнопку переключения темы и корневой элемент <html>
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // --- 1. Логика Темы ---

    // Проверяем, есть ли сохраненная настройка в LocalStorage
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Если пользователь уже выбрал тему ранее - ставим её
        html.setAttribute('data-theme', savedTheme);
    } else {
        // Если нет - проверяем системные настройки компьютера
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        // Если система в темном режиме - включаем темную, иначе светлую
        const theme = prefersDarkScheme.matches ? 'dark' : 'light';
        html.setAttribute('data-theme', theme);
    }

    // Обработчик клика по кнопке темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Получаем текущую тему
            const currentTheme = html.getAttribute('data-theme');
            // Меняем на противоположную
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Применяем изменения в HTML
            html.setAttribute('data-theme', newTheme);
            // Сохраняем выбор на будущее
            localStorage.setItem('theme', newTheme);
        });
    }

    // --- 2. Логика Мобильного Меню ---

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        // При клике на "гамбургер"
        mobileMenuBtn.addEventListener('click', () => {
            // Добавляем/убираем класс active (CSS сам покажет/скроет меню)
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Закрываем меню, если кликнули на любую ссылку внутри него
        // (чтобы при переходе на якорь меню не закрывало контент)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
});
