# TechParts Store Frontend

Интернет-магазин компьютерных комплектующих на основе лендинга.

## Структура проекта

```
store-frontend/
├── index.html          # Главная страница
├── css/
│   ├── style.css       # Базовые стили из лендинга
│   └── shop-styles.css # Дополнительные стили магазина
├── js/
│   ├── config.js       # Конфигурация API
│   ├── auth.js         # Управление авторизацией
│   ├── theme.js        # Переключение темы
│   ├── main.js         # Главная страница
│   ├── catalog.js      # Страница каталога
│   ├── cart.js         # Корзина
│   ├── login.js        # Вход
│   └── register.js     # Регистрация
├── pages/
│   ├── catalog.html    # Каталог товаров
│   ├── cart.html       # Корзина
│   ├── login.html      # Вход
│   └── register.html   # Регистрация
└── img/                # Изображения
```

## Возможности

### Реализованные функции:
- ✅ **Главная страница** с популярными товарами
- ✅ **Каталог товаров** с фильтрацией по категориям
- ✅ **Корзина** с управлением количеством
- ✅ **Авторизация** (вход и регистрация)
- ✅ **Темная/светлая тема**
- ✅ **Адаптивный дизайн** (мобильные устройства)
- ✅ **Интеграция с backend API**

### API Endpoints:
- `GET /product/all` - Получить все товары
- `GET /product/:id` - Получить товар по ID
- `POST /auth/register` - Регистрация
- `POST /auth/login` - Вход
- `POST /auth/logout` - Выход
- `GET /auth/check` - Проверка авторизации
- `GET /shopping-cart` - Получить корзину
- `POST /shopping-cart/add` - Добавить в корзину
- `PUT /shopping-cart/update/:id` - Обновить количество
- `DELETE /shopping-cart/remove/:id` - Удалить из корзины

## Запуск

### 1. Запустить backend:
```bash
cd ../backend
npm install
npm start
```

Backend будет доступен по адресу: `http://localhost:3000`

### 2. Запустить frontend:

Можно использовать любой простой HTTP-сервер:

**С помощью Node.js (http-server):**
```bash
# Установить глобально
npm install -g http-server

# Запустить
http-server -p 8000
```

**С помощью VS Code:**
- Установить расширение "Live Server"
- Щелкнуть правой кнопкой на `index.html` → "Open with Live Server"

Frontend будет доступен по адресу: `http://localhost:8000`

## Тестовые данные для входа

Backend использует mock-данные. Вы можете создать новый аккаунт через страницу регистрации.

---

Created with ❤️ for IEEU Students
