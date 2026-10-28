// Шаг 4: Шаблонные строки (Template Literals)
const firstRoom = OFFICE_ROOMS[0];

// Создаём фрагмент HTML для одной карточки
const cardHTML = `
  <div class="room-card" style="max-width: 320px; border: 1px solid #334155; padding: 16px; border-radius: 8px;">
    <h3>${firstRoom.title}</h3>
    <p>Цена: <strong>${firstRoom.pricePerHour} ₽ / час</strong></p>
    <p>Вместимость: ${firstRoom.capacity}</p>
  </div>
`;

const container = document.getElementById('demoContainer');
if (container) {
  container.innerHTML = cardHTML;
}
console.log('HTML сгенерирован успешно!');
