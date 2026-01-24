# Урок 06: Уведомления (Toast Notifications)

## 🎯 Цели урока

После завершения этого урока вы будете:
- Понимать паттерн создания UI-компонентов на JavaScript
- Уметь динамически создавать HTML-элементы
- Работать с таймерами (setTimeout)
- Использовать CSS-анимации для UX

## 📝 Что добавлено в этом уроке

### Структура файлов

```
06-toast-notifications/
├── index.html
├── css/
│   ├── style.css
│   ├── shop-styles.css
│   └── toast.css           # НОВОЕ: Стили уведомлений
├── js/
│   ├── theme.js
│   ├── menu.js
│   └── toast.js            # НОВОЕ: Логика уведомлений
└── README.md
```

### Объект Toast

```javascript
const Toast = {
    container: null,
    
    init() {
        // Создаем контейнер для уведомлений
    },
    
    show(message, type = 'info', duration = 3000) {
        // Показываем уведомление
    },
    
    success(message) { return this.show(message, 'success'); },
    error(message) { return this.show(message, 'error'); },
    warning(message) { return this.show(message, 'warning'); },
    info(message) { return this.show(message, 'info'); }
};
```

### Динамическое создание элементов

```javascript
const toast = document.createElement('div');
toast.className = 'toast toast-success';
toast.innerHTML = `
    <div class="toast-icon">✓</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close">×</button>
`;
container.appendChild(toast);
```

### CSS-анимация появления

```css
.toast {
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s;
}

.toast.show {
    opacity: 1;
    transform: translateX(0);
}
```

## 💡 Ключевые концепции

### setTimeout для задержки

```javascript
// Запуск анимации после добавления в DOM
setTimeout(() => toast.classList.add('show'), 10);

// Удаление через 3 секунды
setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
}, 3000);
```

### Типы уведомлений

| Тип | Цвет | Использование |
|-----|------|--------------|
| success | Зеленый | Успешное действие |
| error | Красный | Ошибка |
| warning | Оранжевый | Предупреждение |
| info | Синий/фиолетовый | Информация |

## 🔍 Проверьте работу

1. Откройте консоль браузера (F12)
2. Выполните: `Toast.success('Отлично!')`
3. Появится зелёное уведомление справа сверху
4. Попробуйте другие типы: `Toast.error('Ошибка!')`

## 📚 Дополнительные материалы

- [MDN: createElement](https://developer.mozilla.org/ru/docs/Web/API/Document/createElement)
- [MDN: setTimeout](https://developer.mozilla.org/ru/docs/Web/API/setTimeout)
