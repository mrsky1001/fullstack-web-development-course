# Шаг 2 — Фильтрация массива через метод .filter()

## 🎯 Что изучаем
Метод `.filter()` и поиск подстроки без учёта регистра: `.toLowerCase().includes()`.

---

## 💡 Поиск без учёта регистра букв

Если пользователь напечатал `'focus'`, а в базе комната называется `'Focus'` — они должны совпасть!
Для этого мы приводим обе строки к нижнему регистру с помощью `.toLowerCase()`:

```javascript
const query = searchInput.value.toLowerCase().trim();

// Метод filter создаёт новый отфильтрованный массив:
const filteredRooms = OFFICE_ROOMS.filter(room => {
    return room.title.toLowerCase().includes(query);
});

// Если комната подходит под поиск — она остаётся в filteredRooms!
```

---

## ➡️ Следующий шаг
[Шаг 3 — Копия массива через spread [...array]](../step-03-spread-operator-kopiya-massiva/README.md)
