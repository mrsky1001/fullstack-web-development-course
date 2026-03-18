# 🛠️ Руководство по Postman и Chrome DevTools для Backend-разработки

<div align="center">

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Chrome DevTools](https://img.shields.io/badge/Chrome_DevTools-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)

**Полное руководство по инструментам отладки API**

*Для курса Backend-разработки на Node.js*

</div>

---

## 📖 Содержание

1. [Введение](#-введение)
2. [Часть 1: Postman](#-часть-1-postman)
   - [Установка и настройка](#установка-и-настройка)
   - [Интерфейс Postman](#интерфейс-postman)
   - [Работа с запросами](#работа-с-запросами)
   - [Коллекции и окружения](#коллекции-и-окружения)
   - [Практические примеры](#практические-примеры-postman)
3. [Часть 2: Chrome Developer Tools](#-часть-2-chrome-developer-tools)
   - [Открытие DevTools](#открытие-devtools)
   - [Вкладка Network](#вкладка-network)
   - [Вкладка Console](#вкладка-console)
   - [Вкладка Application](#вкладка-application)
   - [Практические примеры](#практические-примеры-devtools)
4. [Часть 3: Сценарии использования](#-часть-3-сценарии-использования)
5. [Справочник HTTP](#-справочник-http)

---

## 📚 Введение

### Зачем нужны эти инструменты?

При разработке backend-части веб-приложений необходимо тестировать API без написания frontend-кода. Для этого используются:

| Инструмент | Назначение | Когда использовать |
|------------|------------|--------------------|
| **Postman** | Тестирование API | Разработка и отладка API endpoints |
| **Chrome DevTools** | Анализ сетевых запросов | Отладка frontend-backend взаимодействия |

### Что вы научитесь делать

После изучения этого руководства вы сможете:

- ✅ Отправлять HTTP-запросы (GET, POST, PUT, DELETE)
- ✅ Работать с заголовками (Headers)
- ✅ Отправлять данные в теле запроса (Body)
- ✅ Работать с cookies и сессиями
- ✅ Анализировать ответы сервера
- ✅ Отлаживать ошибки в API

---

## 📮 Часть 1: Postman

### Установка и настройка

#### Шаг 1: Скачивание

1. Перейдите на [postman.com/downloads](https://www.postman.com/downloads/)
2. Скачайте версию для вашей ОС (Windows/macOS/Linux)
3. Установите приложение

#### Шаг 2: Регистрация (опционально)

- Можно использовать без регистрации (нажмите "Skip and go to the app")
- С аккаунтом — синхронизация коллекций между устройствами

---

### Интерфейс Postman

```
┌──────────────────────────────────────────────────────────────────┐
│  📂 Collections    │  [GET ▼] [http://localhost:3000/product/all]│
│  ├── 📁 My API     │  ─────────────────────────────────────────  │
│  │   ├── GET all   │  Params │ Authorization │ Headers │ Body   │
│  │   ├── GET by id │  ─────────────────────────────────────────  │
│  │   └── POST new  │  KEY         │  VALUE                       │
│  └── 📁 Auth       │  category    │  Процессоры                  │
│      ├── Login     │                                              │
│      └── Register  │  ───────────────[Send]───────────────────   │
│                    │                                              │
│  🌍 Environments   │  Response ─────────────────────────────────  │
│  ├── Development   │  Status: 200 OK    Time: 45ms   Size: 1.2KB │
│  └── Production    │  ┌─────────────────────────────────────────┐│
│                    │  │{ "success": true, "data": [...] }       ││
│                    │  └─────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

#### Основные элементы интерфейса

| Элемент | Описание |
|---------|----------|
| **HTTP Method** | Выпадающий список (GET, POST, PUT, DELETE и др.) |
| **URL Bar** | Поле для ввода адреса запроса |
| **Params** | Query-параметры (?key=value) |
| **Headers** | HTTP-заголовки запроса |
| **Body** | Тело запроса (для POST, PUT) |
| **Send** | Кнопка отправки запроса |
| **Response** | Область с ответом сервера |

---

### Работа с запросами

#### 🔵 GET-запросы (получение данных)

**Использование:** Получение информации с сервера

##### Пример 1: Получить все товары

```
Method: GET
URL: http://localhost:3000/product/all
```

Нажмите **Send** и получите:

```json
{
    "success": true,
    "count": 3,
    "data": [
        { "id": 1, "name": "Intel Core i9-13900K", "price": 55990 },
        { "id": 2, "name": "AMD Ryzen 9 7950X", "price": 62990 },
        { "id": 3, "name": "NVIDIA RTX 4090", "price": 159990 }
    ]
}
```

##### Пример 2: GET с Query-параметрами

```
Method: GET
URL: http://localhost:3000/product/all?category=Процессоры
```

Или через вкладку **Params**:

| KEY | VALUE |
|-----|-------|
| category | Процессоры |

##### Пример 3: Получить товар по ID

```
Method: GET
URL: http://localhost:3000/product/1
```

---

#### 🟢 POST-запросы (создание данных)

**Использование:** Создание новых ресурсов на сервере

##### Пример: Создать новый товар

```
Method: POST
URL: http://localhost:3000/product
```

**Вкладка Body:**
1. Выберите **raw**
2. Выберите **JSON** (справа)
3. Введите:

```json
{
    "name": "Samsung SSD 990 Pro",
    "price": 15990,
    "category": "Накопители"
}
```

**Ответ сервера (201 Created):**

```json
{
    "success": true,
    "message": "Товар создан",
    "data": {
        "id": 4,
        "name": "Samsung SSD 990 Pro",
        "price": 15990,
        "category": "Накопители"
    }
}
```

---

#### 🟡 PUT-запросы (обновление данных)

**Использование:** Изменение существующих ресурсов

##### Пример: Обновить цену товара

```
Method: PUT
URL: http://localhost:3000/product/4
```

**Body (raw → JSON):**

```json
{
    "price": 14990
}
```

**Ответ:**

```json
{
    "success": true,
    "message": "Товар обновлён",
    "data": {
        "id": 4,
        "name": "Samsung SSD 990 Pro",
        "price": 14990,
        "category": "Накопители"
    }
}
```

---

#### 🔴 DELETE-запросы (удаление данных)

**Использование:** Удаление ресурсов

##### Пример: Удалить товар

```
Method: DELETE
URL: http://localhost:3000/product/4
```

**Ответ:**

```json
{
    "success": true,
    "message": "Товар удалён",
    "data": {
        "id": 4,
        "name": "Samsung SSD 990 Pro",
        "price": 14990
    }
}
```

---

### Работа с Headers (заголовками)

Заголовки передают дополнительную информацию о запросе.

#### Основные заголовки

| Header | Назначение | Пример значения |
|--------|------------|-----------------|
| `Content-Type` | Формат данных в Body | `application/json` |
| `Authorization` | Токен авторизации | `Bearer eyJhbGciOiJIUzI1NiIs...` |
| `Accept` | Ожидаемый формат ответа | `application/json` |
| `Cookie` | Cookies | `session_id=abc123` |

##### Пример: Запрос с авторизацией

```
Method: GET
URL: http://localhost:3000/admin/dashboard
```

**Вкладка Headers:**

| KEY | VALUE |
|-----|-------|
| Authorization | Bearer my-token-123 |

---

### Работа с аутентификацией

#### Регистрация пользователя

```
Method: POST
URL: http://localhost:3000/auth/register
```

**Body (raw → JSON):**

```json
{
    "email": "student@example.com",
    "password": "123456",
    "name": "Иван Студент"
}
```

**Ответ (201 Created):**

```json
{
    "success": true,
    "message": "Регистрация успешна",
    "user": {
        "id": 1,
        "email": "student@example.com",
        "name": "Иван Студент",
        "role": "user"
    }
}
```

#### Вход в систему (Login)

```
Method: POST
URL: http://localhost:3000/auth/login
```

**Body:**

```json
{
    "email": "student@example.com",
    "password": "123456"
}
```

> ⚠️ **Важно:** После успешного входа сервер устанавливает cookie с session_id. Postman автоматически сохраняет cookies для последующих запросов.

#### Проверка статуса авторизации

```
Method: GET
URL: http://localhost:3000/auth/status
```

#### Доступ к защищённому маршруту

```
Method: GET
URL: http://localhost:3000/profile
```

Если вы авторизованы (cookie сохранён), получите данные профиля.
Если нет — ошибка 401.

#### Выход из системы

```
Method: POST
URL: http://localhost:3000/auth/logout
```

---

### Коллекции и окружения

#### Создание коллекции

1. Нажмите **New** → **Collection**
2. Назовите: `Store API - Урок 06`
3. Добавьте папки:
   - `Products` — CRUD операции с товарами
   - `Auth` — Аутентификация

#### Сохранение запроса в коллекцию

1. Создайте запрос
2. Нажмите **Save** (Ctrl+S)
3. Выберите коллекцию и папку
4. Дайте имя (например, "GET All Products")

#### Создание окружения (Environment)

Окружения позволяют переключаться между dev/prod серверами.

1. **Нажмите** на иконку окружений (глаз справа вверху)
2. **Add** → Введите имя: `Development`
3. **Добавьте переменные:**

| VARIABLE | INITIAL VALUE | CURRENT VALUE |
|----------|---------------|---------------|
| baseUrl | http://localhost:3000 | http://localhost:3000 |
| token | | |

4. **Используйте в запросах:** `{{baseUrl}}/product/all`

---

### Практические примеры (Postman)

#### 🎯 Задание 1: Полный CRUD-цикл

1. **Создайте** новый товар (POST)
2. **Получите** его по ID (GET)
3. **Обновите** цену (PUT)
4. **Удалите** (DELETE)
5. **Проверьте** что удалён (GET → 404)

#### 🎯 Задание 2: Тестирование авторизации

1. Зарегистрируйте нового пользователя
2. Войдите в систему
3. Получите профиль
4. Выйдите
5. Попробуйте получить профиль снова (должна быть ошибка 401)

#### 🎯 Задание 3: Тестирование ошибок

Проверьте, как API обрабатывает ошибки:

| Сценарий | Запрос | Ожидаемый результат |
|----------|--------|---------------------|
| Несуществующий товар | GET /product/999 | 404 Not Found |
| Неполные данные | POST /product с пустым body | 400 Bad Request |
| Неверный пароль | POST /auth/login | 401 Unauthorized |
| Дублирующий email | POST /auth/register (повторно) | 409 Conflict |

---

## 🔍 Часть 2: Chrome Developer Tools

### Открытие DevTools

| Способ | Действие |
|--------|----------|
| Клавиша | `F12` |
| Комбинация | `Ctrl + Shift + I` (Windows) / `Cmd + Option + I` (Mac) |
| Правый клик | "Просмотреть код" / "Inspect" |
| Меню | ⋮ → Дополнительные инструменты → Инструменты разработчика |

---

### Вкладка Network

**Назначение:** Мониторинг всех сетевых запросов страницы

```
┌────────────────────────────────────────────────────────────────────┐
│ Elements │ Console │ Sources │ [Network] │ Performance │ Memory   │
├────────────────────────────────────────────────────────────────────┤
│ 🔴 ○ ⬚   │ Preserve log │ Disable cache │ ▼ All │ Fetch/XHR │ JS │
├────────────────────────────────────────────────────────────────────┤
│ Name              │ Status │ Type    │ Size   │ Time    │ Waterfall│
├───────────────────┼────────┼─────────┼────────┼─────────┼──────────┤
│ all               │ 200    │ fetch   │ 1.2 KB │ 45 ms   │ ████     │
│ login             │ 200    │ fetch   │ 234 B  │ 120 ms  │ ██████   │
│ product/1         │ 404    │ fetch   │ 89 B   │ 12 ms   │ █        │
└────────────────────────────────────────────────────────────────────┘
```

#### Основные элементы

| Элемент | Описание |
|---------|----------|
| 🔴 (Record) | Включение/выключение записи запросов |
| 🚫 (Clear) | Очистка списка запросов |
| **Preserve log** | Сохранять логи при переходах между страницами |
| **Disable cache** | Отключить кэширование (важно при разработке!) |
| **Filter** | Фильтр по типу запросов (XHR, JS, CSS, Img) |

#### Анализ конкретного запроса

При клике на запрос открывается панель с деталями:

| Вкладка | Содержимое |
|---------|------------|
| **Headers** | Заголовки запроса и ответа |
| **Payload** | Тело отправленного запроса (POST/PUT) |
| **Preview** | Предпросмотр ответа (отформатированный JSON) |
| **Response** | Сырой ответ сервера |
| **Timing** | Детали времени загрузки |
| **Cookies** | Cookies, связанные с запросом |

---

### Анализ Headers в DevTools

#### Request Headers (заголовки запроса)

```
Request URL: http://localhost:3000/product/all
Request Method: GET
Status Code: 200 OK

Request Headers:
  Accept: application/json
  Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8
  Cookie: connect.sid=s%3Aabc123...
  Origin: http://localhost:5500
  Referer: http://localhost:5500/catalog.html
```

#### Response Headers (заголовки ответа)

```
Response Headers:
  Content-Type: application/json; charset=utf-8
  Access-Control-Allow-Origin: http://localhost:5500
  Set-Cookie: connect.sid=...; Path=/; HttpOnly
  X-Powered-By: Express
```

---

### Вкладка Console

**Назначение:** Просмотр логов, ошибок и выполнение JavaScript

#### Уровни сообщений

| Уровень | Иконка | Описание |
|---------|--------|----------|
| Log | ℹ️ | Обычная информация |
| Warning | ⚠️ | Предупреждения (жёлтые) |
| Error | ❌ | Ошибки (красные) |

#### Типичные ошибки и их значение

##### CORS Error

```
Access to fetch at 'http://localhost:3000/api' from origin 
'http://localhost:5500' has been blocked by CORS policy
```

**Причина:** Сервер не разрешает запросы с этого домена
**Решение:** Добавить `cors()` middleware на сервере

##### 404 Not Found

```
GET http://localhost:3000/product/999 404 (Not Found)
```

**Причина:** Ресурс не найден
**Решение:** Проверить URL и наличие данных

##### 401 Unauthorized

```
POST http://localhost:3000/profile 401 (Unauthorized)
```

**Причина:** Отсутствует или недействительна авторизация
**Решение:** Выполнить вход в систему

##### Network Error

```
POST http://localhost:3000/auth/login net::ERR_CONNECTION_REFUSED
```

**Причина:** Сервер не запущен
**Решение:** Запустить backend (`npm start`)

---

### Вкладка Application

**Назначение:** Управление хранилищем браузера

```
┌─────────────────────────────────────────────────────────┐
│ Application                                             │
├─────────────────┬───────────────────────────────────────┤
│ Storage         │                                       │
│ ├── Local       │  Key         │ Value                  │
│ │   Storage     │  cart        │ [{"id":1,"qty":2}]    │
│ ├── Session     │  user        │ {"id":1,"email":"..."}│
│ │   Storage     │                                       │
│ └── Cookies     │───────────────────────────────────────│
│     └── localhost│ Name         │ Value    │ Expires   │
│                 │ connect.sid  │ s%3A...  │ Session   │
└─────────────────┴───────────────────────────────────────┘
```

#### Работа с Cookies

1. **Application** → **Storage** → **Cookies** → **localhost**
2. Вы увидите все cookies:
   - `connect.sid` — ID сессии (Passport.js)
   - `HttpOnly` — нельзя прочитать из JavaScript
   - `Expires` — время жизни

#### Удаление Cookies (выход из системы вручную)

1. Правый клик на cookie → **Delete**
2. Или кнопка 🚫 **Clear All**

#### Работа с localStorage

```javascript
// В Console можно выполнить:

// Прочитать
localStorage.getItem('cart');

// Записать
localStorage.setItem('cart', JSON.stringify([{id: 1, qty: 2}]));

// Удалить
localStorage.removeItem('cart');

// Очистить всё
localStorage.clear();
```

---

### Практические примеры (DevTools)

#### 🎯 Пример 1: Отладка fetch-запроса

1. Откройте страницу каталога (`catalog.html`)
2. Откройте DevTools → **Network**
3. Обновите страницу
4. Найдите запрос к `/product/all`
5. Проверьте:
   - **Status:** должен быть 200
   - **Preview:** список товаров
   - **Timing:** время загрузки

#### 🎯 Пример 2: Отладка CORS

Если видите ошибку CORS:

1. Откройте **Console** — прочитайте сообщение ошибки
2. Откройте **Network** — найдите неудачный запрос
3. Проверьте **Response Headers**:
   - Есть `Access-Control-Allow-Origin`? 
   - Совпадает с вашим origin?

#### 🎯 Пример 3: Отладка авторизации

1. Выполните вход на странице
2. В **Network** найдите запрос `/auth/login`
3. Проверьте **Response Headers** — должен быть `Set-Cookie`
4. В **Application** → **Cookies** — найдите `connect.sid`
5. Откройте защищённую страницу
6. В **Network** проверьте, что cookie отправляется

---

## 🎪 Часть 3: Сценарии использования

### Сценарий 1: Разработка нового API endpoint

| Шаг | Инструмент | Действие |
|-----|------------|----------|
| 1 | VS Code | Написать код endpoint в Express |
| 2 | Terminal | Запустить сервер (`npm start`) |
| 3 | **Postman** | Тестировать endpoint |
| 4 | VS Code | Исправить ошибки, если есть |
| 5 | **Postman** | Повторить тест |

### Сценарий 2: Отладка frontend-backend интеграции

| Шаг | Инструмент | Действие |
|-----|------------|----------|
| 1 | **DevTools Network** | Найти неудачный запрос |
| 2 | **DevTools Console** | Прочитать ошибку |
| 3 | **Postman** | Сделать тот же запрос вручную |
| 4 | Сравнить | Headers, Body, URL одинаковые? |
| 5 | VS Code | Исправить frontend или backend |

### Сценарий 3: Тестирование авторизации

```
┌──────────────────┐        ┌──────────────────┐
│     POSTMAN      │        │   CHROME DEVTOOLS │
├──────────────────┤        ├──────────────────┤
│                  │        │                  │
│ 1. Регистрация   │───────▶│ Application:     │
│    POST /register│        │ Cookies пусты   │
│                  │        │                  │
│ 2. Вход          │───────▶│ Application:     │
│    POST /login   │        │ connect.sid ✓   │
│                  │        │                  │
│ 3. Профиль       │───────▶│ Network:         │
│    GET /profile  │        │ Cookie отправлен│
│                  │        │                  │
│ 4. Выход         │───────▶│ Application:     │
│    POST /logout  │        │ Cookie удалён   │
│                  │        │                  │
└──────────────────┘        └──────────────────┘
```

---

## 📖 Справочник HTTP

### HTTP-методы

| Метод | CRUD | Описание | Body |
|-------|------|----------|------|
| `GET` | Read | Получить данные | ❌ |
| `POST` | Create | Создать ресурс | ✅ |
| `PUT` | Update | Полностью обновить | ✅ |
| `PATCH` | Update | Частично обновить | ✅ |
| `DELETE` | Delete | Удалить ресурс | ❌ |

### HTTP-статусы

#### ✅ 2xx — Успех

| Код | Название | Когда используется |
|-----|----------|-------------------|
| 200 | OK | Успешный GET, PUT, DELETE |
| 201 | Created | Успешный POST (ресурс создан) |
| 204 | No Content | Успешный запрос без тела ответа |

#### ⚠️ 3xx — Перенаправление

| Код | Название | Когда используется |
|-----|----------|-------------------|
| 301 | Moved Permanently | URL изменился навсегда |
| 302 | Found | Временное перенаправление |
| 304 | Not Modified | Ресурс не изменился (кэш) |

#### ❌ 4xx — Ошибка клиента

| Код | Название | Когда используется |
|-----|----------|-------------------|
| 400 | Bad Request | Неверный формат запроса |
| 401 | Unauthorized | Требуется авторизация |
| 403 | Forbidden | Доступ запрещён |
| 404 | Not Found | Ресурс не найден |
| 409 | Conflict | Конфликт (дубликат) |
| 422 | Unprocessable Entity | Ошибка валидации |

#### 💥 5xx — Ошибка сервера

| Код | Название | Когда используется |
|-----|----------|-------------------|
| 500 | Internal Server Error | Необработанная ошибка на сервере |
| 502 | Bad Gateway | Ошибка прокси/gateway |
| 503 | Service Unavailable | Сервер перегружен |

### Content-Type (типы контента)

| Значение | Описание |
|----------|----------|
| `application/json` | JSON-данные |
| `application/x-www-form-urlencoded` | Данные HTML-формы |
| `multipart/form-data` | Загрузка файлов |
| `text/html` | HTML-страница |
| `text/plain` | Обычный текст |

---

## 🔧 Горячие клавиши

### Postman

| Действие | Windows | Mac |
|----------|---------|-----|
| Новый запрос | `Ctrl + N` | `Cmd + N` |
| Отправить запрос | `Ctrl + Enter` | `Cmd + Enter` |
| Сохранить | `Ctrl + S` | `Cmd + S` |
| Дублировать запрос | `Ctrl + D` | `Cmd + D` |
| Форматировать JSON | `Ctrl + B` | `Cmd + B` |

### Chrome DevTools

| Действие | Windows | Mac |
|----------|---------|-----|
| Открыть DevTools | `F12` | `Cmd + Option + I` |
| Открыть Console | `Ctrl + Shift + J` | `Cmd + Option + J` |
| Очистить Console | `Ctrl + L` | `Cmd + K` |
| Поиск | `Ctrl + F` | `Cmd + F` |

---

## 📋 Чек-лист для тестирования API

### ✅ Перед тестированием

- [ ] Сервер запущен (`npm start`)
- [ ] База данных подключена (для урока 06+)
- [ ] Postman открыт
- [ ] Коллекция создана

### ✅ Для каждого endpoint

- [ ] Правильный HTTP-метод?
- [ ] Правильный URL?
- [ ] Headers установлены (Content-Type, Authorization)?
- [ ] Body правильного формата?
- [ ] Статус ответа ожидаемый?
- [ ] Данные в ответе корректные?

### ✅ Негативные тесты

- [ ] Несуществующий ресурс → 404
- [ ] Неполные данные → 400
- [ ] Без авторизации → 401
- [ ] Нет прав → 403
- [ ] Дубликат → 409

---

## 📚 Дополнительные ресурсы

### Официальная документация

- [Postman Learning Center](https://learning.postman.com/)
- [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/)
- [MDN: HTTP](https://developer.mozilla.org/ru/docs/Web/HTTP)
---

<div align="center">

### 🎓 Удачи в изучении Backend-разработки!

*Практика — ключ к мастерству*

</div>
