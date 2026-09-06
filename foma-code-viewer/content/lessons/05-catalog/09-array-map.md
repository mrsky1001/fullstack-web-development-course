---
title: "Метод массива map()"
highlight: js
---

# Преобразование массива (map)

У нас есть массив объектов (комнат). А нам нужен длинный текст, состоящий из кусков HTML-кода. 
Как превратить одно в другое?

Для этого существует метод `.map()` (отобразить). Он проходит по каждому элементу массива и "превращает" его во что-то новое по вашему правилу. Результатом работы `.map()` является **новый массив**.

```javascript
// Пример:
const numbers = [1, 2, 3];
const strings = numbers.map(num => "Цифра: " + num); 
// Результат: ["Цифра: 1", "Цифра: 2", "Цифра: 3"]
```

## 🛠 Задание
Внутри `renderCatalog` напишите основу: `container.innerHTML = OFFICE_ROOMS.map(room => ...)`

```js:start
function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  
}
```

```js:solution
function renderCatalog() {
  const container = document.getElementById('catalogContainer');
  if (!container || typeof OFFICE_ROOMS === 'undefined') return;

  container.innerHTML = OFFICE_ROOMS.map(room => `
    
  `)
}
```
