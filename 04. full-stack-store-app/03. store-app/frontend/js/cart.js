/**
 * КОНТРОЛЛЕР СТРАНИЦЫ КОРЗИНЫ (Frontend)
 * 
 * Отвечает за:
 * 1. Загрузку корзины (loadCart).
 * 2. Отрисовку списка товаров.
 * 3. Изменение количества товара (+/-).
 * 4. Удаление товара.
 * 5. Подсчет итоговой стоимости.
 */

// Локальное хранилище данных корзины для отрисовки
let cart = [];

// При загрузке страницы:
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Проверяем, вошел ли пользователь
    // (функция checkAuth сама сходит на сервер)
    const isAuth = await Auth.checkAuth();

    if (!isAuth) {
        // Если не вошел - показываем сообщение и перенаправляем на вход
        showEmptyCart('Войдите в систему для просмотра корзины');
        setTimeout(() => {
            window.location.href = './login.html';
        }, 2000);
        return;
    }

    // 2. Если вошел - загружаем товары
    await loadCart();
});

/**
 * Загрузка данных корзины с сервера.
 */
async function loadCart() {
    const container = document.getElementById('cart-content');

    try {
        console.log('🔄 Загрузка корзины...');
        const response = await API.request(API.endpoints.cart.get);

        if (response.status === 'success' && response.data) {
            cart = response.data; // Сохраняем в переменную

            if (cart.length === 0) {
                showEmptyCart('Ваша корзина пуста');
                return;
            }

            renderCart(); // Рисуем HTML
        } else {
            container.innerHTML = '<p class="error-message">Ошибка загрузки корзины</p>';
        }
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error);
        container.innerHTML = '<p class="error-message">Не удалось загрузить корзину</p>';
    }
}

/**
 * Отрисовка сообщения, если корзина пуста.
 */
function showEmptyCart(message) {
    const container = document.getElementById('cart-content');
    container.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h2>${message}</h2>
            <p style="color: var(--color-text-muted); margin: 1rem 0;">
                Перейдите в каталог, чтобы выбрать товары
            </p>
            <a href="./catalog.html" class="btn btn-primary">В каталог</a>
        </div>
    `;
}

/**
 * Отрисовка списка товаров.
 * Использует шаблонные строки (Template Strings) для генерации HTML.
 */
function renderCart() {
    const container = document.getElementById('cart-content');

    // Считаем сумму
    const total = calculateTotal();

    container.innerHTML = `
        <div class="cart-container">
            <!-- Список товаров -->
            <div class="cart-items">
                ${cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <!-- Если есть картинка - показываем, иначе заглушку -->
                            <!-- ⚠️ escapeHtml защищает от XSS-атак -->
                            ${item.img ? `<img src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}">` : '🖥️'}
                        </div>
                        <div class="cart-item-details">
                            <div>
                                <h3 class="cart-item-name">${escapeHtml(item.name)}</h3>
                                <p class="cart-item-category">${escapeHtml(item.category) || 'Комплектующие'}</p>
                            </div>
                            <div class="cart-item-bottom">
                                <!-- Кнопки + и - -->
                                <div class="quantity-controls">
                                    <button class="quantity-btn" onclick="updateQuantity(${item.rowId}, ${item.quantity - 1})">-</button>
                                    <span class="quantity-display">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="updateQuantity(${item.rowId}, ${item.quantity + 1})">+</button>
                                </div>
                                <div class="cart-item-price">${formatPrice(item.price * item.quantity)} ₽</div>
                            </div>
                        </div>
                        <button class="btn-remove" onclick="removeFromCart(${item.rowId})" title="Удалить">×</button>
                    </div>
                `).join('')} 
            </div>
            
            <!-- Блок "Итого" -->
            <div class="cart-summary">
                <h3>Ваш заказ</h3>
                <div class="summary-row">
                    <span>Товаров:</span>
                    <span>${cart.reduce((sum, item) => sum + item.quantity, 0)} шт.</span>
                </div>
                <div class="summary-row">
                    <span>Стоимость:</span>
                    <span>${formatPrice(total)} ₽</span>
                </div>
                <div class="summary-total">
                    <span>К оплате:</span>
                    <span>${formatPrice(total)} ₽</span>
                </div>
                <button class="btn-checkout" onclick="checkout()">Оформить заказ</button>
            </div>
        </div>
    `;
}

/**
 * Подсчет общей стоимости.
 * Использует метод массива reduce.
 */
function calculateTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

/**
 * Обновление количества товара.
 * @param {number} rowId - ID записи в таблице корзины
 * @param {number} newQuantity - Новое количество
 */
async function updateQuantity(rowId, newQuantity) {
    // Если пытаемся уменьшить меньше 1 -> удаляем товар
    if (newQuantity < 1) {
        await removeFromCart(rowId);
        return;
    }

    try {
        // Отправляем PUT запрос на сервер
        await API.request(API.endpoints.cart.update(rowId), {
            method: 'PUT',
            body: JSON.stringify({ quantity: newQuantity })
        });

        // Перезагружаем корзину, чтобы увидеть актуальные данные
        await loadCart();

        // Обновляем счетчик в шапке (если он есть)
        if (window.updateCartCount) await updateCartCount();

    } catch (error) {
        console.error('Ошибка обновления количества:', error);
        Toast.error('Ошибка при обновлении количества');
    }
}

/**
 * Удаление товара из корзины.
 */
async function removeFromCart(rowId) {
    if (!confirm('Удалить товар из корзины?')) return;

    try {
        await API.request(API.endpoints.cart.remove(rowId), {
            method: 'DELETE'
        });

        Toast.success('Товар удален из корзины');
        await loadCart();
        if (window.updateCartCount) await updateCartCount();

    } catch (error) {
        console.error('Ошибка удаления:', error);
        Toast.error('Ошибка при удалении товара');
    }
}

/**
 * Заглушка для оформления заказа.
 */
function checkout() {
    Toast.info('Функция оформления заказа в разработке! 👷‍♂️');
}

// Делаем функции доступными в HTML (для onclick="")
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.checkout = checkout;
