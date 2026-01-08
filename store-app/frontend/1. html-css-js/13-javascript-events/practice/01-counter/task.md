# Практическое задание: Счётчик кликов

## 🎯 Цель

Создать интерактивный счётчик с использованием событий JavaScript.

---

## 📋 Задание

### Функционал:

1. **Отображение счётчика** — большое число в центре
2. **Кнопка "+"** — увеличить на 1
3. **Кнопка "-"** — уменьшить на 1
4. **Кнопка "Сброс"** — установить 0
5. **Цвет числа** — зелёный если > 0, красный если < 0

### Дополнительно:

6. **Шаг изменения** — input для настройки шага
7. **Клавиатура** — стрелки вверх/вниз
8. **Анимация** — при изменении значения

---

## ✅ Критерии

- [ ] addEventListener для кнопок
- [ ] Обновление DOM
- [ ] Условное изменение цвета
- [ ] Поддержка клавиатуры (бонус)

---

## 💡 Подсказка

```javascript
let count = 0;
const display = document.getElementById('count');

function updateDisplay() {
    display.textContent = count;
    
    // Меняем цвет в зависимости от значения
    if (count > 0) {
        display.style.color = 'green';
    } else if (count < 0) {
        display.style.color = 'red';
    } else {
        display.style.color = 'black';
    }
}

document.getElementById('increment').addEventListener('click', () => {
    count++;
    updateDisplay();
});

document.getElementById('decrement').addEventListener('click', () => {
    count--;
    updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

// Клавиатура
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        count++;
        updateDisplay();
    } else if (e.key === 'ArrowDown') {
        count--;
        updateDisplay();
    }
});
```

### HTML:

```html
<div class="counter">
    <span id="count">0</span>
</div>
<div class="buttons">
    <button id="decrement">-</button>
    <button id="reset">Сброс</button>
    <button id="increment">+</button>
</div>
```
