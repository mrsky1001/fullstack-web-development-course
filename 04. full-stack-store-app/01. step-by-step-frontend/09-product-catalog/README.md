# Урок 09: Каталог товаров

## 🎯 Цели урока

После завершения этого урока вы будете:
- Загружать данные с сервера и отображать их
- Генерировать HTML динамически
- Создавать фильтры категорий
- Понимать защиту от XSS-атак

## 📝 Что добавлено в этом уроке

### Новые файлы

```
09-product-catalog/
├── js/
│   ├── catalog.js    # НОВОЕ: Логика каталога
│   └── security.js   # НОВОЕ: Защита от XSS
└── README.md
```

### Загрузка и отображение товаров

```javascript
async function loadProducts() {
    const response = await API.request(API.endpoints.products.all);
    
    if (response.status === 'success') {
        allProducts = response.data;
        renderProducts(allProducts);
    }
}

function renderProducts(products) {
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <h3>${escapeHtml(product.name)}</h3>
            <div class="price">${formatPrice(product.price)} ₽</div>
            <button onclick="addToCart(${product.id})">В корзину</button>
        </div>
    `).join('');
}
```

### Фильтрация

```javascript
function filterByCategory(category) {
    const filtered = category === 'all'
        ? allProducts
        : allProducts.filter(p => p.category === category);
    
    renderProducts(filtered);
}
```

## 💡 Ключевые концепции

### XSS-защита (escapeHtml)

```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Пример:
// escapeHtml('<script>alert("XSS")</script>')
// → '&lt;script&gt;alert("XSS")&lt;/script&gt;'
```

**ВАЖНО:** Всегда экранируйте пользовательские данные!

### Template Literals (Шаблонные строки)

```javascript
const html = `
    <div class="${className}">
        <h3>${title}</h3>
        <p>${description}</p>
    </div>
`;
```

### Array.map() + .join('')

```javascript
const items = ['A', 'B', 'C'];

// map преобразует каждый элемент
// join объединяет в строку
const html = items.map(item => `<li>${item}</li>`).join('');
// Результат: '<li>A</li><li>B</li><li>C</li>'
```

### Форматирование цены

```javascript
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

// formatPrice(123456) → "123 456"
```

## 🔍 Проверьте работу

1. Откройте страницу каталога
2. Товары должны загрузиться с сервера
3. Нажмите на категорию — товары отфильтруются
4. Нажмите "Все товары" — вернутся все

## ⚠️ Безопасность

**НИКОГДА** не вставляйте данные из БД напрямую в HTML:
```javascript
// ❌ ОПАСНО!
container.innerHTML = `<h3>${product.name}</h3>`;

// ✅ БЕЗОПАСНО
container.innerHTML = `<h3>${escapeHtml(product.name)}</h3>`;
```

## 📚 Дополнительные материалы

- [MDN: Array.map()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.filter()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [XSS атаки](https://owasp.org/www-community/attacks/xss/)
