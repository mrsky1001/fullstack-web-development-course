// Шаг 4: Шаблонные строки для создания HTML-карточки
// Теория по этой теме подробно описана в файле README.md в этой папке.

const room = OFFICE_ROOMS[0];

// Создаем настоящую HTML-карточку СмартОфис с помощью обратных кавычек `:
const cardHTML = `
  <div class="room-card">
    <div class="card-img-wrap">
      <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../../site/img/no-image.svg'">
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
          <a href="../../site/pages/booking.html?id=${room.id}" class="btn btn-primary">Забронировать</a>
        </div>
      </div>
    </div>
  </div>
`;

const container = document.getElementById('catalogContainer');
if (container) {
  container.innerHTML = cardHTML;
  console.log('Первая карточка успешно отрисована через шаблонную строку.');
}
