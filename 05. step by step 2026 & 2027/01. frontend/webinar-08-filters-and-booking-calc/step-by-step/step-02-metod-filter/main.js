// Шаг 2: Метод массива .filter()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const searchInput = document.getElementById('searchInput');
const container = document.getElementById('catalogContainer');

function render(list) {
  if (!container) return;
  container.innerHTML = list.map(room => `
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
            <a href="../../basic/pages/catalog.html" class="btn btn-outline">Подробнее</a>
            <a href="../../basic/pages/catalog.html" class="btn btn-primary">Забронировать</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

if (searchInput && typeof OFFICE_ROOMS !== 'undefined') {
  render(OFFICE_ROOMS);

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase().trim();

    // Метод .filter() оставляет только те комнаты, в названии которых есть введенный текст:
    const filtered = OFFICE_ROOMS.filter(function (room) {
      return room.title.toLowerCase().includes(query);
    });

    render(filtered);
    console.log('Найдено комнат:', filtered.length);
  });
}
