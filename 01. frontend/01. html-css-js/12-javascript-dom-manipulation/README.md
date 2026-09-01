# Урок 12: Работа с DOM

## 🎯 Цели урока

После завершения этого урока вы сможете:

- Объяснить, что такое **DOM** (Document Object Model)
- **Находить** элементы на странице различными способами
- **Изменять** содержимое, атрибуты и стили элементов
- **Создавать** и **удалять** элементы динамически
- Работать с **классами** элементов
- Понимать разницу между **innerHTML и textContent**

---

## 📚 Теоретическая часть

### Что такое DOM?

**DOM (Document Object Model)** — объектная модель документа. Это программный интерфейс для HTML-документов, который представляет страницу в виде дерева объектов.

```
                    document
                        │
                      <html>
                    ┌───┴───┐
                 <head>   <body>
                   │      ┌──┴──┐
                <title>  <h1>  <div>
                                 │
                               <p>
```

### Зачем нужен DOM?

| Возможность | Пример |
|-------------|--------|
| Изменять содержимое | Обновить текст кнопки |
| Менять стили | Изменить цвет при наведении |
| Добавлять элементы | Показать новый товар в корзине |
| Удалять элементы | Удалить сообщение об ошибке |
| Реагировать на события | Обработать клик по кнопке |

---

## 🔍 Поиск элементов

### getElementById

```javascript
// Находит один элемент по ID
const header = document.getElementById('main-header');
console.log(header);

// Если элемент не найден — возвращает null
const notFound = document.getElementById('non-existent');
console.log(notFound); // null
```

### querySelector

```javascript
// Находит ПЕРВЫЙ элемент по CSS-селектору
const button = document.querySelector('.btn');
const input = document.querySelector('input[type="email"]');
const firstItem = document.querySelector('ul > li:first-child');

// Если не найден — возвращает null
```

### querySelectorAll

```javascript
// Находит ВСЕ элементы по CSS-селектору
// Возвращает NodeList (похож на массив)
const allButtons = document.querySelectorAll('.btn');
const allParagraphs = document.querySelectorAll('p');

// Перебор результатов
allButtons.forEach(btn => {
    console.log(btn.textContent);
});

// NodeList можно преобразовать в массив
const buttonsArray = Array.from(allButtons);
const buttonsArray2 = [...allButtons];
```

### Другие методы (устаревшие, но встречаются)

```javascript
// По имени тега
const divs = document.getElementsByTagName('div');

// По имени класса
const cards = document.getElementsByClassName('card');

// По атрибуту name
const radios = document.getElementsByName('gender');
```

### Поиск внутри элемента

```javascript
const container = document.querySelector('.container');

// Ищем только внутри container
const innerButton = container.querySelector('.btn');
const innerItems = container.querySelectorAll('.item');
```

### Навигация по DOM

```javascript
const element = document.querySelector('.item');

// Родитель
element.parentElement;
element.parentNode;

// Дочерние
element.children;           // Только элементы
element.childNodes;         // Все узлы (включая текст)
element.firstElementChild;
element.lastElementChild;

// Соседние
element.nextElementSibling;
element.previousElementSibling;

// Поиск ближайшего предка
element.closest('.container'); // Ближайший .container выше по дереву
```

---

## 📝 Изменение содержимого

### textContent

```javascript
const heading = document.querySelector('h1');

// Получить текст
console.log(heading.textContent);

// Установить текст
heading.textContent = 'Новый заголовок';

// textContent безопасен от XSS-атак!
heading.textContent = '<script>alert("hack")</script>';
// Выведет текст буквально, не выполнит скрипт
```

### innerHTML

```javascript
const container = document.querySelector('.container');

// Получить HTML
console.log(container.innerHTML);

// Установить HTML
container.innerHTML = '<h2>Заголовок</h2><p>Параграф</p>';

// ОСТОРОЖНО: innerHTML может привести к XSS!
// Не вставляйте пользовательские данные напрямую!
```

### innerText

```javascript
// Похож на textContent, но учитывает CSS
// Например, скрытый текст (display: none) не вернётся
const element = document.querySelector('.text');
console.log(element.innerText);
```

### Разница textContent vs innerHTML

```javascript
const div = document.querySelector('div');

// textContent — только текст, безопасно
div.textContent = '<b>Жирный</b>'; // Отобразит: <b>Жирный</b>

// innerHTML — парсит HTML, потенциально опасно
div.innerHTML = '<b>Жирный</b>';   // Отобразит: Жирный (жирным)
```

---

## 🏷 Работа с атрибутами

### getAttribute / setAttribute

```javascript
const link = document.querySelector('a');

// Получить атрибут
const href = link.getAttribute('href');
const target = link.getAttribute('target');

// Установить атрибут
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');

// Удалить атрибут
link.removeAttribute('target');

// Проверить наличие атрибута
if (link.hasAttribute('href')) {
    console.log('Ссылка имеет href');
}
```

### Прямой доступ к свойствам

```javascript
const input = document.querySelector('input');
const img = document.querySelector('img');

// Многие атрибуты доступны как свойства
console.log(input.value);
console.log(input.type);
console.log(input.disabled);
console.log(img.src);
console.log(img.alt);

// Изменение
input.value = 'Новое значение';
input.disabled = true;
img.src = 'new-image.jpg';
```

### data-атрибуты (dataset)

```html
<div id="product" data-id="123" data-price="999" data-in-stock="true"></div>
```

```javascript
const product = document.getElementById('product');

// Чтение через dataset
console.log(product.dataset.id);       // "123"
console.log(product.dataset.price);    // "999"
console.log(product.dataset.inStock);  // "true" (camelCase!)

// Запись
product.dataset.category = 'electronics';
// Добавит: data-category="electronics"
```

---

## 🎨 Работа с классами

### classList

```javascript
const element = document.querySelector('.card');

// Добавить класс
element.classList.add('active');
element.classList.add('visible', 'highlighted'); // Несколько

// Удалить класс
element.classList.remove('hidden');
element.classList.remove('old', 'deprecated'); // Несколько

// Переключить класс (toggle)
element.classList.toggle('expanded'); // Добавит, если нет; удалит, если есть

// Условный toggle
element.classList.toggle('active', isActive); // Добавит если isActive = true

// Проверить наличие
if (element.classList.contains('active')) {
    console.log('Элемент активен');
}

// Заменить класс
element.classList.replace('old-class', 'new-class');

// Получить список классов
console.log(element.classList); // DOMTokenList
console.log([...element.classList]); // Массив классов
```

### className (устаревший способ)

```javascript
const element = document.querySelector('.card');

// Получить все классы как строку
console.log(element.className); // "card featured"

// Установить (перезаписывает все классы!)
element.className = 'card active';

// Лучше использовать classList!
```

---

## 🎨 Работа со стилями

### style (инлайн-стили)

```javascript
const element = document.querySelector('.box');

// Установка стилей
element.style.backgroundColor = '#3498db';
element.style.fontSize = '18px';
element.style.marginTop = '20px';
element.style.display = 'flex';

// Получение стиля
console.log(element.style.backgroundColor);

// Удаление стиля
element.style.backgroundColor = '';10:20
element.style.removeProperty('font-size');

// Несколько стилей сразу
element.style.cssText = 'color: white; font-size: 16px; padding: 10px;';
```

### getComputedStyle (вычисленные стили)

```javascript
const element = document.querySelector('.box');

// Получить ВСЕ вычисленные стили (включая CSS-файлы)
const styles = getComputedStyle(element);

console.log(styles.backgroundColor);
console.log(styles.fontSize);
console.log(styles.getPropertyValue('margin-top'));
```

---

## ➕➖ Создание и удаление элементов

### Создание элемента

```javascript
// Создать элемент
const newDiv = document.createElement('div');

// Добавить содержимое
newDiv.textContent = 'Новый элемент';

// Добавить классы
newDiv.classList.add('card', 'new');

// Добавить атрибуты
newDiv.setAttribute('data-id', '123');

// Добавить стили
newDiv.style.backgroundColor = '#f0f0f0';
```

### Вставка элемента

```javascript
const container = document.querySelector('.container');
const newElement = document.createElement('div');
newElement.textContent = 'Новый элемент';

// В конец контейнера
container.appendChild(newElement);
container.append(newElement);           // Современный
container.append('Просто текст');       // Можно добавлять текст

// В начало контейнера
container.prepend(newElement);

// До/после элемента
const reference = document.querySelector('.reference');
reference.before(newElement);           // Перед элементом
reference.after(newElement);            // После элемента

// Заменить содержимое
container.replaceChildren(newElement);  // Удаляет все и добавляет

// insertAdjacentHTML — вставка HTML-строки
container.insertAdjacentHTML('beforeend', '<p>Новый параграф</p>');
// Позиции: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
```

### Удаление элемента

```javascript
const element = document.querySelector('.to-remove');

// Современный способ
element.remove();

// Старый способ (через родителя)
element.parentElement.removeChild(element);

// Очистить содержимое
container.innerHTML = '';
container.replaceChildren(); // Современный
```

### Клонирование элемента

```javascript
const original = document.querySelector('.template');

// Клон без потомков
const shallowClone = original.cloneNode(false);

// Клон с потомками
const deepClone = original.cloneNode(true);

// Добавить на страницу
document.body.appendChild(deepClone);
```

---

## 📁 Структура урока

```
12-javascript-dom-manipulation/
│
├── README.md                    # Этот файл
├── examples/
│   ├── 01-selecting-elements/   # Поиск элементов
│   ├── 02-modifying-content/    # Изменение содержимого
│   ├── 03-attributes-classes/   # Атрибуты и классы
│   ├── 04-styles/               # Работа со стилями
│   └── 05-creating-elements/    # Создание элементов
├── practice/
│   ├── 01-todo-list/            # Список дел
│   └── 02-dynamic-gallery/      # Динамическая галерея
└── assets/
```

---

## 📖 Глоссарий

| Термин | Определение |
|--------|-------------|
| **DOM** | Document Object Model — объектная модель документа |
| **Node** | Узел DOM-дерева (элемент, текст, комментарий) |
| **Element** | Элемент DOM (HTML-тег) |
| **NodeList** | Коллекция узлов (результат querySelectorAll) |
| **HTMLCollection** | Коллекция элементов (результат getElementsBy...) |

