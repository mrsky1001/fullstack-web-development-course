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

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];
    const hours = parseInt(hoursInput.value) || 1;

    const dateInput = document.getElementById('bookingDate') || document.getElementById('date');
    const bookingDate = (dateInput && dateInput.value) ? dateInput.value : new Date().toLocaleDateString('ru-RU');

    const newBooking = {
      id: 'book-' + Date.now(),
      roomId: room.id,
      roomTitle: room.title,
      hours: hours,
      totalPrice: hours * room.pricePerHour,
      date: bookingDate,
      createdAt: bookingDate
    };

    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('myBookings', JSON.stringify(bookings));

    if (typeof showToast === 'function') {
      showToast('Бронирование оформлено! Переходим в раздел «Мои бронирования».');
    }
    setTimeout(function () {
      window.location.href = 'my-bookings.html';
    }, 1200);
  });
}
