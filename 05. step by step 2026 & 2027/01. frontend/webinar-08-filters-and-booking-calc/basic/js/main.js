// СмартОфис — Вебинар 08: Фильтрация, живой поиск и калькулятор бронирования

document.addEventListener('DOMContentLoaded', function () {
 console.log('DOM готов. Запуск поиска и калькулятора...');
 initNavigation();
 if (typeof OFFICE_ROOMS !== 'undefined') {
 renderCatalog(OFFICE_ROOMS);
 initFilters();
 initBookingCalc();
 }
});

// Навигация
function initNavigation() {
 const navLinks = document.querySelectorAll('.nav-link');
 navLinks.forEach(function (link) {
 link.addEventListener('click', function () {
 navLinks.forEach(function (item) { item.classList.remove('active'); });
 link.classList.add('active');
 });
 });
}

// Отрисовка комнат
function renderCatalog(roomsList) {
 const container = document.getElementById('catalogRooms');
 if (!container || !roomsList) return;

 if (roomsList.length === 0) {
 container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">По вашему запросу ничего не найдено </p>';
 return;
 }

 container.innerHTML = roomsList.map(function (room) {
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
 <a href="booking.html?id=${room.id}" class="btn btn-primary">Забронировать</a>
 </div>
 </div>
 </div>
 </div>
 `;
 }).join('');
}

// Фильтры и живой поиск
function initFilters() {
 const searchInput = document.getElementById('searchInput');
 const sortSelect = document.getElementById('sortSelect');

 if (!searchInput && !sortSelect) return;

 function applyFilters() {
 let result = [...OFFICE_ROOMS];

 // 1. Поиск по названию
 if (searchInput && searchInput.value.trim()) {
 const query = searchInput.value.trim().toLowerCase();
 result = result.filter(function (room) {
 return room.title.toLowerCase().includes(query);
 });
 }

 // 2. Сортировка по цене
 if (sortSelect) {
 if (sortSelect.value === 'price-asc') {
 result.sort((a, b) => a.pricePerHour - b.pricePerHour);
 } else if (sortSelect.value === 'price-desc') {
 result.sort((a, b) => b.pricePerHour - a.pricePerHour);
 }
 }

 renderCatalog(result);
 }

 if (searchInput) searchInput.addEventListener('input', applyFilters);
 if (sortSelect) sortSelect.addEventListener('change', applyFilters);
}

// Калькулятор на странице бронирования
function initBookingCalc() {
 const hoursInput = document.getElementById('bookingHours');
 const roomSelect = document.getElementById('bookingRoomSelect');
 const totalDisplay = document.getElementById('totalPriceDisplay');

 if (!hoursInput || !totalDisplay || typeof OFFICE_ROOMS === 'undefined') return;

 function calculateTotal() {
 const hours = parseInt(hoursInput.value) || 0;
 const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
 const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];

 const total = hours * room.pricePerHour;
 totalDisplay.textContent = total + ' ₽';
 }

 hoursInput.addEventListener('input', calculateTotal);
 if (roomSelect) roomSelect.addEventListener('change', calculateTotal);

 calculateTotal();
}
