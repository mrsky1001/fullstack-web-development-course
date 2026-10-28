// Шаг 7: Поиск комнаты через .find() и вывод описания
const params = new URLSearchParams(window.location.search);
const targetId = params.get('id') || 'focus-1';

// Находим комнату в базе данных
const selectedRoom = OFFICE_ROOMS.find(function (room) {
  return room.id === targetId;
});

const container = document.getElementById('demoContainer');
if (container && selectedRoom) {
  container.innerHTML = `
    <div class="room-details-card">
      <h2>${selectedRoom.title}</h2>
      <p style="color: #cbd5e1; margin: 12px 0;">${selectedRoom.description}</p>
      <p>Вместимость: <strong>${selectedRoom.capacity}</strong></p>
      <p>Площадь: <strong>${selectedRoom.area}</strong></p>
      <h3 style="color: #10b981; margin-top: 16px;">${selectedRoom.pricePerHour} ₽ / час</h3>
    </div>
  `;
  console.log('Найдена и отображена комната:', selectedRoom.title);
}
