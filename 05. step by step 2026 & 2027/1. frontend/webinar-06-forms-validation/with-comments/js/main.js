// СмартОфис — Скрипт веб-приложения (Вебинар 6)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  renderCatalog();
  initRegisterForm();
  initLoginForm();
});

function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    link.classList.remove('active');

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


function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => `
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
          <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
        </div>
      </div>
    </div>
  `).join('');
}



// [Теория: Валидация форм на стороне клиента улучшает UX и снижает нагрузку на сервер]
// [Логика: Инициализация логики регистрации и валидация обязательных полей]
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  // [Теория: Событие submit срабатывает при попытке отправить форму (нажатие Enter или type="submit")]
  form.addEventListener('submit', (e) => {
    // [Теория: e.preventDefault() отменяет стандартное поведение браузера (перезагрузку страницы при отправке)]
    e.preventDefault();
    let isValid = true;
    
    // [Логика: Массив ID всех полей, которые мы хотим проверить на заполненность]
    const fields = ['login', 'password', 'confirmPassword', 'fullName', 'email', 'phone'];
    fields.forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      
      // [Теория: метод trim() удаляет пробелы в начале и конце строки]
      // [Логика: Если после удаления пробелов строка пустая — поле не заполнено]
      if (!input.value.trim()) {
        // [Логика: Добавляем класс ошибки для подсветки поля красным и показа текста ошибки]
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    });

    // [Логика: Дополнительная проверка на совпадение паролей]
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (pass && confirm && pass.value && confirm.value && pass.value !== confirm.value) {
      confirm.classList.add('is-invalid');
      isValid = false;
    }

    // [Логика: Если ошибок нет, имитируем успешную регистрацию]
    if (isValid) {
      // [Теория: Метод form.reset() очищает все поля формы]
      form.reset();
      // [Логика: Вызываем нашу кастомную модалку вместо системного alert()]
      showModal('Пользователь зарегистрирован успешно!', 'login.html');
    }
  });
}

// [Логика: Инициализация формы входа]
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();
    const alertBox = document.getElementById('loginAlert');

    // [Логика: Имитация авторизации со статичными данными (admin/12345)]
    if (login === 'admin' && pass === '12345') {
      if (alertBox) alertBox.style.display = 'none';
      // [Логика: При успехе перенаправляем на главную страницу]
      showModal('Успешный вход в систему!', '../index.html');
    } else {
      // [Логика: При ошибке показываем блок с текстом прямо над формой]
      if (alertBox) {
        alertBox.textContent = 'Неверный логин или пароль';
        alertBox.className = 'form-alert alert-danger';
        alertBox.style.display = 'block';
      }
    }
  });
}


// [Теория: Динамическое создание HTML-элементов через JavaScript позволяет избегать дублирования модалок в каждом HTML-файле]
// [Логика: Кастомное модальное окно, заменяющее блокирующий системный alert()]
function showModal(message, redirectUrl = null) {
  // [Теория: document.createElement() создает новый HTML-тег в памяти]
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = '<div class="modal-content"><p>' + message + '</p><button class="btn btn-primary" id="modalCloseBtn">OK</button></div>';
  
  // [Теория: appendChild() добавляет созданный элемент в конец родительского (в данном случае <body>)]
  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('#modalCloseBtn');
  closeBtn.addEventListener('click', () => {
    // [Теория: метод remove() удаляет элемент из DOM-дерева]
    modal.remove();
    // [Логика: Если передан redirectUrl, меняем локацию страницы после закрытия окна]
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
}
