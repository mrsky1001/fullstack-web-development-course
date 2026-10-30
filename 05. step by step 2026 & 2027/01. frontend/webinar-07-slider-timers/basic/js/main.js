// СмартОфис — Вебинар 07: Интерактивный слайдер и таймеры

console.log('Инициализация слайдера и компонентов...');
initNavigation();
initSlider();
renderCatalog();
initRoomDetails();
initRegisterForm();
initLoginForm();

// 1. Навигация
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.toLowerCase();

  navLinks.forEach(function (link) {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href) {
      const pageName = href.split('/').pop().toLowerCase();
      if (pageName && currentPath.endsWith(pageName)) {
        link.classList.add('active');
      } else if (currentPath.includes('room-details') && pageName.includes('catalog')) {
        link.classList.add('active');
      }
    }

    link.addEventListener('click', function () {
      navLinks.forEach(function (item) { item.classList.remove('active'); });
      link.classList.add('active');
    });
  });

  const hasActive = document.querySelector('.nav-link.active');
  if (!hasActive && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  // Обновляем кнопку в шапке, если пользователь авторизован
  updateAuthStatus();
}

// 2. Модуль интерактивного слайдера (Тема Вебинара 07)
function initSlider() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let timerId = null;

  // Функция показа конкретного слайда
  function showSlide(index) {
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.forEach(function (slide, idx) {
      if (idx === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach(function (dot, idx) {
      if (idx === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    timerId = setInterval(nextSlide, 3500);
  }

  function stopAutoPlay() {
    if (timerId) {
      clearInterval(timerId);
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach(function (dot, idx) {
    dot.addEventListener('click', function () {
      showSlide(idx);
      startAutoPlay();
    });
  });

  startAutoPlay();
}

// 3. Рендеринг каталога (из Вебинара 05)
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

// 4. Детальная страница комнаты (из Вебинара 05)
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

// 5. Валидация формы регистрации (из Вебинара 06)
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const loginInput = document.getElementById('login') || document.getElementById('regName');
    const passInput = document.getElementById('password') || document.getElementById('regPassword');
    const confirmInput = document.getElementById('confirmPassword') || document.getElementById('regConfirmPassword');
    const emailInput = document.getElementById('email') || document.getElementById('regEmail');
    const nameInput = document.getElementById('fullName');

    let isValid = true;
    const requiredInputs = [loginInput, passInput, confirmInput, emailInput, nameInput].filter(Boolean);

    requiredInputs.forEach(function (input) {
      input.classList.remove('is-invalid');
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      }
    });

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

// 6. Валидация формы входа (из Вебинара 06)
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

// Отображение статуса авторизации в шапке
function updateAuthStatus() {
  const authBtn = document.getElementById('authNavBtn');
  if (!authBtn) return;

  const userJson = localStorage.getItem('currentUser');
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      const name = user.name || user.login || 'Пользователь';
      authBtn.textContent = 'Выйти (' + name + ')';
      authBtn.href = '#';
      authBtn.onclick = function (e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        alert('Вы вышли из системы.');
        window.location.reload();
      };
    } catch (e) {}
  }
}
