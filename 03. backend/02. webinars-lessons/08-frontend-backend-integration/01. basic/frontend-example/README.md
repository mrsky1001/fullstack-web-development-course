# Пошаговая инструкция: Создание многостраничного Frontend для PassportJS

Данная инструкция описывает, как собрать авторизацию, которая работает отдельно от сервера и не "сбрасывается" при обновлении страниц.

## Шаг 1: Настройка Бэкенда (Разрешение CORS)
По умолчанию браузер блокирует запросы к другому адресу (или порту). Нужно установить и настроить пакет `cors`.

1. В терминале: `npm install cors`
2. В файле `server.js`:
```javascript
const cors = require('cors');
app.use(cors({
    origin: true,        // Разрешить запросы с любого источника
    credentials: true    // Разрешить пересылку куки (сессий)
}));
```

## Шаг 2: Структура папок Frontend
Создайте отдельную папку (например, `frontend-example`) и внутри нее:
- `index.html` — главная страница.
- `style.css` — общие стили.
- `js/` — папка для скриптов.
- `pages/` — папка для HTML-страниц (`login.html`, `register.html`, `profile.html`).

## Шаг 3: Общий файл JS (js/shared.js)
Создайте `js/shared.js`. Здесь хранятся настройки `fetch`. 
**Ключевой момент:** Опция `credentials: 'include'` заставляет браузер сохранять и отправлять сессионную куку.

```javascript
/* js/shared.js */
const API_URL = 'http://localhost:3000';

async function apiFetch(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // <--- Чтобы сессия не пропадала!
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    const res = await fetch(`${API_URL}${endpoint}`, options);
    return await res.json();
}
```

## Шаг 4: Страница Регистрации
1. Создайте `pages/register.html`. Подключите стили через `../style.css`.
2. Подключите скрипты: сначала `shared.js`, затем свой `register.js`.
3. В `js/register.js` напишите отправку формы на `/register`. Редирект на вход: `window.location.href = 'login.html'`.

## Шаг 5: Страница Входа
1. Создайте `pages/login.html` и `js/login.js`.
2. При успешном ответе от `/login` делайте редирект: `window.location.href = 'profile.html'`.

## Шаг 6: Защищенный профиль (Авторизация при обновлении)
Чтобы при обновлении страницы профиль не пропадал:
1. В `js/profile.js` при загрузке страницы СРАЗУ вызывайте `apiFetch('/profile')`.
2. Если сервер вернул данные пользователя — отображаем их.
3. Если сервер вернул ошибку (401) — редиректим на `login.html`.

```javascript
/* js/profile.js */
async function check() {
    const data = await apiFetch('/profile');
    if (data.status === 'success') {
        // Отрисовка данных профиля
    } else {
        // Если не авторизован - на страницу входа
        window.location.href = 'login.html';
    }
}
check();
```

## Как запустить?
1. Запустите бэкенд: `npm run start` или `npm run dev` (в папке бэкенда).
2. Запустите фронтенд:
   - Перейдите в папку `frontend-example`.
   - Выполните: `npm start` (это запустит локальный сервер на порту 5000).
3. Откройте в браузере: `http://localhost:5000`.

> [!IMPORTANT]
> Использование локального сервера (`http://localhost:5000`) КРИТИЧЕСКИ ВАЖНО. Если открывать файлы через `file://`, современные браузеры заблокируют куки авторизации, и вы будете постоянно получать ошибку 401 на странице профиля.
