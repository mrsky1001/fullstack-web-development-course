# Вебинар 4. Введение в JavaScript: DOM-дерево, умная навигация и Слайдер

## 📋 О занятии простыми словами
Сегодня наш сайт начинает оживать! Мы впервые подключаем **JavaScript** — язык программирования, который управляет поведением веб-страницы.

Мы решим сразу две крутые задачи:
1. Научим JavaScript определять текущую страницу и автоматически подсвечивать ссылку в главном меню (класс `.active`).
2. Оживим **интерактивный слайдер фотографий** на главной странице: настроим плавное переключение слайдов, клики по стрелочкам и точкам, а также автопрокрутку каждые 3 секунды!

---

## 🎯 Что мы сегодня сделаем:
1. Создадим файл `js/main.js` и подключим его в HTML с атрибутом `defer`.
2. Поймем, что такое DOM-дерево и почему важно событие `DOMContentLoaded`.
3. Напишем функцию `initNavigation()`, которая находит все ссылки меню через `document.querySelectorAll('.nav-link')`.
4. Сверстаем и оживим слайдер на главной странице с помощью функции `initSlider()`.
5. Настроим переключение слайдов вперед/назад и автоматический таймер через `setInterval()`.

---

> 🚀 **Новичкам в JavaScript (с нуля до слайдера):**  
> Если вы только начинаете и код кажется сложным, начните с нашей интерактивной пошаговой базы:  
> 👉 **[Пошаговый разбор JS со слайдером (9 мини-уроков)](step-by-step/README.md)** — здесь на основе слайдера из проекта «СмартОфис» объясняется каждый шаг: от `console.log` и переменных до живого слайдера с кнопками и таймером!

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

    // Проверяем совпадение адреса через понятные константы-условия
    const isHome = (current.endsWith('index.html') || current.endsWith('/') || current === '') && (href === 'index.html' || href === '../index.html');
    const hasCatalog = (href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'));
    const isBooking = href.includes('booking.html') && current.includes('booking.html');
    const isMyBookings = href.includes('my-bookings.html') && current.includes('my-bookings.html');
    const isLogin = href.includes('login.html') && current.includes('login.html');
    const isRegister = href.includes('register.html') && current.includes('register.html');

    const isActive = isHome || hasCatalog || isBooking || isMyBookings || isLogin || isRegister;
    if (isActive) {
      link.classList.add('active');
    }
  });
}
```

---

## 🏁 Чек-лист для самопроверки
- [x] Файл `js/main.js` подключен без ошибок (откройте консоль браузера клавишей F12 — там должно быть чисто).
- [x] Пункт меню «Главная» подсвечивается приятным голубым фоном.
- [x] На главной странице отображается интерактивный слайдер фотографий с 4 слайдами.
- [x] Стрелки «‹» и «›» плавно переключают слайды вперед и назад.
- [x] Точки-индикаторы снизу показывают активный слайд и переключают при клике.
- [x] Слайдер автоматически меняет фото каждые 3 секунды, а при ручном клике таймер сбрасывается.
