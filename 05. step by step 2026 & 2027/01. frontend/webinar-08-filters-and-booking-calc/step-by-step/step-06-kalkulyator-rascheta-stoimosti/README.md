# Шаг 6 — Калькулятор расчёта стоимости (Финал 8-го вебинара)

## 🎯 Что изучаем
Связка событий `change` и `input` для живого перемножения: `тариф * часы = итоговая сумма`, а также генерация случайного 5-значного номера заявки при бронировании!

---

## 💡 Формула расчёта
```javascript
function updatePrice() {
    const selectedOption = roomSelect.options[roomSelect.selectedIndex];
    const price = selectedOption ? Number(selectedOption.dataset.price || 0) : 0;
    const hours = Math.max(1, Number(hoursInput.value || 1));
    const total = price * hours;

    totalPriceSpan.textContent = total + ' ₽';
}
```

---

## 🎲 Случайный номер заявки
```javascript
const appNumber = Math.floor(10000 + Math.random() * 90000); // 5-значное число от 10000 до 99999
alert('Бронирование создано! Номер заявки: №' + appNumber);
```

---

## ➡️ Переход к Вебинару 9 (Финальная сборка)
В 9-м вебинаре мы объединим все модули, создадим страницу «Мои бронирования» и проверим проект по чек-листу на 100 баллов!
