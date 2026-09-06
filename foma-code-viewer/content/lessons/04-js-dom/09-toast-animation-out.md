---
title: "Анимация исчезновения"
highlight: js
---

# Управление CSS из JavaScript

Внутри таймера (спустя 3.5 секунды) мы могли бы просто взять и удалить тост мгновенно. Но это выглядело бы очень резко и некрасиво. Хороший дизайн требует плавности.

Знаете ли вы, что JavaScript может напрямую менять CSS-свойства любого элемента? Для этого используется объект `style`.

Мы зададим нашему тосту `transition` (плавность), а затем сделаем его полностью прозрачным (`opacity: '0'`) и сдвинем чуть вниз (`transform: 'translateY(10px)'`). Браузер сам анимирует этот переход!

*(Обратите внимание: мы задаем стили как строки внутри кавычек).*

## 🛠 Задание

Внутри `setTimeout` добавьте эти три строчки для изменения CSS-свойств тоста.

```js:start
  container.appendChild(toast);

  setTimeout(() => {
    
  }, 3500);
}
```

```js:solution
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 3500);
}
```
