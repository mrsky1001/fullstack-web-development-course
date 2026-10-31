// ==========================================================================
// СмартОфис — Вебинар 09: Модуль оформления бронирования (booking.js)
// ==========================================================================

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const hoursInput = document.getElementById('hoursInput') || document.getElementById('bookingHours');
  const roomSelect = document.getElementById('roomSelect') || document.getElementById('bookingRoomSelect');
  const totalDisplay = document.getElementById('totalPrice') || document.getElementById('totalPriceDisplay');
  const pricePerHourDisplay = document.getElementById('pricePerHour');

  if (!form || typeof OFFICE_ROOMS === 'undefined') return;

  // Динамически заполняем список комнат в select, если он пуст
  if (roomSelect && roomSelect.options.length === 0) {
    OFFICE_ROOMS.forEach(function (room) {
      const opt = document.createElement('option');
      opt.value = room.id;
      opt.textContent = `${room.title} (${room.pricePerHour} ₽/час)`;
      roomSelect.appendChild(opt);
    });

    const urlId = new URLSearchParams(window.location.search).get('id');
    if (urlId) roomSelect.value = urlId;
  }

  function updateTotal() {
    if (!hoursInput || !totalDisplay) return;
    const hours = parseInt(hoursInput.value) || 0;
    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];

    if (pricePerHourDisplay && room) {
      pricePerHourDisplay.textContent = `${room.pricePerHour} ₽`;
    }

    totalDisplay.textContent = (hours * (room ? room.pricePerHour : 0)) + ' ₽';
  }

  if (hoursInput) hoursInput.addEventListener('input', updateTotal);
  if (roomSelect) roomSelect.addEventListener('change', updateTotal);
  updateTotal();

  // Обработка отправки формы бронирования (Вебинар 09)
  form.addEventListener('submit', function (event) {
    // Отменяем стандартную перезагрузку страницы браузером
    event.preventDefault();

    // Определяем выбранную комнату и количество часов
    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];
    const hours = parseInt(hoursInput.value) || 1;

    // Считываем выбранную дату или берем текущую
    const dateInput = document.getElementById('bookingDate') || document.getElementById('date');
    const bookingDate = (dateInput && dateInput.value) ? dateInput.value : new Date().toLocaleDateString('ru-RU');

    // [Теория: создание объекта] Формируем новую запись бронирования
    const newBooking = {
      id: 'book-' + Date.now(), // Уникальный ID на основе текущего времени в миллисекундах
      roomId: room.id,
      roomTitle: room.title,
      hours: hours,
      totalPrice: hours * room.pricePerHour,
      date: bookingDate,
      createdAt: bookingDate
    };

    // [Теория: localStorage] Получаем массив существующих заявок, добавляем новую и сохраняем
    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('myBookings', JSON.stringify(bookings));

    // [Toast-уведомление] Показываем красивое всплывающее окно сверху справа
    if (typeof showToast === 'function') {
      showToast('Бронирование оформлено! Переходим в раздел «Мои бронирования».');
    }

    // Через 1.2 секунды (после показа уведомления) перенаправляем на страницу «Мои бронирования»
    setTimeout(function () {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}
