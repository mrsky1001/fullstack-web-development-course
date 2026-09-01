// СмартОфис — Скрипт веб-приложения (Вебинар 6)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCatalog();
  initRoomDetails();
  initRegisterForm();
  initLoginForm();
});

// Функция всплывающих уведомлений (Toast) справа внизу
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

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');

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

function updateAuthNav() {
  const currentUser = localStorage.getItem('currentUser');
  const myBookingsNavItem = document.getElementById('myBookingsNavItem');
  const authNavBtn = document.getElementById('authNavBtn');

  if (currentUser) {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'block';
    if (authNavBtn) {
      authNavBtn.textContent = 'Выйти';
      authNavBtn.href = '#';
      authNavBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        showNotification('Вы вышли из системы', 'info');
        const isPages = window.location.pathname.includes('/pages/');
        setTimeout(() => {
          window.location.href = isPages ? '../index.html' : 'index.html';
        }, 1000);
      };
    }
  } else {
    if (myBookingsNavItem) myBookingsNavItem.style.display = 'none';
    if (authNavBtn) {
      authNavBtn.textContent = 'Войти';
      const isPages = window.location.pathname.includes('/pages/');
      authNavBtn.href = isPages ? 'login.html' : 'pages/login.html';
      authNavBtn.onclick = null;
    }
  }
}


function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => `
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
            <a href="room-details.html?id=${room.id}" class="btn-icon" title="Подробнее о комнате" aria-label="Подробнее"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>
            <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}


function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
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


function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
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

    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      showNotification('Пользователь зарегистрирован успешно!', 'success');
      form.reset();
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    }
  });
}

function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    if (login === 'admin' && pass === '12345') {
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
