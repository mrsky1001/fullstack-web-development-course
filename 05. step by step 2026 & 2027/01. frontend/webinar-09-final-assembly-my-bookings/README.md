# Вебинар 9. Итоговая сборка и ревью проекта: Страница «Мои бронирования» и финальная приемка

## 📋 О занятии простыми словами
Поздравляем! Мы вышли на финишную прямую! 

Сегодня мы:
1. Создадим последнюю, 7-ю страницу нашего портала — **«Мои бронирования»** (`pages/my-bookings.html`).
2. Добавим пункт «Мои бронирования» в шапку сайта.
3. Проведем полное тестирование всех 7 страниц по экзаменационному чек-листу на 100 баллов!

---

## 🎯 Что мы сегодня сделаем:
1. Создадим страницу `pages/my-bookings.html`.
2. Напишем функцию `initMyBookings()` в `js/main.js`, которая отображает список заявок из `MOCK_BOOKINGS`.
3. Добавим обработку «пустого состояния» (если список пуст, показывается красивый блок «У вас пока нет бронирований»).
4. Проверим весь проект (главная, каталог, описание комнаты, бронирование, личный кабинет, регистрация, вход).

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Создаем `pages/my-bookings.html`
```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мои бронирования — СмартОфис</title>
  <link rel="stylesheet" href="../css/style.css">
  <link rel="icon" type="image/svg+xml" href="../img/logo.svg">
  <script src="../js/data.js" defer></script>
  <script src="../js/main.js" defer></script>
</head>
<body>
  <!-- Шапка с пунктом «Мои бронирования» -->
  <main class="main">
    <div class="container">
      <h1 class="page-title">Мои бронирования</h1>
      <p class="page-subtitle">История ваших заявок на аренду рабочих пространств</p>

      <div class="bookings-list" id="myBookingsList"></div>
    </div>
  </main>
  <!-- Подвал -->
</body>
</html>
```

### Шаг 2. Добавляем функцию `initMyBookings()` в `js/main.js`
```javascript
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }

  container.innerHTML = MOCK_BOOKINGS.map(item => `
    <div class="booking-item">
      <div>
        <h3 style="font-size: 16px; margin-bottom: 5px;">${item.roomTitle}</h3>
        <div style="font-size: 13px; color: #666;">
          Дата: <strong>${item.date}</strong> | Длительность: <strong>${item.hours} ч.</strong> | Заявка №${item.id}
        </div>
      </div>
      <div style="text-align: right;">
        <div style="font-size: 16px; font-weight: 700; color: #007bff;">${item.totalPrice} ₽</div>
        <span style="font-size: 12px; color: #28a745;">Подтверждено</span>
      </div>
    </div>
  `).join('');
}
```

---

## 📋 Финальный экзаменационный чек-лист (100 из 100 баллов)

| Критерий проверки | Что проверяется | Оценка |
|---|---|:---:|
| **1. Файловая структура** | Все 7 страниц, `css/style.css`, `js/data.js`, `js/main.js`, папка `img/` | 10 б. |
| **2. Семантика и стили** | Теги `<header>`, `<nav>`, `<main>`, `<footer>`, палитра из 4 цветов, шрифт Inter | 10 б. |
| **3. Главная страница** | Баннер Hero + 3 карточки популярных комнат с переходом на описание (`object-fit`) | 10 б. |
| **4. Интерактивный слайдер** | Автопрокрутка 3 сек, стрелки «‹» / «›», точки-индикаторы, сброс таймера | 10 б. |
| **5. Динамический каталог** | Отрисовка из `OFFICE_ROOMS` через `map()`, кнопки «Подробнее» и «Забронировать» | 15 б. |
| **6. Страница описания комнаты** | Динамическая загрузка данных комнаты по `?id=...`, галерея, описание, удобства | 15 б. |
| **7. Поиск и сортировка** | Живой поиск по названию + кнопки сортировки цены (дешевле/дороже) | 10 б. |
| **8. Валидация форм** | Подсветка ошибок `.is-invalid` при регистрации, проверка admin/12345 на входе | 10 б. |
| **9. Калькулятор бронирования** | Мгновенный расчет (`тариф × часы`), автовыбор комнаты из ссылки | 5 б. |
| **10. Мои бронирования и чистота кода** | Список бронирований + заглушка пустого списка, отсутствие ошибок в F12 | 5 б. |

---

## 🏁 Финал курса
Поздравляем! Вы полностью собрали проект интернет-портала «СмартОфис» из 7 полноценных страниц. Вы освоили весь базовый стек фронтенд-разработчика: HTML5, CSS3 и чистый JavaScript! 🚀
