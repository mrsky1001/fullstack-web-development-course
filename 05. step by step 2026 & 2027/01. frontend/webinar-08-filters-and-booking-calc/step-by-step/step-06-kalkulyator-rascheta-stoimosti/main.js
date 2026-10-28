// Шаг 6: Калькулятор бронирования
// Теория по этой теме подробно описана в файле README.md в этой папке.

const hoursInput = document.getElementById('calcHours');
const totalOut = document.getElementById('calcTotal');
const PRICE_PER_HOUR = 450; // Цена комнаты в час

function updateCalculation() {
  // Превращаем текст из поля ввода в целое число:
  const hours = parseInt(hoursInput.value) || 0;
  const total = hours * PRICE_PER_HOUR;

  totalOut.textContent = total + ' руб';
  console.log('Итог расчета:', hours, 'часов *', PRICE_PER_HOUR, '=', total);
}

if (hoursInput && totalOut) {
  hoursInput.addEventListener('input', updateCalculation);
  updateCalculation();
}
