// СмартОфис — Скрипт веб-приложения (Вебинар 9)

// [Теория: Событие 'DOMContentLoaded' срабатывает, когда браузер полностью построил HTML-дерево страницы]
// [Логика: Мы запускаем функции только после того, как все теги загружены и готовы к работе]
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlider();
  initCatalogFilters();
  initBookingCalc();
  initRoomDetails();
  initMyBookings();
  initRegisterForm();
  initLoginForm();
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

// [Теория: Таймеры setInterval позволяют выполнять действие повторно через заданный интервал времени (в миллисекундах)]
// [Логика: Инициализируем интерактивный слайдер картинок с автосменой каждые 3 секунды]
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  if (!slides.length) return; // Если слайдера нет на странице, ничего не делаем

  let currentSlide = 0; // Индекс текущего видимого слайда (от 0 до 3)
  let timerId = null;   // Хранилище идентификатора таймера

  // Функция переключения активного слайда
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;       // Если дошли до конца — идем в начало
    else if (index < 0) currentSlide = slides.length - 1; // Если идем назад от 0 — идем в конец
    else currentSlide = index;

    // [Теория: classList.toggle('active', условие) добавляет класс если условие истинно, и удаляет если ложно]
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  function next() { showSlide(currentSlide + 1); }
  function prev() { showSlide(currentSlide - 1); }

  // [Логика: Запуск автоматической прокрутки каждые 3 секунды (3000 мс)]
  function startAuto() {
    stopAuto(); // Сначала очищаем предыдущий таймер, чтобы они не дублировались
    timerId = setInterval(next, 3000);
  }

  // [Теория: clearInterval останавливает ранее запущенный интервал]
  function stopAuto() {
    if (timerId) clearInterval(timerId);
  }

  // Обработчики кликов по кнопкам «‹» и «›»
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  // Обработчики кликов по нижним точкам-индикаторам
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAuto();
    });
  });

  // Запускаем автопрокрутку при загрузке
  startAuto();
}


// [Логика: Поиск по названию и сортировка комнат по цене]
function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: Оператор spread [...] создает независимую копию массива, чтобы сортировка не ломала исходные данные]
  let displayedRooms = [...OFFICE_ROOMS];

  // Внутренняя функция для вывода отфильтрованного списка
  function render(rooms) {
    if (!rooms.length) {
      container.innerHTML = '<p class="empty-message">Комнаты не найдены</p>';
      return;
    }
    container.innerHTML = rooms.map(room => `
      <div class="room-card">
        <div class="card-img-wrap">
          <a href="room-details.html?id=${room.id}">
            <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
          </a>
        </div>
        <div class="card-content">
          <h3 class="card-title">
            <a href="room-details.html?id=${room.id}" style="text-decoration: none; color: inherit;">${room.title}</a>
          </h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <!-- [Логика: Кнопка-иконка подробного просмотра] -->
              <a href="room-details.html?id=${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
              <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // [Теория: Метод filter() оставляет только те элементы, которые подходят под условие]
  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    displayedRooms = OFFICE_ROOMS.filter(r => r.title.toLowerCase().includes(q));
    render(displayedRooms);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  // [Теория: Метод sort((a,b) => a - b) сортирует числа по возрастанию]
  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(displayedRooms);
    });
  }

  // [Теория: Метод sort((a,b) => b - a) сортирует числа по убыванию]
  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  // Первичный вывод комнат при загрузке
  render(displayedRooms);
}

// [Логика: Интерактивный калькулятор стоимости бронирования]
function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: window.location.href перенаправляет пользователя на другую страницу]
  // [Логика: Если пользователь не вошел в систему, сразу перенаправляем на форму авторизации]
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');

  // Заполняем выпадающий список <select> всеми доступными комнатами
  roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
    <option value="${r.id}" data-price="${r.pricePerHour}">${r.title} (${r.pricePerHour} ₽/час)</option>
  `).join('');

  // [Теория: URLSearchParams позволяет легко прочитать параметр ?room=id из адресной строки]
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

  // [Логика: Функция мгновенного пересчета цены: тариф × количество часов]
  function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = price * hours;

    if (pricePerHourSpan) pricePerHourSpan.textContent = price + ' ₽';
    if (totalPriceSpan) totalPriceSpan.textContent = total + ' ₽';
  }

  roomSelect.addEventListener('change', updatePrice);
  hoursInput.addEventListener('input', updatePrice);
  updatePrice(); // Считаем цену сразу при открытии страницы

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Запрещаем перезагрузку страницы
    const appNumber = Math.floor(10000 + Math.random() * 90000); // Генерируем 5-значный номер заявки
    const selectedRoom = OFFICE_ROOMS.find(r => r.id === roomSelect.value);
    const bookingDate = document.getElementById('bookingDate').value || '2026-09-01';
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = (selectedRoom ? selectedRoom.pricePerHour : 450) * hours;

    // Добавляем созданное бронирование в список MOCK_BOOKINGS
    if (typeof MOCK_BOOKINGS !== 'undefined') {
      MOCK_BOOKINGS.unshift({
        id: String(appNumber),
        roomTitle: selectedRoom ? selectedRoom.title : 'Офис',
        date: bookingDate,
        hours: hours,
        totalPrice: total
      });
    }

    showNotification('Бронирование создано! Номер заявки: №' + appNumber, 'success');
    form.reset();
    setTimeout(() => {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}

// [Логика: Отображение подробной информации о комнате на странице room-details.html]
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: Считываем параметр ?id=... из адресной строки]
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  
  // [Теория: Метод find() ищет первый элемент массива, удовлетворяющий условию]
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = `
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    `;
    return;
  }

  // Формируем подробную карточку выбранной комнаты
  container.innerHTML = `
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">${room.title}</h1>
          <div class="room-details-price">${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">${room.capacity}</span>
          <span class="room-badge">${room.area}</span>
          ${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>

        <p class="room-description">${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=${room.id}" class="btn btn-primary" style="padding: 10px 20px; font-size: 15px;">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline" style="padding: 10px 18px; font-size: 15px;">← Назад в каталог</a>
        </div>
      </div>
    </div>
  `;
}

// [Логика: Отображение списка бронирований на странице «Мои бронирования»]
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  // [Теория: window.location.href перенаправляет на страницу авторизации]
  // [Логика: Если пользователь не вошел в систему, сразу перенаправляем на login.html]
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }

  container.innerHTML = MOCK_BOOKINGS.map(item => `
    <div class="booking-item">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 5px;">${item.roomTitle}</h3>
        <div style="font-size: 13px; color: #666;">
          Дата: <strong>${item.date}</strong> | Длительность: <strong>${item.hours} ч.</strong> | Заявка №${item.id}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 700; color: #007bff;">${item.totalPrice} ₽</div>
        <span style="font-size: 12px; color: #28a745;">Подтверждено</span>
      </div>
    </div>
  `).join('');
}

// [Логика: Валидация полей формы регистрации]
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Запрещаем стандартную отправку
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    
    // Проверяем каждое поле на заполненность
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    // Проверяем совпадение пароля и подтверждения пароля
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    // Если все поля заполнены корректно — сообщаем об успехе всплывающим уведомлением
    if (isValid) {
      showNotification('Пользователь зарегистрирован успешно!', 'success');
      form.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    }
  });
}

// [Логика: Проверка авторизации на форме входа и сохранение в localStorage]
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    // Проверяем тестовые данные (admin / 12345)
    if (login === 'admin' && pass === '12345') {
      // Сохраняем имя вошедшего пользователя в localStorage
      localStorage.setItem('currentUser', login);
      if (alertBox) alertBox.style.display = 'none';
      showNotification('Успешный вход в систему!', 'success');
      setTimeout(() => {
        window.location.href = 'my-bookings.html';
      }, 1000);
    } else {
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
      showNotification('Неверный логин или пароль', 'danger');
    }
  });
}
