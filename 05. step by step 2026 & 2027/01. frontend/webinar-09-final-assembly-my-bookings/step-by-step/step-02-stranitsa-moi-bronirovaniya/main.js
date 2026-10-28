// Шаг 2: Список «Мои бронирования» и отмена записи
// Теория по этой теме подробно описана в файле README.md в этой папке.

const container = document.getElementById('demoBookings');

function loadAndRender() {
  const list = JSON.parse(localStorage.getItem('demoBookingsList') || '[]');

  if (list.length === 0) {
    container.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 20px;">Нет активных бронирований.</p>';
    return;
  }

  container.innerHTML = list.map(b => `
    <div class="booking-item-card">
      <div>
        <h4 style="color:#38bdf8; margin:0 0 6px;">${b.title}</h4>
        <p style="margin:0; font-size:13px; color:#cbd5e1;">Часов: ${b.hours} | Итого: <strong>${b.price} руб</strong></p>
      </div>
      <button onclick="removeBooking('${b.id}')" style="background:#ef4444; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer;">Отменить</button>
    </div>
  `).join('');
}

// Функция отмены: удаляет бронь по id через .filter()
window.removeBooking = function (id) {
  let list = JSON.parse(localStorage.getItem('demoBookingsList') || '[]');
  list = list.filter(item => item.id !== id);
  localStorage.setItem('demoBookingsList', JSON.stringify(list));
  loadAndRender();
};

// Заполняем тестовыми данными, если список пуст:
if (!localStorage.getItem('demoBookingsList')) {
  localStorage.setItem('demoBookingsList', JSON.stringify([
    { id: '1', title: 'Мини-офис Focus', hours: 3, price: 1350 },
    { id: '2', title: 'Конференц-зал Alpha', hours: 2, price: 2400 }
  ]));
}

loadAndRender();
