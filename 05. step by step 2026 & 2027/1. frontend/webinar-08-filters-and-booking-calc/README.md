# Вебинар 8. Интерактивная логика и расчеты: Поиск, сортировка и калькулятор бронирования

## 📋 Описание занятия
- **Дисциплина:** ПИРИП (ПМ08. Разработка веб-приложения)
- **Уровень:** 1 курс колледжа
- **Тема:** Фильтрация массивов методом `filter()`, сортировка `sort()`, расчет стоимости в реальном времени на странице `booking.html`.

---

## 🎯 Подзадачи из общего ТЗ на этот вебинар

| № | Подзадача | Описание требований ТЗ |
|---|---|---|
| 8.1 | **Поиск по названию в каталоге** | Поле ввода поиска `#searchInput` на `pages/catalog.html`. При вводе текста фильтровать массив `roomsData` без учета регистра и перерисовывать DOM. |
| 8.2 | **Сортировка по цене в каталоге** | Выпадающий список / кнопки сортировки `#sortSelect` (по умолчанию, по возрастанию цены, по убыванию цены). Сортировка массива и обновление карточек. |
| 8.3 | **Верстка страницы бронирования (`pages/booking.html`)** | Форма бронирования: выпадающий список комнат (`<select id="roomSelect">`), дата (`<input type="date">`), количество часов (`<input type="number" min="1" value="1">`), комментарий. |
| 8.4 | **Живой калькулятор стоимости** | При изменении выбранной комнаты или количества часов моментально пересчитывать: `Общая стоимость = Цена_за_час × Кол_во_часов` и отображать в блоке `#totalPrice`. |
| 8.5 | **Оформление бронирования и алерт** | При отправке формы выводить алерт с уникальным номером заявки: `«Бронирование создано! Номер заявки: №${Math.floor(Math.random() * 90000) + 10000}»`. |

---

## 💡 Теоретический минимум
1. **Методы массивов:**
   - `rooms.filter(r => r.name.toLowerCase().includes(query.toLowerCase()))` — фильтрация по подстроке.
   - `[...rooms].sort((a, b) => a.price - b.price)` — сортировка копии массива по возрастанию цены.
2. **Событие `input` и `change`:** Моментальная реакция на ввод текста и изменение выбранного `<select>`.
3. **Чтение параметров из URL:** `new URLSearchParams(window.location.search).get('room')` для автовыбора офиса.

---

## 📝 Пошаговый план выполнения
1. На странице `pages/catalog.html` добавить панель фильтрации:
   ```html
   <div class="filters-bar">
     <input type="text" id="searchInput" class="form-input" placeholder="Поиск офиса по названию...">
     <select id="sortSelect" class="form-select">
       <option value="default">По умолчанию</option>
       <option value="asc">Сначала дешевые</option>
       <option value="desc">Сначала дорогие</option>
     </select>
   </div>
   ```
2. В `js/main.js` связать поиск и сортировку в единый пайплайн фильтрации:
   ```javascript
   function initCatalogFilters() {
     const searchInput = document.getElementById('searchInput');
     const sortSelect = document.getElementById('sortSelect');
     if (!searchInput || !sortSelect) return;
     
     function applyFilters() {
       let result = [...roomsData];
       const q = searchInput.value.trim().toLowerCase();
       if (q) result = result.filter(r => r.name.toLowerCase().includes(q));
       
       if (sortSelect.value === 'asc') result.sort((a, b) => a.price - b.price);
       else if (sortSelect.value === 'desc') result.sort((a, b) => b.price - a.price);
       
       renderCatalog(result);
     }
     
     searchInput.addEventListener('input', applyFilters);
     sortSelect.addEventListener('change', applyFilters);
   }
   ```
3. Создать `pages/booking.html` с формой калькулятора.
4. В `js/main.js` написать функцию расчета стоимости `initBookingCalc()`:
   - Заполнить `<select id="roomSelect">` списком офисов из `roomsData`.
   - Проверить URL-параметр `?room=id` и выбрать соответствующую комнату.
   - Повесить слушатели `change` и `input` на селект и поле часов, обновлять `#totalPrice`.
   - При сабмите генерировать случайный номер заявки и показывать всплывающее сообщение.

---

## 🏁 Результат вебинара (Критерии приемки)
- [x] Поиск по названию фильтрует карточки на лету.
- [x] Сортировка по цене (возрастание/убывание) корректно перестраивает список.
- [x] На странице `booking.html` калькулятор рассчитывает стоимость в реальном времени.
- [x] При сабмите формы выводится alert `«Бронирование создано! Номер заявки: №...»`.
