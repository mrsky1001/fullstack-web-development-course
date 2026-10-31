// ==========================================================================
// СмартОфис — Вебинар 08: Модуль калькулятора бронирования (booking.js)
// ==========================================================================

function initBookingCalc() {
  const hoursInput = document.getElementById('hoursInput') || document.getElementById('bookingHours');
  const roomSelect = document.getElementById('roomSelect') || document.getElementById('bookingRoomSelect');
  const totalDisplay = document.getElementById('totalPrice') || document.getElementById('totalPriceDisplay');
  const pricePerHourDisplay = document.getElementById('pricePerHour');

  if (!hoursInput || !totalDisplay || typeof OFFICE_ROOMS === 'undefined') return;

  // Если список комнат в select пустой, динамически заполняем его данными
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

  function calculateTotal() {
    const hours = parseInt(hoursInput.value) || 0;
    const selectedId = roomSelect ? roomSelect.value : (new URLSearchParams(window.location.search).get('id') || 'focus-1');
    const room = OFFICE_ROOMS.find(r => r.id === selectedId) || OFFICE_ROOMS[0];

    if (pricePerHourDisplay && room) {
      pricePerHourDisplay.textContent = `${room.pricePerHour} ₽`;
    }

    // Формула: часы × почасовая ставка комнаты
    const total = room ? hours * room.pricePerHour : 0;
    totalDisplay.textContent = total + ' ₽';
  }

  hoursInput.addEventListener('input', calculateTotal);
  if (roomSelect) roomSelect.addEventListener('change', calculateTotal);

  calculateTotal();

  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (typeof showToast === 'function') {
        showToast('Стоимость рассчитана! Сохранение изучается на Вебинаре 09.');
      }
    });
  }
}
