const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
}

// -----------------------------------------------------------------------------
// WEBINAR 3 README
// -----------------------------------------------------------------------------
const WEBINAR_03_README = `# Вебинар 3. Современные методы верстки: Flexbox-раскладка и карточки комнат

## 📋 О занятии простыми словами
На этом занятии мы создадим секцию **«Популярные офисные комнаты»** на главной странице (\`index.html\`).

Мы сверстаем 3 карточки с фотографиями, названиями, списком оборудования и кнопками:
1. Кнопка-иконка детального просмотра (\`.btn-icon\` с аккуратным SVG-глазком) для перехода к подробному описанию.
2. Акцентная кнопка «Забронировать».

---

## 🎯 Что мы сегодня сделаем:
1. Создадим секцию \`<section class="popular-section">\`.
2. Добавим контейнер сетки \`<div class="rooms-grid">\`.
3. Сверстаем 3 карточки \`<div class="room-card">\`.
4. Стилизуем фотографии с помощью свойства \`object-fit: cover\`.
5. Добавим стили кнопок \`.btn-primary\`, \`.btn-outline\` и компактной кнопки-иконки \`.btn-icon\`.

---

## 💡 Теория простыми словами

### 1. Что такое Flexbox и зачем он нужен?
Flexbox — это инструмент CSS, который позволяет автоматически выстраивать блоки в ряд, распределять свободное место между ними и аккуратно переносить элементы на следующую строку.
- \`display: flex\` — включает режим гибкого контейнера.
- \`flex-wrap: wrap\` — разрешает перенос карточек на новую строку, если они не помещаются.
- \`gap: 20px\` — задает аккуратный промежуток между карточками.

### 2. Зачем нужно свойство \`object-fit: cover\`?
Если фото слишком высокое или широкое, браузер может растянуть или сплющить его. Свойство \`object-fit: cover\` обрезает края картинки так, чтобы она заполнила весь блок и сохранила свои естественные пропорции!

### 3. Как сделать кнопку-иконку?
\`\`\`css
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #007bff;
  color: #007bff;
}
.btn-icon:hover {
  background-color: #eaf2ff;
}
\`\`\`

---

## 🏁 Чек-лист для самопроверки
- [x] На главной странице отображаются 3 карточки в один ряд.
- [x] Фотографии в карточках не искажаются и имеют ровную высоту.
- [x] В футере каждой карточки есть цена, кнопка-иконка просмотра и кнопка «Забронировать».
- [x] Внизу секции есть кнопка «Больше офисов», ведущая в каталог.
`;

// -----------------------------------------------------------------------------
// WEBINAR 5 README
// -----------------------------------------------------------------------------
const WEBINAR_05_README = `# Вебинар 5. Работа с данными: База данных в JS, каталог и страница описания комнаты

## 📋 О занятии простыми словами
На этом занятии мы создадим сразу две важнейшие страницы:
1. **«Каталог офисов»** (\`pages/catalog.html\`)
2. **«Описание комнаты»** (\`pages/room-details.html\`)

Вместо того чтобы вручную верстать отдельную HTML-страницу для каждого офиса, мы применим профессиональный подход:
- Опишем все офисы в файле данных \`js/data.js\` в виде массива объектов \`OFFICE_ROOMS\` (название, цена, площадь, вместимость, описание, список удобств).
- Напишем функцию \`renderCatalog()\`, которая выведет все карточки в каталоге с кнопкой-иконкой просмотра и кнопкой «Забронировать».
- Напишем функцию \`initRoomDetails()\`, которая по параметру ссылки (например, \`room-details.html?id=focus-1\`) найдет нужную комнату и выведет ее подробное описание!

---

## 🎯 Что мы сегодня создадим:
1. Файл \`js/data.js\` с полной информацией о 6 офисах.
2. Страницу каталога \`pages/catalog.html\` с динамической сеткой \`<div id="catalogContainer">\`.
3. Страницу описания комнаты \`pages/room-details.html\` с контейнером \`<div id="roomDetailsContainer">\`.
4. Две JavaScript-функции: \`renderCatalog()\` и \`initRoomDetails()\`.

---

## 💡 Теория простыми словами

### 1. Что такое массив объектов?
Массив — это список. Объект — это карточка с характеристиками конкретной комнаты:
\`\`\`javascript
const OFFICE_ROOMS = [
  {
    id: 'focus-1',
    title: 'Мини-офис Focus',
    pricePerHour: 450,
    capacity: '1-2 человека',
    area: '12 м²',
    description: 'Идеальное тихое пространство для индивидуальной работы...',
    equipment: ['Wi-Fi 500 Мбит/с', '4K Монитор', 'Эргономичное кресло'],
    image: '../img/room-1.jpg'
  },
  // другие комнаты...
];
\`\`\`

### 2. Как передать ID комнаты через адресную строку (GET-параметр)?
Когда пользователь нажимает кнопку-иконку, ссылка выглядит так:
\`pages/room-details.html?id=focus-1\`

Знак \`?\` начинает передачу параметров, а \`id=focus-1\` сообщает странице, какую именно комнату показать!

### 3. Как JavaScript считывает параметр из URL?
\`\`\`javascript
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id'); // Получаем "focus-1"
const room = OFFICE_ROOMS.find(r => r.id === roomId); // Находим объект комнаты в базе
\`\`\`

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Создаем \`pages/room-details.html\`
\`\`\`html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Описание комнаты — СмартОфис</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <!-- Шапка -->
  <main class="main">
    <div class="container" id="roomDetailsContainer">
      <!-- Заполняется через JS -->
    </div>
  </main>
  <!-- Подвал -->
</body>
</html>
\`\`\`

### Шаг 2. Добавляем логику страницы описания в \`js/main.js\`
\`\`\`javascript
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = \`
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    \`;
    return;
  }

  container.innerHTML = \`
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="\${room.image}" alt="\${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">\${room.title}</h1>
          <div class="room-details-price">\${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">\${room.capacity}</span>
          <span class="room-badge">\${room.area}</span>
          \${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>

        <p class="room-description">\${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            \${room.equipment.map(item => \`<li>\${item}</li>\`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=\${room.id}" class="btn btn-primary">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline">← Назад в каталог</a>
        </div>
      </div>
    </div>
  \`;
}
\`\`\`

---

## 🏁 Чек-лист для самопроверки
- [x] В каталоге на каждой карточке есть кнопка-иконка просмотра деталей и кнопка «Забронировать».
- [x] Клик по карточке или кнопке-иконке открывает страницу \`room-details.html?id=...\` с фото, описанием, площадью и удобствами выбранной комнаты.
- [x] Кнопка «Забронировать эту комнату» со страницы описания ведет на форму бронирования.
- [x] При переходе по неверному ID выводится понятное сообщение «Комната не найдена» и кнопка возврата.
`;

console.log('Writing updated README files for webinar 3 and 5...');
write(path.join(ROOT, 'webinar-03-flexbox-grid-cards', 'README.md'), WEBINAR_03_README);
write(path.join(ROOT, 'webinar-05-dynamic-catalog-data', 'README.md'), WEBINAR_05_README);
console.log('Done!');
