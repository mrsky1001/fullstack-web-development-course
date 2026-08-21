# 🖥️ Курс: Backend-разработка на Node.js

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Passport](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge&logo=passport&logoColor=white)

**Полный курс серверной веб-разработки**

*От первого HTTP-сервера до полноценного REST API с аутентификацией*

[![Modules](https://img.shields.io/badge/Уроков-9-blue?style=flat-square)]()
[![Language](https://img.shields.io/badge/Язык-Русский-green?style=flat-square)]()
[![Level](https://img.shields.io/badge/Уровень-Beginner-orange?style=flat-square)]()

</div>

---

## 📖 О курсе

Этот модуль посвящён **серверной (backend) разработке** — созданию серверов, API и работе с базами данных. Вы научитесь писать код, который работает на сервере и обрабатывает запросы от браузеров и мобильных приложений.

### 🎯 Чему вы научитесь

После прохождения курса вы сможете:

- ✅ Создавать HTTP-серверы на **Node.js**
- ✅ Строить **REST API** с помощью Express.js
- ✅ Организовывать код по паттерну **MVC**
- ✅ Подключаться к базам данных (**MySQL**)
- ✅ Реализовывать **аутентификацию** (регистрацию/вход)
- ✅ Защищать маршруты с помощью **middleware**
- ✅ Интегрировать **frontend** с **backend**

> 📚 **Руководства:** [Postman и Chrome DevTools](../0.%20resources/3.%20backend/manual/POSTMAN-AND-DEVTOOLS-MANUAL.md) — как тестировать и отлаживать API

---

## 📚 Содержание курса

| № | Урок | Описание | Ключевые концепции |
|---|------|----------|-------------------|
| 01 | [Введение в курс](1. node-js/01-course-introduction/) | Что такое backend? Обзор технологий | Backend vs Frontend, Node.js |
| 02 | [Клиент-серверная архитектура](1. node-js/02-client-server-architecture/) | Как браузер общается с сервером | HTTP, REST, JSON, API |
| 03 | [Node.js и Express: Основы](1. node-js/03-nodejs-and-express-basics/) | Создание первого сервера | `http.createServer()`, Express |
| 04 | [Маршрутизация и Middleware](1. node-js/04-express-routing-and-middleware/) | Организация маршрутов | Router, Controller, Middleware |
| 05 | [Архитектура MVC](1. node-js/05-mvc-architecture/) | Разделение ответственности | Model, View, Controller, Service |
| 06 | [Интеграция с MySQL](1. node-js/06-nodejs-and-mysql-integration/) | Работа с базой данных | mysql2, SQL-запросы, CRUD |
| 07 | [Аутентификация (Passport.js)](1. node-js/07-authentication-with-passportjs/) | Вход и регистрация | Sessions, Cookies, bcrypt |
| 08 | [Интеграция Frontend + Backend](1. node-js/08-frontend-backend-integration/) | Связь клиента и сервера | CORS, fetch, защита маршрутов |
| 09 | [Тестирование приложений](1. node-js/09-web-application-testing/) | Основы тестирования | Валидация, отладка |

---

## 🚀 Быстрый старт

### Предварительные требования

| Инструмент | Назначение | Ссылка |
|------------|------------|--------|
| **Node.js** | Платформа JavaScript | [nodejs.org](https://nodejs.org/) (LTS) |
| **VS Code** | Редактор кода | [code.visualstudio.com](https://code.visualstudio.com/) |
| **Postman** | Тестирование API | [postman.com](https://www.postman.com/) |
| **MySQL** | База данных (урок 06+) | [mysql.com](https://dev.mysql.com/downloads/) |

### Установка и запуск

```bash
# 1. Перейдите в папку нужного урока
cd 03-nodejs-and-express-basics

# 2. Установите зависимости
npm install

# 3. Скопируйте .env.example в .env (если есть)
copy .env.example .env

# 4. Запустите сервер
npm start
```

---

## 📊 Прогрессия обучения

```
Урок 01: Введение — Что такое Backend?
    ↓
Урок 02: Клиент-серверная архитектура — HTTP, REST, JSON
    ↓
Урок 03: Первый сервер — Node.js + Express
    ↓
Урок 04: Routing + Middleware — Организация кода
    ↓
Урок 05: MVC Architecture — Model, Controller, Service
    ↓
Урок 06: MySQL — Подключение к базе данных
    ↓
Урок 07: Аутентификация — Passport.js, Sessions
    ↓
Урок 08: Интеграция — Frontend + Backend + CORS
    ↓
Урок 09: Тестирование — Валидация и отладка
```

---

## 📁 Структура каждого урока

```
lesson-name/
│
├── README.md              # Теоретический материал урока
│
├── examples/              # Готовые примеры кода
│   ├── 01-example/
│   │   ├── src/
│   │   │   └── server.js  # Код с подробными комментариями
│   │   └── package.json
│   └── 02-example/
│
├── practice/              # Практические задания
│   └── 01-task/
│       └── task.md        # Описание задания
│
└── assets/                # Диаграммы и изображения
```

---

## 📦 Используемые технологии

| Библиотека | Назначение | Уроки |
|------------|------------|-------|
| `express` | Веб-фреймворк | 03+ |
| `dotenv` | Переменные окружения | 05+ |
| `mysql2` | Драйвер MySQL | 06+ |
| `bcryptjs` | Хеширование паролей | 07+ |
| `passport` | Аутентификация | 07+ |
| `passport-local` | Local Strategy | 07+ |
| `express-session` | Сессии | 07+ |
| `cors` | Cross-Origin запросы | 08+ |

---

## ⏱ Рекомендуемый темп

| Уроки | Время | Результат |
|-------|-------|-----------|
| 01-02 | 1 неделя | Понимание архитектуры |
| 03-04 | 1-2 недели | Первый сервер на Express |
| 05-06 | 2 недели | Работа с MySQL |
| 07 | 1-2 недели | Аутентификация |
| 08-09 | 1 неделя | Интеграция и тестирование |

**Общая длительность:** ~6-8 недель (при 8-10 часах в неделю)

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **Backend** | Серверная часть приложения (логика, БД, API) |
| **Node.js** | Среда выполнения JavaScript вне браузера |
| **Express** | Минималистичный веб-фреймворк для Node.js |
| **REST API** | Архитектурный стиль для веб-сервисов |
| **Middleware** | Промежуточная функция в цепочке обработки запроса |
| **MVC** | Паттерн: Model-View-Controller |
| **Session** | Механизм хранения состояния пользователя на сервере |
| **CORS** | Cross-Origin Resource Sharing (политика безопасности) |

---

## 🤝 Связь с другими модулями

```
┌─────────────────────┐
│  1. Frontend        │  ← HTML, CSS, JavaScript
│  (Клиентская часть) │
└─────────┬───────────┘
          │
          │  HTTP запросы (fetch)
          ↓
┌─────────────────────┐
│  2. Backend         │  ← ВЫ ЗДЕСЬ
│  (Серверная часть)  │
└─────────┬───────────┘
          │
          │  SQL запросы
          ↓
┌─────────────────────┐
│  3. Databases       │  ← MySQL
│  (База данных)      │
└─────────────────────┘
```

---

<div align="center">

### 🚀 Удачи в изучении Backend-разработки!

*Серверный код — это сердце любого веб-приложения*

</div>
