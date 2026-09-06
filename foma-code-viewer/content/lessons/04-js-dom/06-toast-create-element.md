---
title: "Создаем тост (уведомление)"
highlight: js
---

# Создаем тост (уведомление)

Контейнер есть. Теперь нужно создать само уведомление, которое мы положим внутрь этого контейнера.

## Магия конкатенации строк
Вспоминаем, что наша функция принимает параметр `type` (например, `'success'` или `'error'`). У нас в CSS уже заранее прописаны разные цвета для разных классов:
- `.toast-success` — зеленый
- `.toast-error` — красный
- `.toast-info` — синий

Чтобы присвоить нужный класс нашему элементу динамически, мы "склеим" (конкатенируем) строки через плюс: `'toast toast-' + type`. 

Если `type` равен `'info'`, получится строка `'toast toast-info'`. Браузер применит нужный цвет!

Также не забудем вставить текст уведомления в `textContent`.

## 🛠 Задание
Продолжаем писать внутри функции `showNotification` (ПОСЛЕ блока `if (!container) { ... }`).

```js:start
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}
```

```js:solution
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.textContent = message;
}
```
