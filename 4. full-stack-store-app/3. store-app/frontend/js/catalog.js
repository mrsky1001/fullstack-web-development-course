/**
 * СКРИПТ КАТАЛОГА (Frontend)
 * 
 * Отвечает за:
 * 1. Получение списка товаров с сервера.
 * 2. Генерацию фильтров по категориям.
 * 3. Фильтрацию товаров на клиенте (без доп. запросов к серверу).
 * 4. Отрисовку карточек товаров.
 */

let allProducts = []; // Здесь храним ВСЕ загруженные товары
let currentCategory = 'all'; // Выбранная категория

// При загрузке страницы:
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    // Функция `updateCartCount` находится в main.js и обновляет счетчик в шапке
    if (window.updateCartCount) await updateCartCount();
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
            allProducts = response.data; // Сохраняем данные

            // 1. Создаем фильтры
            // Set - удаляет дубликаты. map получает категории. filter(Boolean) удаляет пустые.
            const categories = [...new Set(allProducts.map(p => p.category).filter(Boolean))];
            renderCategoryFilters(categories);

            // 2. Рисуем товары
            renderProducts(allProducts);
        } else {
            container.innerHTML = '<p class="error-message">Ошибка при получении данных</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        container.innerHTML = '<p class="error-message">Не удалось загрузить каталог</p>';
    }
}

/**
 * Отрисовка кнопок фильтров.
 * @param {string[]} categories - Массив названий категорий
 */
function renderCategoryFilters(categories) {
    const filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return; // Защита если элемента нет (например на главной)

    // Создаем HTML кнопки для каждой категории
    const categoryButtons = categories.map(category => `
        <button class="filter-btn" data-category="${category}" onclick="filterByCategory('${category}')">
            ${category}
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
 * Фильтрация товаров.
 * Эта функция вызывается при клике на кнопки.
 * @param {string} category
 */
function filterByCategory(category) {
    currentCategory = category;

    // 1. Переключаем класс active на кнопках
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        // Если data-category совпадает с выбранной - делаем активной
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });

    // 2. Фильтруем массив товаров
    const filtered = category === 'all'
        ? allProducts // Если "Все", берем полный список
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
                ${product.img ? `<img src="${escapeHtml(product.img)}" alt="${escapeHtml(product.name)}">` : '🖥️'}
            </div>
            <div class="product-info">
                <div class="product-category">${escapeHtml(product.category) || 'Компоненты'}</div>
                <h3 class="product-name">${escapeHtml(product.name)}</h3>
                <div class="product-price">${formatPrice(product.price)} ₽</div>
                
                <div class="product-actions">
                    <!-- addToCart определена в main.js -->
                    <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Экспортируем функцию фильтрации, чтобы она была доступна в HTML
window.filterByCategory = filterByCategory;
