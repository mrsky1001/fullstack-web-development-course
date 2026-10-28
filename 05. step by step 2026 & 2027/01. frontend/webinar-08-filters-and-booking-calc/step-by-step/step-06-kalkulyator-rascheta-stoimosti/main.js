// Шаг 6: Калькулятор бронирования
const hoursInput = document.getElementById('calcHours');
const totalOut = document.getElementById('calcTotal');
const PRICE_PER_HOUR = 450; // Стоимость комнаты «Фокус»

function updateCalculation() {
  const hours = parseInt(hoursInput.value) || 0;
  const total = hours * PRICE_PER_HOUR;
  totalOut.textContent = total + ' ₽';
  console.log('Рассчитано:', hours, 'ч. *', PRICE_PER_HOUR, '=', total);
}

if (hoursInput && totalOut) {
  hoursInput.addEventListener('input', updateCalculation);
  updateCalculation();
}
