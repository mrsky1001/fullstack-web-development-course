# Вебинар 5. Работа с данными: База данных в JS, каталог и страница описания комнаты

## 📋 О занятии простыми словами
На этом занятии мы создадим сразу две важнейшие страницы:
1. **«Каталог офисов»** (`pages/catalog.html`)
2. **«Описание комнаты»** (`pages/room-details.html`)

Вместо того чтобы вручную верстать отдельную HTML-страницу для каждого офиса, мы применим профессиональный подход:
- Опишем все офисы в файле данных `js/data.js` в виде массива объектов `OFFICE_ROOMS` (название, цена, площадь, вместимость, описание, список удобств).
- Напишем функцию `renderCatalog()`, которая выведет все карточки в каталоге с кнопкой-иконкой просмотра и кнопкой «Забронировать».
- Напишем функцию `initRoomDetails()`, которая по параметру ссылки (например, `room-details.html?id=focus-1`) найдет нужную комнату и выведет ее подробное описание!

---

## 🎯 Что мы сегодня создадим:
1. Файл `js/data.js` с полной информацией о 6 офисах.
2. Страницу каталога `pages/catalog.html` с динамической сеткой `<div id="catalogContainer">`.
3. Страницу описания комнаты `pages/room-details.html` с контейнером `<div id="roomDetailsContainer">`.
4. Две JavaScript-функции: `renderCatalog()` и `initRoomDetails()`.

---

## 💡 Теория простыми словами

### 1. Что такое массив объектов?
Массив — это список. Объект — это карточка с характеристиками конкретной комнаты:
```javascript
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
```

### 2. Как передать ID комнаты через адресную строку (GET-параметр)?
Когда пользователь нажимает кнопку-иконку, ссылка выглядит так:
`pages/room-details.html?id=focus-1`

Знак `?` начинает передачу параметров, а `id=focus-1` сообщает странице, какую именно комнату показать!

### 3. Как JavaScript считывает параметр из URL?
```javascript
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id'); // Получаем "focus-1"
const room = OFFICE_ROOMS.find(r => r.id === roomId); // Находим объект комнаты в базе
```

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Создаем `pages/room-details.html`
```html
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
```

### Шаг 2. Добавляем логику страницы описания в `js/main.js`
```javascript
function initRoomDetails() {
  const container = document.getElementById('roomDetailsContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('id') || urlParams.get('room');
  const room = OFFICE_ROOMS.find(r => r.id === roomId);

  if (!room) {
    container.innerHTML = `
      <div class="empty-message">
        <h2>Комната не найдена</h2>
        <p style="margin: 10px 0 20px 0;">Возможно, ссылка устарела или комната была удалена.</p>
        <a href="catalog.html" class="btn btn-primary">Вернуться в каталог</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="room-details-card">
      <div class="room-details-gallery">
        <img src="${room.image}" alt="${room.title}" class="room-details-img" onerror="this.src='../img/no-image.svg'">
      </div>
      <div class="room-details-info">
        <div class="room-details-header">
          <h1 class="room-details-title">${room.title}</h1>
          <div class="room-details-price">${room.pricePerHour} ₽ <span>/ час</span></div>
        </div>

        <div class="room-badges">
          <span class="room-badge">${room.capacity}</span>
          <span class="room-badge">${room.area}</span>
          ${room.isPopular ? '<span class="room-badge badge-popular">Популярное</span>' : ''}
        </div>

        <p class="room-description">${room.description}</p>

        <div class="room-specs">
          <h3>Оснащение и удобства:</h3>
          <ul class="card-equipment">
            ${room.equipment.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>

        <div class="room-details-actions">
          <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать эту комнату</a>
          <a href="catalog.html" class="btn btn-outline">← Назад в каталог</a>
        </div>
      </div>
    </div>
  `;
}
```

---

## 🏁 Чек-лист для самопроверки
- [x] В каталоге на каждой карточке есть кнопка-иконка просмотра деталей и кнопка «Забронировать».
- [x] Клик по карточке или кнопке-иконке открывает страницу `room-details.html?id=...` с фото, описанием, площадью и удобствами выбранной комнаты.
- [x] Кнопка «Забронировать эту комнату» со страницы описания ведет на форму бронирования.
- [x] При переходе по неверному ID выводится понятное сообщение «Комната не найдена» и кнопка возврата.
