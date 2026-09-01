# Вебинар 8. Интерактивная логика и расчеты: Поиск, сортировка и калькулятор

## 📋 О занятии простыми словами
Сегодня мы реализуем две самые важные интерактивные фичи проекта:
1. **Поиск и сортировку в каталоге:** Пользователь сможет печатать название комнаты в строке поиска и сортировать комнаты по цене (сначала дешевые или сначала дорогие).
2. **Живой калькулятор бронирования:** На странице `pages/booking.html` пользователь выбирает комнату и количество часов, а сайт мгновенно пересчитывает и показывает итоговую стоимость аренды!

---

## 🎯 Что мы сегодня сделаем:
1. Добавим панель поиска и кнопки сортировки в `pages/catalog.html`.
2. Напишем фильтрацию массива через `filter()` и сортировку через `sort()`.
3. Создадим страницу `pages/booking.html` с формой бронирования.
4. Напишем калькулятор, который умножает тариф комнаты на количество часов и обновляет сумму на экране.

---

## 💡 Теория простыми словами

### 1. Как работает живой поиск (`filter`)?
Метод `filter()` проверяет каждый элемент массива. С помощью `.toLowerCase().includes(текст)` мы ищем совпадение названия комнаты без учета регистра (большие или маленькие буквы).

### 2. Как работает сортировка (`sort`)?
```javascript
// Сортировка по возрастанию цены (от дешевых к дорогим):
rooms.sort((a, b) => a.pricePerHour - b.pricePerHour);

// Сортировка по убыванию цены (от дорогих к дешевым):
rooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
```

### 3. Автовыбор комнаты из ссылки (`URLSearchParams`)
Когда пользователь нажимает «Забронировать» в каталоге, ссылка выглядит так: `booking.html?room=focus-1`.  
С помощью `new URLSearchParams(window.location.search).get('room')` JavaScript считывает `focus-1` и сразу выбирает нужную комнату в выпадающем списке!

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Добавляем панель в `pages/catalog.html`
```html
<div class="catalog-toolbar">
  <input type="text" id="searchInput" class="search-input" placeholder="Поиск по названию офиса...">
  <div class="sort-actions">
    <button id="sortAsc" class="btn btn-outline">Цена: по возрастанию ↑</button>
    <button id="sortDesc" class="btn btn-outline">Цена: по убыванию ↓</button>
  </div>
</div>
```

### Шаг 2. Создаем страницу `pages/booking.html`
```html
<div class="form-card">
  <form id="bookingForm">
    <div class="form-group">
      <label class="form-label" for="roomSelect">Выберите комнату</label>
      <select id="roomSelect" class="form-control" required></select>
    </div>

    <div class="form-group">
      <label class="form-label" for="bookingDate">Дата бронирования</label>
      <input type="date" id="bookingDate" class="form-control" required>
    </div>

    <div class="form-group">
      <label class="form-label" for="hoursInput">Количество часов</label>
      <input type="number" id="hoursInput" class="form-control" min="1" max="24" value="2" required>
    </div>

    <div class="form-group">
      <label class="form-label" for="commentInput">Комментарий (необязательно)</label>
      <textarea id="commentInput" class="form-control" rows="3" placeholder="Пожелания..."></textarea>
    </div>

    <div class="calc-summary">
      <div>
        <div>Тариф: <span id="pricePerHour">0 ₽</span>/час</div>
        <div style="font-size: 12px; color: #666;">Без скрытых комиссий</div>
      </div>
      <div class="calc-total" id="totalPrice">0 ₽</div>
    </div>

    <button type="submit" class="btn btn-primary" style="width: 100%;">Забронировать</button>
  </form>
</div>
```

### Шаг 3. Добавляем функции в `js/main.js`
```javascript
// Поиск и сортировка
function initCatalogFilters() {
  const container = document.getElementById('catalogContainer');
  const searchInput = document.getElementById('searchInput');
  const sortAscBtn = document.getElementById('sortAsc');
  const sortDescBtn = document.getElementById('sortDesc');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  let displayedRooms = [...OFFICE_ROOMS];

  function render(rooms) {
    if (!rooms.length) {
      container.innerHTML = '<p class="empty-message">Комнаты не найдены</p>';
      return;
    }
    container.innerHTML = rooms.map(room => `
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

  function applyFilter() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    displayedRooms = OFFICE_ROOMS.filter(r => r.title.toLowerCase().includes(q));
    render(displayedRooms);
  }

  if (searchInput) searchInput.addEventListener('input', applyFilter);

  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(displayedRooms);
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', () => {
      displayedRooms.sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(displayedRooms);
    });
  }

  render(displayedRooms);
}

// Калькулятор стоимости
function initBookingCalc() {
  const form = document.getElementById('bookingForm');
  const roomSelect = document.getElementById('roomSelect');
  const hoursInput = document.getElementById('hoursInput');
  const pricePerHourSpan = document.getElementById('pricePerHour');
  const totalPriceSpan = document.getElementById('totalPrice');
  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  roomSelect.innerHTML = OFFICE_ROOMS.map(r => `
    <option value="${r.id}" data-price="${r.pricePerHour}">${r.title} (${r.pricePerHour} ₽/час)</option>
  `).join('');

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('room');
  if (roomId) roomSelect.value = roomId;

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
  updatePrice();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const appNumber = Math.floor(10000 + Math.random() * 90000);
    alert('Бронирование создано! Номер заявки: №' + appNumber);
    form.reset();
    updatePrice();
  });
}
```

---

## 🏁 Чек-лист для самопроверки
- [x] Поиск по названию в каталоге мгновенно фильтрует карточки.
- [x] Кнопки сортировки по цене перестраивают карточки по возрастанию и убыванию.
- [x] На странице `booking.html` при изменении комнаты или часов итоговая сумма моментально пересчитывается.
- [x] При отправке формы появляется сообщение с номером заявки.
