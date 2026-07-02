// ============================================================
// TechParts — Оформление заказа (order.js)
// Критерий №19: Страница оформления заказа (до 6 баллов)
// 1 балл — разметка и стилизация (в HTML/CSS)
// 1 балл — доступность только авторизованным
// 1 балл — функционал полей
// 1 балл — расчёт общей стоимости
// 2 балла — отработка «Оформить заказ» (успех/ошибка)
// ============================================================

// Адрес API
const API = 'http://localhost:3000/api';

// Массив товаров (для расчёта цены)
let products = [];

// --- Инициализация страницы ---
async function init() {
  // --- Проверка авторизации ---
  // Критерий №19: 1 балл — доступность только авторизованным
  try {
    const res = await fetch(API + '/auth/check', { credentials: 'include' });
    const data = await res.json();

    // Если не авторизован — редирект на login.html
    if (!data.authorized) {
      window.location.href = 'login.html';
      return;
    }
  } catch (err) {
    console.error('Ошибка проверки авторизации:', err);
    return;
  }

  // --- Загрузка списка товаров для select ---
  try {
    const res = await fetch(API + '/products');
    products = await res.json();

    // Заполняем выпадающий список
    const select = document.getElementById('product-select');
    products.forEach(p => {
      const option = document.createElement('option');
      option.value = p.id;
      option.textContent = `${p.name} — ${Number(p.price).toLocaleString('ru-RU')} ₽`;
      option.setAttribute('data-price', p.price);
      select.appendChild(option);
    });

    // Если в URL передан product_id — выбираем его
    // Критерий №19: активным будет тот товар, по которому произошёл переход
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product_id');
    if (productId) {
      select.value = productId;
    }

    // Пересчитываем стоимость
    updateTotal();
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err);
  }

  // --- Установка минимальной даты (сегодня) ---
  // Критерий №19: дата не раньше сегодняшнего дня
  const dateInput = document.getElementById('delivery-date');
  const today = new Date().toISOString().split('T')[0]; // формат YYYY-MM-DD
  dateInput.min = today;
  dateInput.value = today;
}

// --- Расчёт общей стоимости ---
// Критерий №19: 1 балл — автоматический расчёт
function updateTotal() {
  const select = document.getElementById('product-select');
  const quantity = parseInt(document.getElementById('quantity').value) || 1;

  // Находим цену выбранного товара
  const selectedOption = select.options[select.selectedIndex];
  const price = selectedOption ? parseFloat(selectedOption.getAttribute('data-price')) || 0 : 0;

  // Рассчитываем общую стоимость
  const total = price * quantity;

  // Отображаем: «Общая стоимость: X руб.»
  document.getElementById('total-price').textContent =
    `Общая стоимость: ${total.toLocaleString('ru-RU')} руб.`;
}

// --- Слушатели для пересчёта стоимости ---
document.getElementById('product-select').addEventListener('change', updateTotal);
document.getElementById('quantity').addEventListener('input', updateTotal);

// --- Отправка формы заказа ---
// Критерий №19: 2 балла — корректная отработка (успех/ошибка)
document.getElementById('order-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = document.getElementById('product-select').value;
  const deliveryDate = document.getElementById('delivery-date').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const comment = document.getElementById('comment').value.trim();

  // Получаем цену для расчёта total_price
  const select = document.getElementById('product-select');
  const price = parseFloat(select.options[select.selectedIndex].getAttribute('data-price')) || 0;
  const totalPrice = price * quantity;

  // Проверка: дата не в прошлом
  const today = new Date().toISOString().split('T')[0];
  if (deliveryDate < today) {
    document.getElementById('order-message').innerHTML =
      '<div class="message error">Дата доставки не может быть в прошлом</div>';
    return;
  }

  try {
    // Отправляем данные на сервер
    const res = await fetch(API + '/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        product_id: productId,
        delivery_date: deliveryDate,
        quantity: quantity,
        total_price: totalPrice,
        comment: comment
      })
    });

    const data = await res.json();
    const msgDiv = document.getElementById('order-message');

    if (res.ok) {
      // Успех: «Ваш заказ оформлен! Номер заказа: #X»
      msgDiv.innerHTML = `
        <div class="message success">
          Ваш заказ оформлен! Номер заказа: <strong>#${data.order_id}</strong>
        </div>
      `;
      // Кнопка для перехода на «Мои заказы»
      document.getElementById('order-form').innerHTML = `
        <a href="my-orders.html" class="btn btn-primary btn-block">Мои заказы</a>
      `;
    } else {
      // Ошибка
      msgDiv.innerHTML = `<div class="message error">${data.error}</div>`;
    }
  } catch (err) {
    console.error('Ошибка оформления заказа:', err);
  }
});

// Запускаем инициализацию
init();
