// СмартОфис — Вебинар 06: Формы и валидация данных

document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM готов. Инициализация каталога и форм...');
  initNavigation();
  renderCatalog();
  initRoomDetails();
  initRegisterForm();
  initLoginForm();
});

// 1. Навигация
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });
}

// 2. Рендеринг каталога (из Вебинара 05)
function renderCatalog() {
  const container = document.getElementById('catalogContainer') || document.getElementById('catalogRooms');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const html = OFFICE_ROOMS.map(function (room) {
    return `
      <div class="room-card">
        <div class="card-img-wrap">
          <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
        </div>
        <div class="card-content">
          <h3 class="card-title">${room.title}</h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
          <div class="card-footer">
            <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
            <div class="card-btns">
              <a href="room-details.html?id=${room.id}" class="btn btn-outline">Подробнее</a>
              <a href="catalog.html" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

// 3. Детальная страница комнаты (из Вебинара 05)
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id');
  const room = OFFICE_ROOMS.find(function (item) {
    return item.id === roomId;
  });

  if (!room) return;

  container.innerHTML = `
    <div class="room-details-card">
      <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      <div class="room-details-info">
        <h1>${room.title}</h1>
        <p class="room-desc">${room.description}</p>
        <p><strong>Вместимость:</strong> ${room.capacity}</p>
        <p><strong>Площадь:</strong> ${room.area}</p>
        <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
        <a href="catalog.html" class="btn btn-outline">← Назад в каталог</a>
      </div>
    </div>
  `;
}

// 4. Валидация формы регистрации (Тема Вебинара 06)
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Отменяем перезагрузку страницы

    // Находим поля ввода по их ID из разметки
    const loginInput = document.getElementById('login') || document.getElementById('regName');
    const passInput = document.getElementById('password') || document.getElementById('regPassword');
    const confirmInput = document.getElementById('confirmPassword') || document.getElementById('regConfirmPassword');
    const emailInput = document.getElementById('email') || document.getElementById('regEmail');
    const nameInput = document.getElementById('fullName');

    let isValid = true;
    const requiredInputs = [loginInput, passInput, confirmInput, emailInput, nameInput].filter(Boolean);

    // Сбрасываем предыдущие ошибки
    requiredInputs.forEach(function (input) {
      input.classList.remove('is-invalid');
    });

    // Проверяем заполненность каждого поля
    requiredInputs.forEach(function (input) {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    // Проверяем совпадение паролей
    if (passInput && confirmInput && passInput.value !== confirmInput.value) {
      confirmInput.classList.add('is-invalid');
      isValid = false;
    }

    if (isValid) {
      const displayName = (nameInput && nameInput.value.trim()) || (loginInput && loginInput.value.trim()) || 'Пользователь';
      const newUser = {
        login: loginInput ? loginInput.value.trim() : '',
        name: displayName,
        email: emailInput ? emailInput.value.trim() : ''
      };
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      alert('Регистрация успешна! Добро пожаловать, ' + displayName);
      window.location.href = '../index.html';
    }
  });
}

// 5. Валидация формы входа (Тема Вебинара 06)
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const loginInput = document.getElementById('login') || document.getElementById('loginEmail');
    const passInput = document.getElementById('password') || document.getElementById('loginPassword');
    const alertBox = document.getElementById('loginAlert');

    let isValid = true;
    const inputs = [loginInput, passInput].filter(Boolean);

    inputs.forEach(function (input) {
      input.classList.remove('is-invalid');
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

    if (isValid) {
      const user = { login: loginInput ? loginInput.value.trim() : '' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      if (alertBox) {
        alertBox.textContent = 'Вход выполнен успешно!';
        alertBox.style.color = '#10b981';
      }
      alert('Вход выполнен успешно!');
      window.location.href = '../index.html';
    }
  });
}
