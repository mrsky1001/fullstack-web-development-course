// Шаг 2: Список «Мои бронирования» и отмена записи
// Теория по этой теме подробно описана в файле README.md в этой папке.

const container = document.getElementById('myBookingsList');

function renderBookings() {
  if (!container) return;
  const list = JSON.parse(localStorage.getItem('smartoffice_bookings') || '[]');

  if (list.length === 0) {
    container.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 30px;">У вас пока нет активных бронирований.</p>';
    return;
  }

  container.innerHTML = list.map(b => `
    <div class="booking-card" style="display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #334155;">
      <div>
        <h3 style="color: #38bdf8; margin: 0 0 8px;">${b.roomTitle || 'Офисная комната'}</h3>
        <p style="margin: 0; color: #94a3b8; font-size: 14px;">Дата: ${b.date} | Часов: ${b.hours} | Итого: <strong style="color: white;">${b.totalPrice} ₽</strong></p>
      </div>
      <button class="btn btn-danger" onclick="cancelBooking('${b.id}')" style="background: #ef4444; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">Отменить</button>
    </div>
  `).join('');
}

window.cancelBooking = function (id) {
  let list = JSON.parse(localStorage.getItem('smartoffice_bookings') || '[]');
  list = list.filter(item => item.id !== id);
  localStorage.setItem('smartoffice_bookings', JSON.stringify(list));
  renderBookings();
  console.log('Бронирование отменено, ID:', id);
};

// Заполняем тестовыми бронированиями, если хранилище пустое:
if (!localStorage.getItem('smartoffice_bookings')) {
  localStorage.setItem('smartoffice_bookings', JSON.stringify([
    { id: '101', roomTitle: 'Мини-офис Focus', date: '2026-11-01', hours: 3, totalPrice: 1350 },
    { id: '102', roomTitle: 'Конференц-зал Alpha', date: '2026-11-03', hours: 2, totalPrice: 2400 }
  ]));
}

renderBookings();
