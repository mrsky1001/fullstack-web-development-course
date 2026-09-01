/**
 * УРОК 9: СКРИПТ ГЛАВНОЙ СТРАНИЦЫ (Frontend)
 * =========================================
 * 
 * Отвечает за:
 * 1. Загрузку популярных товаров на главной странице.
 * 2. Отображение первых N товаров.
 * 
 * КОНЦЕПЦИИ:
 * - Переиспользование функций
 * - Array.slice() для ограничения количества
 */

// При загрузке главной страницы:
document.addEventListener('DOMContentLoaded', async () => {
    await loadFeaturedProducts();
});

/**
 * Загрузка популярных товаров для главной страницы.
 * Показывает первые 3 товара.
 */
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');
    if (!container) return; // Если элемента нет (мы не на главной), выходим

    try {
        const response = await API.request(API.endpoints.products.all);

        if (response.status === 'success' && response.data) {
            // Берем только первые 3 товара
            const featured = response.data.slice(0, 3);

            if (featured.length === 0) {
                container.innerHTML = '<p class="loading">Товаров пока нет</p>';
                return;
            }

            // Рендерим товары
            container.innerHTML = featured.map(product => `
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
        } else {
            container.innerHTML = '<p class="error-message">Ошибка загрузки товаров</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error);
        container.innerHTML = '<p class="error-message">Не удалось загрузить товары. Проверьте, запущен ли сервер.</p>';
    }
}

/**
 * Форматирование цены с разделителями тысяч.
 */
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

/**
 * Добавление товара в корзину (заглушка).
 */
function addToCart(productId) {
    Toast.info('Функция корзины будет реализована в следующем уроке!');
    console.log('Добавление товара ID:', productId);
}

// Экспортируем глобально
window.formatPrice = formatPrice;
window.addToCart = addToCart;
