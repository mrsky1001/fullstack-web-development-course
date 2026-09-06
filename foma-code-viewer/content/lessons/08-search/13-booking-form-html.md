---
title: "Форма калькулятора (HTML)"
highlight: html
---

# Верстка калькулятора

Что нужно для расчета брони? Нам нужно знать, КАКУЮ комнату выбрал пользователь, и на СКОЛЬКО часов.
Поэтому в нашей форме будет выпадающий список `<select id="roomSelect">` и поле ввода чисел `<input type="number" id="hoursInput">`.

В самом низу формы мы сделаем красивый блок `.calc-summary`, где будет выводиться общая стоимость (`#totalPrice`).

## 🛠 Задание
Вставьте эту форму внутрь вашей карточки `.form-card` на странице `booking.html`.

```html:start
      <div class="form-card">
        <!-- Сюда вставим форму -->
      </div>
```

```html:solution
      <div class="form-card">
        <form id="bookingForm">
          <div class="form-group">
            <label class="form-label" for="roomSelect">Выберите комнату</label>
            <select id="roomSelect" class="form-control" required></select>
          </div>

          <div class="form-group">
            <label class="form-label" for="bookingDate">Дата бронирования</label>
            <input type="date" id="bookingDate" class="form-control" required>
          </div>

          <div class="form-group">
            <label class="form-label" for="hoursInput">Количество часов</label>
            <input type="number" id="hoursInput" class="form-control" min="1" max="24" value="2" required>
          </div>

          <div class="calc-summary">
            <div>
              <div>От: <span id="pricePerHour">0 ₽</span>/час</div>
              <div style="font-size: 12px; color: #666;">В выходные: дороже</div>
            </div>
            <div class="calc-total" id="totalPrice">0 ₽</div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">Забронировать</button>
        </form>
      </div>
```
