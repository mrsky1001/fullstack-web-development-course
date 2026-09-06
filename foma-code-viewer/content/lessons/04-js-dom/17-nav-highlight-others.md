---
title: "Подсветка остальных страниц"
highlight: js
---

# Подсветка остальных страниц

Логика для остальных страниц абсолютно идентична: мы проверяем, содержит ли ссылка и адрес страницы нужные слова.

Мы добавим подсветку для:
1. Страницы бронирования (`booking.html`)
2. Страницы личного кабинета / моих броней (`my-bookings.html`)
3. Страницы входа (`login.html`)
4. Страницы регистрации (`register.html`)

## 🛠 Задание

Допишите цепочку `else if` для оставшихся страниц (вы можете скопировать этот большой блок из решения). И на этом скрипт навигации почти завершен!

```js:start
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
      link.classList.add('active');
    }
```

```js:solution
    } else if ((href.includes('catalog.html') || href.includes('room-details.html')) && (current.includes('catalog.html') || current.includes('room-details.html'))) {
      link.classList.add('active');
    } else if (href.includes('booking.html') && current.includes('booking.html')) {
      link.classList.add('active');
    } else if (href.includes('my-bookings.html') && current.includes('my-bookings.html')) {
      link.classList.add('active');
    } else if (href.includes('login.html') && current.includes('login.html')) {
      link.classList.add('active');
    } else if (href.includes('register.html') && current.includes('register.html')) {
      link.classList.add('active');
    }
```
