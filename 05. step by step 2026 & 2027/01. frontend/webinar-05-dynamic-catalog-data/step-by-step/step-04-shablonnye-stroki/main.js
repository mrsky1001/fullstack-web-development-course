// Шаг 4: Шаблонные строки (обратные кавычки)
// Теория по этой теме подробно описана в файле README.md в этой папке.

const room = OFFICE_ROOMS[0];

// Создаем HTML-разметку с помощью обратных кавычек `
const cardHTML = `
  <div class="room-card" style="max-width: 340px; background: #1e293b; padding: 20px; border-radius: 8px; color: white;">
    <h3 style="color: #38bdf8; margin-top: 0;">${room.title}</h3>
    <p style="color: #cbd5e1; font-size: 14px;">${room.description}</p>
    <div style="margin-top: 14px; font-weight: bold; color: #10b981;">
      Цена: ${room.pricePerHour} руб / час
    </div>
  </div>
`;

const container = document.getElementById('demoContainer');
if (container) {
  container.innerHTML = cardHTML;
}
