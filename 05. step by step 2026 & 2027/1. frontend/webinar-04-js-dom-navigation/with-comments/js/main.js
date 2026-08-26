// СмартОфис — Скрипт веб-приложения (Вебинар 4)

// [Теория: Событие 'DOMContentLoaded' срабатывает, когда исходный HTML-документ полностью загружен и разобран]
// [Логика: Мы ждем полной загрузки DOM-дерева, чтобы скрипт мог гарантированно найти все нужные HTML-элементы]
document.addEventListener('DOMContentLoaded', () => {
  // [Логика: Инициализация логики навигационного меню]
  initNavigation();
});

// [Теория: Функция — это блок кода, спроектированный для выполнения конкретной задачи. Может вызываться многократно]
// [Логика: Функция отвечает за выделение активного пункта меню в зависимости от текущей страницы]
function initNavigation() {
  // [Теория: document.querySelectorAll возвращает список всех элементов в документе, соответствующих указанному CSS селектору]
  // [Логика: Находим все ссылки в навигационном меню (класс .nav-link)]
  const links = document.querySelectorAll('.nav-link');
  
  // [Теория: window.location.pathname возвращает путь (часть URL) текущей страницы]
  // [Логика: Получаем текущий URL, чтобы понять, на какой странице находится пользователь]
  const current = window.location.pathname;

  // [Теория: Метод forEach выполняет указанную функцию один раз для каждого элемента в массиве (или NodeList)]
  links.forEach(link => {
    // [Теория: getAttribute() возвращает значение указанного атрибута элемента]
    // [Логика: Получаем куда ведет конкретная ссылка (ее href)]
    const href = link.getAttribute('href');
    if (!href) return;
    
    // [Теория: classList.remove() удаляет указанный класс у элемента]
    // [Логика: Сначала сбрасываем класс active у всех ссылок, чтобы очистить предыдущее состояние]
    link.classList.remove('active');

    // [Теория: Методы строк endsWith() и includes() проверяют наличие подстроки в строке]
    // [Логика: Серия проверок: если текущий URL совпадает с href ссылки, мы добавляем класс active (classList.add)]
    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if (href.includes('catalog.html') && current.includes('catalog.html')) {
      link.classList.add('active');
    } else if (href.includes('booking.html') && current.includes('booking.html')) {
      link.classList.add('active');
    } else if (href.includes('my-bookings.html') && current.includes('my-bookings.html')) {
      link.classList.add('active');
    } else if (href.includes('login.html') && current.includes('login.html')) {
      link.classList.add('active');
    } else if (href.includes('register.html') && current.includes('register.html')) {
      link.classList.add('active');
    }
  });
}
