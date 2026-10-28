// Шаг 5: Отрисовка каталога через метод .map()
// Теория по этой теме подробно описана в файле README.md в этой папке.

const container = document.getElementById('demoContainer');

if (container && typeof OFFICE_ROOMS !== 'undefined') {
  // 1. Метод .map() превращает массив комнат в массив строк HTML:
  const cardsHtml = OFFICE_ROOMS.map(function (room) {
    return `
      <div class="room-card" style="background:#1e293b; padding:18px; border-radius:8px; color:white;">
        <img src="${room.image}" alt="${room.title}" style="width:100%; height:160px; object-fit:cover; border-radius:6px;">
        <h3 style="color:#38bdf8; margin:12px 0 6px;">${room.title}</h3>
        <p style="color:#cbd5e1; font-size:13px; margin:0 0 10px;">Вместимость: ${room.capacity}</p>
        <div style="font-weight:bold; color:#10b981; font-size:16px;">
          ${room.pricePerHour} руб <span>/ час</span>
        </div>
      </div>
    `;
  }).join(''); // join('') склеивает массив строк в один сплошной текст

  // 2. Вставляем полученный HTML в контейнер:
  container.innerHTML = cardsHtml;
  console.log('Каталог успешно отрисован!');
}
