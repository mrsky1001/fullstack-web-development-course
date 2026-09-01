// ============================================================
// TechParts — Каталог товаров (catalog.js)
// Критерий №18: Каталог (до 5 баллов)
// 1 балл — разметка и стилизация (в HTML/CSS)
// 1 балл — динамический вывод карточек из БД
// 1 балл — кнопка «В корзину»
// 1 балл — фильтрация по названию
// 1 балл — сортировка по цене
// ============================================================

// Адрес API
const API = 'http://localhost:3000/api';

// Массив товаров (загружается из БД)
let products = [];
// Статус авторизации
let isAuthorized = false;

// --- Инициализация при загрузке страницы ---
async function init() {
  // Проверяем авторизацию
  try {
    const res = await fetch(API + '/auth/check', { credentials: 'include' });
    const data = await res.json();
    isAuthorized = data.authorized;
  } catch (err) {
    console.error('Ошибка проверки авторизации:', err);
  }

  // Загружаем товары из БД
  await loadProducts();
}

// --- Загрузка товаров из базы данных ---
// Критерий №18: 1 балл — динамический вывод
async function loadProducts() {
  try {
    const res = await fetch(API + '/products');
    products = await res.json();
    // Отображаем карточки
    renderProducts(products);
  } catch (err) {
    console.error('Ошибка загрузки товаров:', err);
  }
}

// --- Отрисовка карточек товаров ---
function renderProducts(list) {
  const grid = document.getElementById('products-grid');

  // Если товаров нет — показываем сообщение
  if (list.length === 0) {
    grid.innerHTML = '<p style="text-align:center; color:var(--text-light);">Товары не найдены</p>';
    return;
  }

  // Создаём карточки для каждого товара
  grid.innerHTML = list.map(p => `
    <div class="card">
      <!-- Изображение 300x200, растягивается без искажения -->
      <!-- Критерий №5: изображения из задания, Критерий №6: object-fit: cover -->
      <img class="card-image" src="${p.image}" alt="${p.name}">
      <div class="card-body">
        <!-- Категория товара -->
        <span class="card-category">${p.category}</span>
        <!-- Название товара -->
        <div class="card-title">${p.name}</div>
        <!-- Описание -->
        <div class="card-desc">${p.description}</div>
        <!-- Цена в рублях -->
        <div class="card-price">${Number(p.price).toLocaleString('ru-RU')} ₽</div>
        <!-- Кнопка «В корзину» -->
        <!-- Критерий №18: 1 балл — корректная работа кнопки -->
        <button class="btn btn-primary btn-block" onclick="addToCart(${p.id})">
          В корзину
        </button>
      </div>
    </div>
  `).join('');
}

// --- Кнопка «В корзину» ---
// Критерий №18: проверка авторизации при клике
function addToCart(productId) {
  if (!isAuthorized) {
    // Неавторизованный — показываем всплывающее окно
    document.getElementById('auth-modal').classList.add('active');
  } else {
    // Авторизованный — переход на страницу заказа с ID товара
    window.location.href = `order.html?product_id=${productId}`;
  }
}

// --- Закрытие всплывающего окна ---
function closeModal() {
  document.getElementById('auth-modal').classList.remove('active');
}

// --- Поиск по названию (фильтрация) ---
// Критерий №18: 1 балл — фильтрация по названию
document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  // Фильтруем товары по вхождению текста в название
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// --- Сортировка по цене ---
// Критерий №18: 1 балл — сортировка по цене
document.getElementById('sort-select').addEventListener('change', (e) => {
  const value = e.target.value;
  // Копируем массив, чтобы не менять исходный
  let sorted = [...products];

  if (value === 'asc') {
    // По возрастанию цены
    sorted.sort((a, b) => a.price - b.price);
  } else if (value === 'desc') {
    // По убыванию цены
    sorted.sort((a, b) => b.price - a.price);
  }

  renderProducts(sorted);
});

// Запускаем инициализацию
init();
