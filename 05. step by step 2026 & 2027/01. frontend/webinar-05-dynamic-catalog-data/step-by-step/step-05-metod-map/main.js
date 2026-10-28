// Шаг 5: Отрисовка каталога через метод .map()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const container = document.getElementById('catalogContainer');

if (container && typeof OFFICE_ROOMS !== 'undefined') {
  // 1. Метод .map() превращает каждый объект комнаты в строку HTML-разметки:
  const cardsHtml = OFFICE_ROOMS.map(function (room) {
    return `
      <div class="room-card">
        <div class="card-img-wrap">
          <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../../basic/img/no-image.svg'">
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
              <a href="../../basic/pages/booking.html?id=${room.id}" class="btn btn-primary">Забронировать</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join(''); // Метод .join('') объединяет массив строк в один единый текст HTML

  // 2. Вставляем полученную верстку в контейнер:
  container.innerHTML = cardsHtml;
  console.log('Каталог успешно отрисован! Комнат показано:', OFFICE_ROOMS.length);
}
