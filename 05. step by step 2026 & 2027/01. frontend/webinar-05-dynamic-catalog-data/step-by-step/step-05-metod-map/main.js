// Шаг 5: Генерация всего каталога через .map()
const container = document.getElementById('demoContainer');

if (container && typeof OFFICE_ROOMS !== 'undefined') {
  const cardsHtml = OFFICE_ROOMS.map(function (room) {
    return `
      <div class="room-card">
        <div class="card-img-wrap">
          <img src="${room.image}" alt="${room.title}" class="card-img">
        </div>
        <div class="card-content">
          <h3 class="card-title">${room.title}</h3>
          <div class="card-footer">
            <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
            <a href="?id=${room.id}" class="btn btn-primary">Выбрать</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
  console.log('Каталог успешно отрисован!');
}
