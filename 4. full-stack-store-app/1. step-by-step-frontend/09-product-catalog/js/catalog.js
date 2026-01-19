/**
 * УРОК 9: СКРИПТ КАТАЛОГА (Frontend)
 * =========================================
 * 
 * Отвечает за:
 * 1. Получение списка товаров с сервера.
 * 2. Генерацию фильтров по категориям.
 * 3. Фильтрацию товаров на клиенте.
 * 4. Отрисовку карточек товаров.
 * 
 * КОНЦЕПЦИИ:
 * - Array.map() для преобразования массивов
 * - Array.filter() для фильтрации
 * - Template literals для генерации HTML
 * - XSS-защита через escapeHtml()
 */

let allProducts = []; // Храним ВСЕ загруженные товары
let currentCategory = 'all'; // Текущая выбранная категория

// При загрузке страницы:
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
});

/**
 * Загрузка всех товаров с сервера
 */
async function loadProducts() {
    const container = document.getElementById('products-container');

    try {
        // Делаем GET запрос к API
        const response = await API.request(API.endpoints.products.all);

        if (response.status === 'success' && response.data) {
            allProducts = response.data; // Сохраняем данные глобально

            // 1. Создаем фильтры по категориям
            // Set — удаляет дубликаты
            // map — получает категории из каждого товара
            // filter(Boolean) — удаляет пустые/undefined значения
            const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
            renderCategoryFilters(categories);

            // 2. Рисуем товары
            renderProducts(allProducts);
        } else {
            container.innerHTML = '<p class="error-message">Ошибка при получении данных</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        container.innerHTML = '<p class="error-message">Не удалось загрузить каталог. Проверьте, запущен ли сервер.</p>';
    }
}

/**
 * Отрисовка кнопок фильтров.
 * @param {string[]} categories - Массив названий категорий
 */
function renderCategoryFilters(categories) {
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return;

    // Создаем HTML-кнопки для каждой категории
    const categoryButtons = categories.map(category => `
        <button class="filter-btn" data-category="${escapeHtml(category)}" onclick="filterByCategory('${escapeHtml(category)}')">
            ${escapeHtml(category)}
        </button>
    `).join('');

    // Добавляем кнопку "Все товары" в начало
    filtersContainer.innerHTML = `
        <button class="filter-btn active" data-category="all" onclick="filterByCategory('all')">
            Все товары
        </button>
        ${categoryButtons}
    `;
}

/**
 * Фильтрация товаров по категории.
 * Вызывается при клике на кнопки фильтров.
 * @param {string} category - Выбранная категория
 */
function filterByCategory(category) {
    currentCategory = category;

    // 1. Переключаем класс active на кнопках
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // 2. Фильтруем массив товаров
    const filtered = category === 'all'
        ? allProducts
        : allProducts.filter(p => p.category === category);

    // 3. Перерисовываем список
    renderProducts(filtered);
}

/**
 * Отрисовка карточек товаров.
 * @param {Object[]} products - Список товаров для отображения
 */
function renderProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p class="loading">Товаров в этой категории пока нет</p>';
        return;
    }

    // Генерируем HTML для каждого товара
    // ⚠️ ВАЖНО: escapeHtml() защищает от XSS-атак!
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.img
            ? `<img src="${escapeHtml(product.img)}" alt="${escapeHtml(product.name)}">`
            : '🖥️'}
            </div>
            <div class="product-info">
                <div class="product-category">${escapeHtml(product.category) || 'Компоненты'}</div>
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <div class="product-price">${formatPrice(product.price)} ₽</div>
                
                <div class="product-actions">
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Форматирование цены с разделителями тысяч.
 * @param {number} price - Цена
 * @returns {string} - Отформатированная строка
 */
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

/**
 * Добавление товара в корзину (заглушка).
 * Будет реализовано в уроке 10.
 * @param {number} productId - ID товара
 */
function addToCart(productId) {
    Toast.info('Функция корзины будет реализована в следующем уроке!');
    console.log('Добавление товара ID:', productId);
}

// Экспортируем функции глобально
window.filterByCategory = filterByCategory;
window.addToCart = addToCart;
window.formatPrice = formatPrice;

/*
 * КАК ЭТО РАБОТАЕТ:
 * 
 * 1. При загрузке страницы вызывается loadProducts()
 * 2. Получаем все товары с сервера
 * 3. Создаем кнопки фильтров из уникальных категорий
 * 4. Рендерим все товары в HTML
 * 5. При клике на фильтр — показываем только нужную категорию
 * 
 * ВАЖНО:
 * - escapeHtml() обязателен для защиты от XSS
 * - formatPrice() улучшает читаемость цен
 * - Вся фильтрация происходит на клиенте (быстро!)
 */
