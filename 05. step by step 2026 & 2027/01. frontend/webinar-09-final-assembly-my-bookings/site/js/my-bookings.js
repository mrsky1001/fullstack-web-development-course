// ==========================================================================
// СмартОфис — Вебинар 09: Модуль раздела «Мои бронирования» (my-bookings.js)
// ==========================================================================

function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container) return;

  // [Теория: localStorage] Если в браузере еще нет сохраненных заявок,
  // загружаем стартовый список MOCK_BOOKINGS из файла data.js для наглядности
  if (!localStorage.getItem('myBookings') && typeof MOCK_BOOKINGS !== 'undefined') {
    localStorage.setItem('myBookings', JSON.stringify(MOCK_BOOKINGS));
  }

  // Функция отрисовки списка бронирований
  function renderList() {
    // Считываем актуальный массив бронирований из localStorage и преобразуем из строки JSON в массив
    const bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');

    // Если список пуст — показываем аккуратную заглушку
    if (bookings.length === 0) {
      container.innerHTML = '<p class="empty-bookings">У вас пока нет активных бронирований.</p>';
      return;
    }

    // [Логика: метод .map()] Преобразуем каждый объект бронирования в HTML-карточку
    container.innerHTML = bookings.map(function (b) {
      // Поддерживаем как date, так и createdAt, чтобы поле даты никогда не было пустым или undefined
      const dateText = b.date || b.createdAt || 'Не указана';

      return `
        <div class="booking-item">
          <!-- Левая часть карточки: название комнаты, дата, длительность и итоговая сумма -->
          <div class="booking-info">
            <h3>${b.roomTitle || 'Офисная комната'}</h3>
            <p class="booking-meta">Дата: ${dateText} | Длительность: ${b.hours} ч.</p>
            <p class="booking-price">Сумма: ${b.totalPrice} ₽</p>
          </div>
          <!-- Правая часть: кнопка отмены бронирования с передачей уникального ID -->
          <button class="btn-cancel" onclick="cancelBooking('${b.id}')">Отменить</button>
        </div>
      `;
    }).join('');
  }

  // [Логика: метод .filter()] Функция отмены бронирования по ID
  window.cancelBooking = function (id) {
    let bookings = JSON.parse(localStorage.getItem('myBookings') || '[]');
    // Оставляем только те бронирования, чей ID не совпадает с удаляемым
    bookings = bookings.filter(b => String(b.id) !== String(id));
    // Сохраняем обновленный массив обратно в localStorage
    localStorage.setItem('myBookings', JSON.stringify(bookings));
    // Перерисовываем список на экране
    renderList();

    // [Toast-уведомление] Сообщаем пользователю об успешной отмене
    if (typeof showToast === 'function') {
      showToast('Бронирование отменено');
    }
  };

  // Первоначальный запуск отрисовки списка при загрузке страницы
  renderList();
}
