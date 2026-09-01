// СмартОфис — Скрипт веб-приложения (Вебинар 4)

// [Теория: Событие 'DOMContentLoaded' срабатывает, когда браузер полностью построил HTML-дерево страницы]
// [Логика: Мы запускаем функции только после того, как все теги загружены и готовы к работе]
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

// [Теория: Всплывающие уведомления (Toast) — это элементы, которые создаются через createElement и плавно исчезают через таймер]
// [Логика: Показываем красивое всплывающее сообщение в правом нижнем углу вместо устаревшего alert()]
function showNotification(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;

  container.appendChild(toast);

  // [Теория: setTimeout выполняет действие через указанное время (3500 мс = 3.5 секунды)]
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300); // Удаляем из DOM после плавного угасания
  }, 3500);
}

// [Теория: Функция — это многократно используемый блок кода, решающий одну понятную задачу]
// [Логика: Функция подсвечивает пункт меню той страницы, на которой сейчас находится пользователь]
function initNavigation() {
  // [Теория: document.querySelectorAll находит ВСЕ элементы с указанным CSS-классом]
  const links = document.querySelectorAll('.nav-link');
  // [Теория: window.location.pathname возвращает путь текущей страницы в строке браузера]
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Сначала снимаем активный класс со всех ссылок
    link.classList.remove('active');

    // Проверяем, совпадает ли адрес ссылки с текущей страницей
    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
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

  updateAuthNav();
}

// [Теория: localStorage — встроенное хранилище браузера, позволяющее сохранять данные между страницами]
// [Логика: Обновляем меню в зависимости от того, вошел ли пользователь в систему]
function updateAuthNav() {
  const currentUser = localStorage.getItem('currentUser');
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');

  if (currentUser) {
    // Если пользователь вошел — показываем пункт «Мои бронирования» и меняем кнопку на «Выйти»
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'block';
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser'); // Удаляем сохраненную авторизацию
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
    }
  } else {
    // Если пользователь не вошел — скрываем «Мои бронирования» и показываем кнопку «Войти»
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';
    if (authNavBtn) {
      authNavBtn.textContent = 'Войти';
      const isPages = window.location.pathname.includes('/pages/');
      authNavBtn.href = isPages ? 'login.html' : 'pages/login.html';
      authNavBtn.onclick = null;
    }
  }
}
