// Шаг 7: Поиск комнаты через .find() и вывод карточки
// Теория по этой теме подробно описана в файле README.md в этой папке.

const container = document.getElementById('roomDetailsContainer');

if (container && typeof OFFICE_ROOMS !== 'undefined') {
  const params = new URLSearchParams(window.location.search);
  const roomId = params.get('id') || 'focus-1';

  // Метод .find() находит в массиве первый элемент, подходящий под условие:
  const room = OFFICE_ROOMS.find(function (item) {
    return item.id === roomId;
  });

  if (!room) {
    container.innerHTML = `
      <h2 class="page-title">Комната не найдена</h2>
      <p class="page-subtitle">Пожалуйста, вернитесь в каталог и выберите комнату.</p>
    `;
  } else {
    container.innerHTML = `
      <div class="room-details-card">
        <img src="${room.image}" alt="${room.title}" class="room-details-img">
        <div class="room-details-info">
          <h1 class="page-title">${room.title}</h1>
          <p class="room-desc">${room.description}</p>
          <p><strong>Вместимость:</strong> ${room.capacity}</p>
          <p><strong>Площадь:</strong> ${room.area}</p>
          <div class="room-price-large">${room.pricePerHour} ₽ / час</div>
          <a href="../../basic/pages/booking.html?id=${room.id}" class="btn btn-primary btn-large">Забронировать эту комнату</a>
        </div>
      </div>
    `;
    console.log('Информация о комнате успешно отрисована:', room.title);
  }
}
