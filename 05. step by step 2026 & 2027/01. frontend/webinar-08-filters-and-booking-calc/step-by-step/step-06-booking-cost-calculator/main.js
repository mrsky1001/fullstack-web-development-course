// Шаг 6: Калькулятор стоимости бронирования
// Теория по этой теме подробно описана в файле README.md в этой папке.

const roomSelect = document.getElementById('roomSelect');
const hoursInput = document.getElementById('hoursInput');
const pricePerHourEl = document.getElementById('pricePerHour');
const totalPriceEl = document.getElementById('totalPrice');

if (typeof OFFICE_ROOMS !== 'undefined' && roomSelect) {
  // Заполняем выпадающий список комнатами:
  roomSelect.innerHTML = OFFICE_ROOMS.map(room => `
    <option value="${room.id}">${room.title} — ${room.pricePerHour} ₽/час</option>
  `).join('');

  function calculate() {
    const selectedRoom = OFFICE_ROOMS.find(r => r.id === roomSelect.value) || OFFICE_ROOMS[0];
    const hours = parseInt(hoursInput.value, 10) || 1;
    const total = selectedRoom.pricePerHour * hours;

    if (pricePerHourEl) pricePerHourEl.textContent = `${selectedRoom.pricePerHour} ₽`;
    if (totalPriceEl) totalPriceEl.textContent = `${total} ₽`;

    console.log('Пересчет стоимости:', hours, 'ч *', selectedRoom.pricePerHour, '₽ =', total, '₽');
  }

  roomSelect.addEventListener('change', calculate);
  hoursInput.addEventListener('input', calculate);

  calculate();
}
