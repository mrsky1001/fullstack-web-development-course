// СмартОфис — Скрипт веб-приложения (Вебинар 4)

// [Событие 'DOMContentLoaded' срабатывает, когда браузер полностью построил HTML-дерево страницы]
// [ Мы запускаем функции только после того, как все теги загружены и готовы к работе]
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
});

// [Всплывающие уведомления (Toast) — это элементы, которые создаются через createElement и плавно исчезают через таймер]
// [ Показываем красивое всплывающее сообщение в правом нижнем углу вместо устаревшего alert()]
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

  // [setTimeout выполняет действие через указанное время (3500 мс = 3.5 секунды)]
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300); // Удаляем из DOM после плавного угасания
  }, 3500);
}

// [Функция — это многократно используемый блок кода, решающий одну понятную задачу]
// [ Функция подсвечивает пункт меню той страницы, на которой сейчас находится пользователь]
function initNavigation() {
  // [document.querySelectorAll находит ВСЕ элементы с указанным CSS-классом]
  const links = document.querySelectorAll('.nav-link');
  // [window.location.pathname возвращает путь текущей страницы в строке браузера]
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Сначала снимаем активный класс со всех ссылок
    link.classList.remove('active');

    // [Проверяем совпадение адреса через понятные константы-условия]
    const isHome = (current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html');
    const hasCatalog = (href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'));
    const isBooking = href.includes('booking.html') && current.includes('booking.html');
    const isMyBookings = href.includes('my-bookings.html') && current.includes('my-bookings.html');
    const isLogin = href.includes('login.html') && current.includes('login.html');
    const isRegister = href.includes('register.html') && current.includes('register.html');

    const isActive = isHome || hasCatalog || isBooking || isMyBookings || isLogin || isRegister;
    if (isActive) {
      link.classList.add('active');
    }
  });

  updateAuthNav();
}

// [localStorage — встроенное хранилище браузера, позволяющее сохранять данные между страницами]
// [ Обновляем меню в зависимости от того, вошел ли пользователь в систему]
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

// [Функция интерактивного слайдера фотографий]
// [Управляет показом активного слайда, переключением по стрелкам/точкам и автоматической прокруткой каждые 3 секунды]
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  // [Защитная проверка: если на текущей странице нет слайдера, просто выходим без ошибок]
  if (!slides.length) return;

  let currentSlide = 0; // Индекс текущего видимого слайда (0, 1, 2, 3)
  let timerId = null;   // Переменная для хранения таймера автопрокрутки

  // [Функция переключения на конкретный слайд по его номеру-индексу]
  function showSlide(index) {
    // Если вышли за пределы массива вправо — переходим на первый слайд (0)
    if (index >= slides.length) currentSlide = 0;
    // Если вышли влево — переходим на самый последний слайд
    else if (index < 0) currentSlide = slides.length - 1;
    // Иначе переходим на запрошенный индекс
    else currentSlide = index;

    // [С помощью classList.toggle переключаем класс active: только слайд с индексом currentSlide получает класс active]
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  // Функции для шага вперёд и назад
  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  // [Запуск автоматической прокрутки каждые 3000 мс (3 секунды)]
  function startAuto() {
    stopAuto(); // Сначала очищаем старый таймер, чтобы они не накладывались
    timerId = setInterval(next, 3000);
  }

  // [Остановка таймера]
  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  // [Вешаем слушатели событий click на кнопки со сбросом таймера при ручном нажатии]
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // [Нажатие на точки-индикаторы снизу]
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  // Запускаем автопрокрутку при загрузке страницы!
  startAuto();
}

