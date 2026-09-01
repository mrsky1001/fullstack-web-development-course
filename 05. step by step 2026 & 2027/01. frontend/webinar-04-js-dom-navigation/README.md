# Вебинар 4. Введение в JavaScript: DOM-дерево и умная навигация

## 📋 О занятии простыми словами
Сегодня наш сайт начинает оживать! Мы впервые подключаем **JavaScript** — язык программирования, который управляет поведением веб-страницы.

Мы научим JavaScript определять, на какой именно странице сейчас находится пользователь, и автоматически подсвечивать нужную ссылку в главном меню (добавлять класс `.active`).

---

## 🎯 Что мы сегодня сделаем:
1. Создадим файл `js/main.js` и подключим его в HTML с атрибутом `defer`.
2. Поймем, что такое DOM-дерево и почему важно событие `DOMContentLoaded`.
3. Напишем функцию `initNavigation()`, которая находит все ссылки меню через `document.querySelectorAll('.nav-link')`.
4. Настроим автоматическое выделение цветом активного пункта меню.

---

## 💡 Теория простыми словами

### 1. Что такое DOM (Document Object Model)?
Когда браузер читает HTML-файл, он строит в памяти структуру — **DOM-дерево**.  
Каждый тег (`<div>`, `<a>`, `<h1>`) становится JavaScript-объектом. JavaScript может находить эти объекты, менять их текст, цвет, стили и классы!

### 2. Зачем нужен атрибут `defer`?
```html
<script src="js/main.js" defer></script>
```
Атрибут `defer` говорит браузеру: «Загружай JavaScript в фоновом режиме, не тормози показ страницы, и запусти код ровно тогда, когда весь HTML будет готов!».

### 3. Как работает `window.location.pathname`?
Это специальная переменная в браузере, которая хранит путь текущей страницы.  
Например, если пользователь открыл `http://site.ru/pages/catalog.html`, то `window.location.pathname` вернет `"/pages/catalog.html"`.

---

## 📝 Пошаговая инструкция выполнения

### Шаг 1. Подключаем скрипт в `index.html`
Внутри тега `<head>` добавляем строку:
```html
<script src="js/main.js" defer></script>
```

### Шаг 2. Пишем логику в `js/main.js`
```javascript
// СмартОфис — Скрипт веб-приложения (Вебинар 4)

// Ждем полной загрузки HTML-документа
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
});

// Функция подсветки активной ссылки в меню
function initNavigation() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Снимаем класс active со всех ссылок
    link.classList.remove('active');

    // Проверяем совпадение текущего адреса со ссылкой
    if ((current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html')) {
      link.classList.add('active');
    } else if (href.includes('catalog.html') && current.includes('catalog.html')) {
      link.classList.add('active');
    } else if (href.includes('login.html') && current.includes('login.html')) {
      link.classList.add('active');
    }
  });
}
```

---

## 🏁 Чек-лист для самопроверки
- [x] Файл `js/main.js` подключен без ошибок (откройте консоль браузера клавишей F12 — там должно быть чисто).
- [x] Пункт меню «Главная» подсвечивается приятным голубым фоном.
