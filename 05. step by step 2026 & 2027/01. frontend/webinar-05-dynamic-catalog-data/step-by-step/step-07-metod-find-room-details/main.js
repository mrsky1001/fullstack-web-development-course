// Шаг 7: Поиск комнаты методом .find()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const params = new URLSearchParams(window.location.search);
const targetId = params.get('id') || 'focus-1';

// Метод .find() ищет первый элемент в массиве, подходящий под условие
const selectedRoom = OFFICE_ROOMS.find(function (room) {
  return room.id === targetId;
});

console.log('Результат поиска:', selectedRoom);

const container = document.getElementById('demoContainer');
if (container) {
  if (selectedRoom) {
    container.innerHTML = `
      <div class="room-details-card" style="background:#1e293b; padding:24px; border-radius:10px; color:white;">
        <h2 style="color:#38bdf8; margin-top:0;">${selectedRoom.title}</h2>
        <p style="color:#cbd5e1; line-height:1.6;">${selectedRoom.description}</p>
        <p>Вместимость: <strong>${selectedRoom.capacity}</strong></p>
        <p>Площадь: <strong>${selectedRoom.area}</strong></p>
        <h3 style="color:#10b981; margin:16px 0;">${selectedRoom.pricePerHour} руб / час</h3>
      </div>
    `;
  } else {
    container.innerHTML = '<p style="color:#ef4444;">Комната не найдена.</p>';
  }
}
