# TechParts Store Frontend (Standalone Version)

🛒 Интернет-магазин компьютерных комплектующих — **версия без бэкенда** (Mock API).

> ⚠️ **ВАЖНО ДЛЯ СТУДЕНТОВ!**  
> Эта папка (`/docs`) используется для хостинга демонстрационной версии проекта на **GitHub Pages** курса. 
> Данное приложение работает полностью автономно: авторизация и корзина эмулируются через `localStorage` браузера.
> 
> *   Если вам нужна версия с реальным сервером и базой данных MySQL, обратитесь к разделу [4. full-stack-store-app/3. store-app/](../4.%20full-stack-store-app/3.%20store-app/).
> *   Если вам нужна версия на Svelte, перейдите в [4. full-stack-store-app/4. store-app-svelte/](../4.%20full-stack-store-app/4.%20store-app-svelte/).

## 🎯 Назначение

Этот проект демонстрирует разработку frontend **без подключения к backend серверу**. 
Используется Mock API, который имитирует все операции через localStorage:

- **Регистрация/Вход** → данные пользователей в localStorage
- **Корзина** → привязана к email пользователя
- **Каталог товаров** → статический список из `mock-data.js`

## 📁 Структура проекта

```
store-frontend/
├── index.html              # Главная страница
├── css/
│   ├── style.css           # Базовые стили (тема, кнопки, сетка)
│   ├── shop-styles.css     # Стили магазина (карточки, шапка)
│   └── toast.css           # Уведомления
├── js/
│   ├── mock-data.js        # 🆕 Временные товары (18 позиций)
│   ├── mock-api.js         # 🆕 Mock API (имитация бэкенда)
│   ├── config.js           # Конфигурация (использует Mock API)
│   ├── auth.js             # Модуль авторизации
│   ├── theme.js            # Переключение темы
│   ├── security.js         # XSS-защита
│   ├── toast.js            # Уведомления
│   ├── main.js             # Логика главной страницы
│   ├── catalog.js          # Страница каталога
│   ├── cart.js             # Корзина
│   ├── login.js            # Вход
│   └── register.js         # Регистрация
├── pages/
│   ├── catalog.html        # Каталог товаров
│   ├── cart.html           # Корзина
│   ├── login.html          # Вход
│   └── register.html       # Регистрация
└── img/                    # Изображения
```

## ✨ Возможности

### Реализованные функции:
- ✅ **Главная страница** с популярными товарами
- ✅ **Каталог товаров** с фильтрацией по категориям
- ✅ **Корзина** с управлением количеством (+/-, удаление)
- ✅ **Авторизация** через localStorage (вход и регистрация)
- ✅ **Темная/светлая тема**
- ✅ **Адаптивный дизайн** (мобильные устройства)
- ✅ **Toast-уведомления**
- ✅ **XSS-защита** при выводе данных

### 📦 Mock-данные (18 товаров):
| Категория | Кол-во | Примеры |
|-----------|--------|---------|
| Видеокарты | 3 | RTX 5090, RTX 5080, RX 9070 XT |
| Процессоры | 3 | i9-15900K, Ryzen 9 9950X, i7-15700K |
| Материнские платы | 2 | ROG Maximus Z890, MEG X870E |
| Оперативная память | 2 | Trident Z5 64GB, Fury Beast 32GB |
| Накопители | 2 | Samsung 990 PRO, WD Black SN850X |
| Блоки питания | 2 | Corsair RM1000x, Seasonic Prime TX-850 |
| Охлаждение | 2 | Kraken Z73, NH-D15 |
| Корпуса | 2 | Lian Li O11, Fractal Torrent |

## 🚀 Быстрый запуск

### Вариант 1: VS Code + Live Server
1. Установить расширение **Live Server** в VS Code
2. Щелкнуть правой кнопкой на `index.html`
3. Выбрать **"Open with Live Server"**

### Вариант 2: http-server (Node.js)
```bash
# Установить глобально
npm install -g http-server

# Запустить в папке проекта
http-server -p 8000
```

### Вариант 3: Python
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Frontend будет доступен по адресу: `http://localhost:8000`

## 🔧 Как это работает

### LocalStorage ключи:
```javascript
techparts_users          // Список зарегистрированных пользователей
techparts_current_user   // Текущий авторизованный пользователь
techparts_cart_{email}   // Корзина (привязана к email)
```

### Mock API методы:
```javascript
// Товары
MockAPI.products.getAll()      // Получить все товары
MockAPI.products.getById(id)   // Получить по ID

// Авторизация
MockAPI.auth.register(email, password, name)
MockAPI.auth.login(email, password)
MockAPI.auth.logout()
MockAPI.auth.check()

// Корзина
MockAPI.cart.get()
MockAPI.cart.add(productId, quantity)
MockAPI.cart.update(rowId, quantity)
MockAPI.cart.remove(rowId)
```

## 🧪 Тестирование

1. Откройте сайт в браузере
2. Нажмите F12 → Console
3. Вы увидите сообщения:
   ```
   ⚠️ Frontend работает в MOCK-режиме (без бэкенда)
   📦 Данные хранятся в localStorage браузера
   🔧 Mock API загружен. Frontend работает без бэкенда.
   ```

### Быстрый тест:
1. **Регистрация** → создайте аккаунт (например: test@test.com / 123456)
2. **Вход** → войдите с созданными данными
3. **Каталог** → добавьте товары в корзину
4. **Корзина** → измените количество, удалите товары
5. **DevTools** → проверьте localStorage (Application → Local Storage)

## 📝 Отличия от версии с бэкендом

| Функция | С бэкендом | Mock-версия |
|---------|------------|-------------|
| Хранение данных | PostgreSQL | localStorage |
| Авторизация | JWT/Session | localStorage |
| API запросы | fetch → HTTP | MockAPI → localStorage |
| Изображения товаров | CDN/Сервер | Unsplash (внешние) |

## 🎓 Для обучения

Этот проект отлично подходит для изучения:
- Работы с **localStorage**
- Создания **Mock API** для прототипирования
- Структуры **frontend-приложений**
- **Event-driven** архитектуры
- **Модульного JavaScript**

---

Created with ❤️ for IEEU Students
