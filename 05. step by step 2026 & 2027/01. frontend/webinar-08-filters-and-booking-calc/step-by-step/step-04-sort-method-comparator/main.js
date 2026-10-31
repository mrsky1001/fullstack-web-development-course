// Шаг 4: Сортировка массива через метод .sort()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const sortAscBtn = document.getElementById('sortAsc');
const sortDescBtn = document.getElementById('sortDesc');
const container = document.getElementById('catalogContainer');

function render(list) {
  if (!container) return;
  container.innerHTML = list.map(room => `
    <div class="room-card">
      <div class="card-img-wrap">
        <img src="${room.image}" alt="${room.title}" class="card-img" onerror="this.src='../../site/img/no-image.svg'">
      </div>
      <div class="card-content">
        <h3 class="card-title">${room.title}</h3>
        <div class="card-footer">
          <div class="card-price">${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>
      </div>
    </div>
  `).join('');
}

if (typeof OFFICE_ROOMS !== 'undefined') {
  render(OFFICE_ROOMS);

  if (sortAscBtn) {
    sortAscBtn.addEventListener('click', function () {
      // Сортировка по возрастанию цены:
      const sorted = [...OFFICE_ROOMS].sort((a, b) => a.pricePerHour - b.pricePerHour);
      render(sorted);
      console.log('Отсортировано по возрастанию цены');
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener('click', function () {
      // Сортировка по убыванию цены:
      const sorted = [...OFFICE_ROOMS].sort((a, b) => b.pricePerHour - a.pricePerHour);
      render(sorted);
      console.log('Отсортировано по убыванию цены');
    });
  }
}
