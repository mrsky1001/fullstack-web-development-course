/**
 * ОСНОВНОЙ СКРИПТ КЛИЕНТА (Frontend)
 * 
 * Содержит общую логику для всего сайта:
 * 1. Загрузка "Популярных товаров" на главной странице.
 * 2. Основная функция `addToCart` (добавить в корзину).
 * 3. Обновление счетчика товаров в шапке (`updateCartCount`).
 * 4. Утилиту для форматирования цен (`formatPrice`).
 */

// При загрузке страницы запускаем инициализацию
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Если мы на главной странице -> грузим популярные товары
    await loadFeaturedProducts();

    // 2. Всегда обновляем счетчик корзины (вдруг пользователь удалил/добавил что-то в другой вкладке)
    await updateCartCount();
});

/**
 * Загрузка "Избранных товаров" (Featured Products) для главной страницы.
 * (По логике бэкенда пока просто берем первые 6 товаров, но в будущем это может быть топ продаж).
 */
async function loadFeaturedProducts() {
    const container = document.getElementById('featured-products-grid');
    // Если контейнера нет (мы не на главной), просто выходим
    if (!container) return;

    try {
        const response = await API.request(API.endpoints.products.all);

        if (response.status === 'success' && response.data) {
            // Берем первые 6 товаров (slice)
            const featuredProducts = response.data.slice(0, 6);

            if (featuredProducts.length === 0) {
                container.innerHTML = '<p class="loading">Товары не найдены</p>';
                return;
            }


            // Генерируем HTML карточек
            // ⚠️ ВАЖНО: Используем escapeHtml() для данных из БД!
            // Это защита от XSS-атак (если кто-то добавит <script> в название товара)
            container.innerHTML = featuredProducts.map(product => `
                <div class="product-card" onclick="viewProduct(${product.id})">
                    <div class="product-image">
                        ${product.img ? `<img src="${escapeHtml(API.getImageUrl(product.img))}" alt="${escapeHtml(product.name)}">` : '🖥️'}
                    </div>
                    <div class="product-info">
                        <div class="product-category">${escapeHtml(product.category) || 'Компоненты'}</div>
                        <h3 class="product-name">${escapeHtml(product.name)}</h3>
                        <div class="product-price">${formatPrice(product.price)} ₽</div>
                        <div class="product-actions">
                            <!-- preventDefault / stopPropagation нужны, чтобы клик по кнопке не 
                                 считался кликом по всей карточке (не открывал страницу товара) -->
                            <button class="btn-add-to-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
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
        console.error('Ошибка загрузки популярных товаров:', error);
        container.innerHTML = '<p class="error-message">Не удалось загрузить товары</p>';
    }
}

/**
 * Главная функция добавления товара в корзину.
 * Вызывается из каталога и с главной страницы.
 */
async function addToCart(productId) {
    // 1. Проверяем авторизацию. Если не вошел - отправляем логиниться.
    if (!Auth.isAuthenticated) {
        Toast.warning('Сначала нужно войти в аккаунт!');

        // Перенаправляем на страницу входа через 1.5 секунды
        setTimeout(() => {
            window.location.href = getPagePath('login.html');
        }, 1500);
        return;
    }

    try {
        // 2. Отправляем запрос на сервер
        const response = await API.request(API.endpoints.cart.add, {
            method: 'POST',
            body: JSON.stringify({ productId, quantity: 1 }) // Добавляем по 1 штуке
        });

        if (response.status === 'success') {
            // 3. Показываем красивое уведомление
            Toast.success('Товар добавлен в корзину!');
            // 4. Обновляем счетчик
            await updateCartCount();
        }
    } catch (error) {
        console.error('Ошибка добавления в корзину:', error);
        Toast.error('Не удалось добавить товар');
    }
}

/**
 * Обновление счетчика товаров в шапке сайта (красный кружочек).
 */
async function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    // Если гость - счетчик 0
    if (!Auth.isAuthenticated) {
        cartCount.textContent = '0';
        // Можно его вообще скрыть: cartCount.style.display = 'none';
        return;
    }

    try {
        // Подгружаем актуальную корзину
        const response = await API.request(API.endpoints.cart.get);
        if (response.status === 'success' && response.data) {
            // Считаем общее количество всех товаров
            // reduce пробегает по всем элементам и складывает их quantity
            const totalItems = response.data.reduce((sum, item) => sum + item.quantity, 0);

            cartCount.textContent = totalItems;

            // Если больше 0 - показываем, иначе можно скрывать
            cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    } catch (error) {
        console.error('Ошибка обновления счетчика:', error);
        cartCount.textContent = '0';
    }
}

/**
 * Переход на страницу товара (пока переход в каталог с фильтром, но можно сделать отдельную страницу).
 */
function viewProduct(productId) {
    // Пример реализации детальной страницы (пока не используется)
    // window.location.href = `${getPagePath('product.html')}?id=${productId}`;

    // Пока просто ведем в каталог
    window.location.href = `${getPagePath('catalog.html')}`;
}

/**
 * Утилита: Красивое форматирование цены (123000 -> 123 000 ₽)
 */
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(price);
}

// Экспортируем функции, чтобы их можно было вызывать из HTML (onclick)
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;
window.viewProduct = viewProduct;
window.formatPrice = formatPrice;
