/* 
  Ожидаем полной загрузки DOM, чтобы скрипт мог найти все элементы на странице 
*/
document.addEventListener('DOMContentLoaded', () => {

  /* 
    =================================================
    МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР)
    =================================================
  */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      // .toggle добавляет класс, если его нет, и убирает, если есть
      menuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');

      // Блокируем прокрутку body, когда меню открыто
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
  }

  /* 
    =================================================
    ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (ТЕМНАЯ / СВЕТЛАЯ)
    =================================================
  */
  const themeToggle = document.querySelector('.theme-toggle');

  // window.matchMedia позволяет проверить системные настройки пользователя
  // В данном случае проверяем, предпочитает ли пользователь темную тему
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // localStorage - это хранилище в браузере, которое сохраняет данные даже после перезагрузки
  // Проверяем, есть ли уже сохраненная настройка темы
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    // Если есть сохраненная тема, применяем её через атрибут data-theme у тега <html>
    document.documentElement.setAttribute('data-theme', currentTheme);
  } else if (!prefersDarkScheme.matches) {
    // Если сохранения нет и система НЕ в темном режиме -> ставим светлую тему
    document.documentElement.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      let theme = 'dark';

      // Проверяем текущее значение атрибута
      if (document.documentElement.getAttribute('data-theme') !== 'light') {
        // Переключаем на светлую
        document.documentElement.setAttribute('data-theme', 'light');
        theme = 'light';
      } else {
        // Переключаем на темную
        document.documentElement.setAttribute('data-theme', 'dark');
      }

      // Сохраняем выбор пользователя в localStorage
      localStorage.setItem('theme', theme);
    });
  }

  /* 
    =================================================
    ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРНЫМ ССЫЛКАМ
    =================================================
  */
  // Находим все ссылки, начинающиеся с #
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Отменяем стандартный резкий переход

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Если мобильное меню открыто -> закрываем его перед скроллом
        if (navLinks && navLinks.classList.contains('active')) {
          menuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }

        // Встроенная функция браузера для плавного скролла
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  /* 
    =================================================
    АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ (INTERSECTION OBSERVER)
    =================================================
    Intersection Observer API позволяет следить за тем, 
    появился ли элемент в видимой области экрана (viewport).
  */
  const observerOptions = {
    root: null,        // null означает наблюдение относительно viewport браузера
    rootMargin: '0px', // Отступы области наблюдения
    threshold: 0.1     // Срабатывать, когда 10% элемента видно
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      // isIntersecting = true, когда элемент появился на экране
      if (entry.isIntersecting) {
        entry.target.classList.add('visible'); // Добавляем класс для запуска CSS анимации
        observer.unobserve(entry.target);      // Прекращаем следить (анимация только 1 раз)
      }
    });
  }, observerOptions);

  // Выбираем все элементы, которые хотим анимировать
  const animatedElements = document.querySelectorAll('.feature-card, .step-card, .section-header, .hero-content > *, .testimonial-card');

  animatedElements.forEach(el => {
    el.classList.add('fade-up'); // Добавляем начальный класс (скрытый)
    observer.observe(el);        // Начинаем следить за элементом
  });
});
