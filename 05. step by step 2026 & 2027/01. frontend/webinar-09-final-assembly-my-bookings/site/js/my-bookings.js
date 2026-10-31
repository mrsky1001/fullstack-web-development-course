// ==========================================================================
// СмартОфис — Вебинар 09: Модуль раздела «Мои бронирования» (my-bookings.js)
// ==========================================================================

function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container) return;

  // Если в хранилище еще нет записей, загружаем стартовые бронирования из базы mock-данных
  if (!localStorage.getItem('myBookings') && typeof MOCK_BOOKINGS !== 'undefined') {
    localStorage.setItem('myBookings', JSON.stringify(MOCK_BOOKINGS));
  }

  function renderList() {
    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');

    if (bookings.length === 0) {
      container.innerHTML = '<p class="empty-bookings">У вас пока нет активных бронирований.</p>';
      return;
    }

    container.innerHTML = bookings.map(function (b) {
      // Поддерживаем как date, так и createdAt, чтобы дата никогда не была undefined
      const dateText = b.date || b.createdAt || 'Не указана';

      return `
        <div class="booking-item">
          <div class="booking-info">
            <h3>${b.roomTitle || 'Офисная комната'}</h3>
            <p class="booking-meta">Дата: ${dateText} | Длительность: ${b.hours} ч.</p>
            <p class="booking-price">Сумма: ${b.totalPrice} ₽</p>
          </div>
          <button class="btn-cancel" onclick="cancelBooking('${b.id}')">Отменить</button>
        </div>
      `;
    }).join('');
  }

  window.cancelBooking = function (id) {
    let bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    bookings = bookings.filter(b => String(b.id) !== String(id));
    localStorage.setItem('myBookings', JSON.stringify(bookings));
    renderList();

    if (typeof showToast === 'function') {
      showToast('Бронирование отменено');
    }
  };

  renderList();
}
