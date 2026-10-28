// Шаг 2: Фильтрация по названию
const searchInput = document.getElementById('demoSearch');
const container = document.getElementById('demoGrid');

function render(list) {
  if (!container) return;
  container.innerHTML = list.map(r => `
    <div class="room-card" style="padding:16px; border:1px solid #334155; border-radius:8px;">
      <h3>${r.title}</h3>
      <p style="color:#06b6d4; font-weight:bold;">${r.pricePerHour} ₽ / час</p>
    </div>
  `).join('');
}

if (searchInput && typeof OFFICE_ROOMS !== 'undefined') {
  render(OFFICE_ROOMS);

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = OFFICE_ROOMS.filter(room => room.title.toLowerCase().includes(query));
    render(filtered);
    console.log('Найдено комнат:', filtered.length);
  });
}
