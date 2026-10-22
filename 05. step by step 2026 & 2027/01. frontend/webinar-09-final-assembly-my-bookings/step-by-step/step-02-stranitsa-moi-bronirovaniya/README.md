# Шаг 2 — Страница «Мои бронирования» и пустое состояние

## 🎯 Что изучаем
Как отобразить список оформленных бронирований из массива `MOCK_BOOKINGS`, и как показать красивую заглушку «У вас пока нет бронирований», если список пуст.

---

## 💡 Обработка пустого состояния (Empty State)

Профессиональный фронтенд-код всегда проверяет, есть ли данные в массиве:

```javascript
function initMyBookings() {
  const container = document.getElementById('myBookingsList');
  if (!container || typeof MOCK_BOOKINGS === 'undefined') return;

  // Если список пуст — показываем сообщение:
  if (!MOCK_BOOKINGS || MOCK_BOOKINGS.length === 0) {
    container.innerHTML = '<div class="empty-message">У вас пока нет бронирований</div>';
    return;
  }

  // Если бронирования есть — отрисовываем их через .map():
  container.innerHTML = MOCK_BOOKINGS.map(item => `
    <div class="booking-item">
      <h3>${item.roomTitle}</h3>
      <div>Дата: ${item.date} | Длительность: ${item.hours} ч.</div>
      <div>Итого: ${item.totalPrice} ₽</div>
    </div>
  `).join('');
}
```

---

## ➡️ Следующий шаг
[Шаг 3 — Финальный экзаменационный чек-лист на 100 баллов](../step-03-finalny-cheklist-100-ballov/README.md)
