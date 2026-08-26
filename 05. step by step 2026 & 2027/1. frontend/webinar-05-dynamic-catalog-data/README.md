# Вебинар 5. Работа с динамическими данными: Mock-данные и рендеринг каталога

## 📋 Описание занятия
- **Дисциплина:** ПИРИП (ПМ08. Разработка веб-приложения)
- **Уровень:** 1 курс колледжа
- **Тема:** Структуры данных в JS, массив объектов `data.js`, динамическая генерация DOM-карточек на странице каталога.

---

## 🎯 Подзадачи из общего ТЗ на этот вебинар

| № | Подзадача | Описание требований ТЗ |
|---|---|---|
| 5.1 | **Создание базы mock-данных (`js/data.js`)** | Описание массива объектов комнат `roomsData` (поля: `id`, `name`, `price`, `capacity`, `equipment` [массив строк], `image`, `description`). |
| 5.2 | **Верстка страницы каталога (`pages/catalog.html`)** | Создание страницы каталога с унифицированной шапкой, подвалом и контейнером `#roomsList` для динамических карточек. |
| 5.3 | **Динамический рендеринг через JS** | Функция `renderCatalog(rooms)`: обход массива данных, формирование HTML-разметки через шаблонные строки (Template Literals) и вставка в DOM через `innerHTML`. |
| 5.4 | **Переход к бронированию** | Добавление кнопки «Забронировать» на каждой карточке со ссылкой на `pages/booking.html?room=${room.id}`. |

---

## 💡 Теоретический минимум
1. **Массивы объектов в JS:** Хранение структурированных данных без использования реального backend-сервера.
2. **Шаблонные строки (Template Literals):** Использование обратных кавычек (`` ` ``) и интерполяции `${variable}` для читаемой генерации HTML.
3. **Метод `map()` и `join('')`:** Быстрое преобразование массива объектов в единую HTML-строку.
4. **Порядок подключения скриптов:** Сначала подключается `js/data.js` (источник данных), затем `js/main.js` (логика приложения).

---

## 📝 Пошаговый план выполнения
1. Создать файл `js/data.js` и объявить глобальный массив `roomsData` минимум из 6 различных офисных пространств:
   ```javascript
   const roomsData = [
     {
       id: 1,
       name: "Мини-офис Focus",
       price: 450,
       capacity: 2,
       equipment: ["Wi-Fi 500 Мбит/с", "4K Монитор", "Эргономичное кресло"],
       image: "../img/room-1.jpg"
     },
     // остальные комнаты...
   ];
   ```
2. Создать файл `pages/catalog.html`:
   - Вставить унифицированную шапку и подвал (с корректными относительными путями `../css/style.css`, `../js/data.js`, `../js/main.js`).
   - Добавить секцию каталога с контейнером `<div id="roomsList" class="rooms-grid"></div>`.
3. В `js/main.js` реализовать функцию рендеринга каталога:
   ```javascript
   function renderCatalog(rooms) {
     const container = document.getElementById('roomsList');
     if (!container) return;
     
     container.innerHTML = rooms.map(room => `
       <div class="room-card">
         <div class="card-img-wrap">
           <img src="${room.image}" alt="${room.name}" class="card-img" onerror="this.src='../img/no-image.svg'">
         </div>
         <div class="card-content">
           <h3 class="card-title">${room.name}</h3>
           <ul class="card-equipment">
             ${room.equipment.map(item => `<li>${item}</li>`).join('')}
           </ul>
           <div class="card-footer">
             <div class="card-price">${room.price} ₽ <span>/ час</span></div>
             <a href="booking.html?room=${room.id}" class="btn btn-primary">Забронировать</a>
           </div>
         </div>
       </div>
     `).join('');
   }
   ```
4. Вызвать `renderCatalog(roomsData)` при открытии страницы каталога.

---

## 🏁 Результат вебинара (Критерии приемки)
- [x] Создана база mock-данных `roomsData` в `js/data.js`.
- [x] Страница `pages/catalog.html` динамически отображает карточки из JS-массива.
- [x] Изображения, названия, списки оборудования и цены подставляются автоматически.
- [x] Кнопка «Забронировать» передает `id` комнаты в URL.
