// СмартОфис — Скрипт веб-приложения (Вебинар 5)
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  // [Логика: Запускаем функцию отрисовки каталога сразу после загрузки страницы]
  renderCatalog();
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

// [Теория: Функция отрисовки (рендеринга) отвечает за преобразование данных в HTML-разметку]
// [Логика: Функция берет данные об офисах из OFFICE_ROOMS и вставляет их на страницу каталога]
function renderCatalog() {
  // [Теория: getElementById ищет на странице элемент с указанным id]
  // [Логика: Находим пустой контейнер-сетку, куда будем вставлять карточки]
  const container = document.getElementById('catalogContainer');
  
  // [Теория: typeof проверяет тип переменной, защищая от ошибки, если переменная не существует]
  // [Логика: Прерываем функцию (return), если мы не на странице каталога (нет контейнера) или забыли подключить data.js]
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  // [Теория: Свойство innerHTML позволяет получить или задать HTML-содержимое элемента]
  // [Логика: Мы заменяем пустую внутренность контейнера сгенерированной разметкой]
  container.innerHTML = OFFICE_ROOMS.map(room => `
    <div class="room-card">
      <div class="card-img-wrap">
        <!-- [Теория: Шаблонные строки (обратные кавычки) позволяют встраивать JS-переменные прямо в строку через \${}] -->
        <!-- [Логика: Подставляем путь к картинке и название из базы данных] -->
        <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="card-content">
        <h3 class="card-title">${room.title}</h3>
        <ul class="card-equipment">
          <!-- [Теория: Вложенный map проходит по массиву equipment внутри текущей комнаты и оборачивает каждый пункт в <li>] -->
          ${room.equipment.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="card-footer">
          <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
          <!-- [Логика: Передаем id выбранной комнаты через GET-параметр в URL страницы бронирования] -->
          <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
        </div>
      </div>
    </div>
  `).join(''); // [Теория: Метод join('') склеивает массив получившихся HTML-строк в одну сплошную строку без запятых]
}
