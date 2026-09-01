# Урок 07: Работа с API (Fetch)

## 🎯 Цели урока

После завершения этого урока вы будете:
- Понимать концепцию REST API
- Использовать Fetch API для HTTP-запросов
- Работать с async/await для асинхронного кода
- Обрабатывать JSON-данные

## 📝 Что добавлено в этом уроке

### Новые файлы

```
07-api-integration/
├── js/
│   └── config.js    # НОВОЕ: Конфигурация API
└── README.md
```

### Конфигурация API

```javascript
const API_BASE_URL = 'http://localhost:3000';

const API_ENDPOINTS = {
    products: {
        all: `${API_BASE_URL}/product/all`,
        byId: (id) => `${API_BASE_URL}/product/${id}`
    },
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`
    }
};
```

### Функция apiRequest

```javascript
async function apiRequest(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',  // Отправлять cookies
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const config = { ...defaultOptions, ...options };
    
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Ошибка API');
    }
    
    return data;
}
```

## 💡 Ключевые концепции

### Fetch API

```javascript
// GET-запрос
const response = await fetch('/api/products');
const data = await response.json();

// POST-запрос
const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
});
```

### async/await

```javascript
// Старый способ (Promise)
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

// Новый способ (async/await)
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
```

### HTTP-методы

| Метод | Назначение |
|-------|-----------|
| GET | Получить данные |
| POST | Создать данные |
| PUT | Обновить данные |
| DELETE | Удалить данные |

### Коды ответов HTTP

| Код | Значение |
|-----|----------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

## ⚠️ Важно

Для работы этого урока нужен запущенный backend-сервер!
Без сервера запросы будут возвращать ошибку.

## 📚 Дополнительные материалы

- [MDN: Fetch API](https://developer.mozilla.org/ru/docs/Web/API/Fetch_API)
- [MDN: async/await](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous/Promises)
- [REST API основы](https://restfulapi.net/)
