// Инициализация элементов слайдера отзывов и карточек продуктов
const productCards = document.querySelectorAll('.product-card');
const reviewSlider = document.querySelector('.review-slider');
const reviewSlides = document.querySelectorAll('.review-card');
const prevReviewButton = document.querySelector('.review-arrow.left');
const nextReviewButton = document.querySelector('.review-arrow.right');
const reviewDotsContainer = document.querySelector('.review-dots');
let orderCount = 0;
let currentReviewIndex = 0;

// Создание точек навигации для слайдера отзывов
reviewSlides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('review-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReviewSlide(index));
    reviewDotsContainer.appendChild(dot);
});

const reviewDots = document.querySelectorAll('.review-dot');

// Обновление позиции слайдера отзывов
function updateReviewSlider() {
    const slideWidth = reviewSlides[0].offsetWidth + 20;
    reviewSlider.style.transform = `translateX(-${currentReviewIndex * slideWidth}px)`;
    reviewDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentReviewIndex);
    });
}

// Переход к указанному слайду отзывов
function goToReviewSlide(index) {
    currentReviewIndex = index;
    if (currentReviewIndex < 0) currentReviewIndex = reviewSlides.length - 1;
    if (currentReviewIndex >= reviewSlides.length) currentReviewIndex = 0;
    updateReviewSlider();
}

// Обработчик кнопки "Назад" для слайдера отзывов
prevReviewButton.addEventListener('click', () => {
    currentReviewIndex--;
    if (currentReviewIndex < 0) currentReviewIndex = reviewSlides.length - 1;
    updateReviewSlider();
});

// Обработчик кнопки "Вперед" для слайдера отзывов
nextReviewButton.addEventListener('click', () => {
    currentReviewIndex++;
    if (currentReviewIndex >= reviewSlides.length) currentReviewIndex = 0;
    updateReviewSlider();
});

// Обновление слайдера при изменении размера окна
window.addEventListener('resize', updateReviewSlider);
updateReviewSlider();

// Фильтрация продуктов по заданным критериям
function filterProducts() {
    // Получение значений фильтров из формы
    const nameFilter = document.getElementById('name-filter').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const minPower = parseFloat(document.getElementById('min-power').value) || 0;
    const maxPower = parseFloat(document.getElementById('max-power').value) || Infinity;
    const minSpeed = parseFloat(document.getElementById('min-speed').value) || 0;
    const maxSpeed = parseFloat(document.getElementById('max-speed').value) || Infinity;
    const minCutDepth = parseFloat(document.getElementById('min-cut-depth').value) || 0;
    const maxCutDepth = parseFloat(document.getElementById('max-cut-depth').value) || Infinity;
    const minWeight = parseFloat(document.getElementById('min-weight').value) || 0;
    const maxWeight = parseFloat(document.getElementById('max-weight').value) || Infinity;

    // Проверка каждой карточки продукта на соответствие фильтрам
    productCards.forEach(card => {
        const price = parseFloat(card.dataset.price);
        const name = card.dataset.name.toLowerCase();
        const specs = card.dataset.specs.split(', ');
        const power = parseFloat(specs[0].split(': ')[1]) || 0;
        const speed = parseFloat(specs[1].split(': ')[1]) || 0;
        const cutDepth = parseFloat(specs[2].split(': ')[1]) || 0;
        const weight = parseFloat(specs[3].split(': ')[1]) || 0;

        // Проверка соответствия всем критериям фильтрации
        const matchesName = name.includes(nameFilter);
        const matchesPrice = price >= minPrice && price <= maxPrice;
        const matchesPower = power >= minPower && power <= maxPower;
        const matchesSpeed = speed >= minSpeed && speed <= maxSpeed;
        const matchesCutDepth = cutDepth >= minCutDepth && cutDepth <= maxCutDepth;
        const matchesWeight = weight >= minWeight && weight <= maxWeight;

        // Показать или скрыть карточку в зависимости от результата фильтрации
        card.style.display = matchesName && matchesPrice && matchesPower && matchesSpeed && matchesCutDepth && matchesWeight ? 'block' : 'none';
    });
}

// Добавление товара в заказ
function addToOrder(event) {
    event.stopPropagation();
    orderCount++;
    document.getElementById('order-count').textContent = orderCount;
}

// Инициализация элементов формы обратной связи
const contactForm = document.getElementById('contact-form');
const formModal = document.getElementById('form-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Обработка отправки формы обратной связи
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Получение элементов формы и сообщений об ошибках
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Очистка предыдущих ошибок
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    name.classList.remove('error');
    email.classList.remove('error');
    message.classList.remove('error');

    // Валидация имени
    if (name.value.trim().length < 2) {
        nameError.textContent = 'Имя должно содержать минимум 2. Добавляем только html + css символа';
        name.classList.add('error');
        isValid = false;
    }

    // Валидация email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Введите корректный email';
        email.classList.add('error');
        isValid = false;
    }

    // Валидация сообщения
    if (message.value.trim().length < 10) {
        messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
        message.classList.add('error');
        isValid = false;
    }

    // Если форма валидна, показываем модальное окно и сбрасываем форму
    if (isValid) {
        formModal.style.display = 'flex';
        contactForm.reset();
    }
});

// Открытие модального окна с детальной информацией о продукте
const productModal = document.getElementById('product-modal');
productCards.forEach(card => {
    card.addEventListener('click', () => {
        // Получение данных о продукте из карточки
        const title = card.querySelector('h3').textContent;
        const price = card.querySelector('p').textContent;
        const image = card.querySelector('img').src;
        const description = card.dataset.description;
        const specs = card.dataset.specs.split(', ');

        // Заполнение модального окна данными продукта
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-price').textContent = price;
        document.getElementById('modal-image').src = image;
        document.getElementById('modal-description').textContent = description;
        const specsList = document.getElementById('modal-specs');
        specsList.innerHTML = '';
        // Добавление характеристик в список
        specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
        productModal.style.display = 'flex';
    });
});

// Закрытие модальных окон по клику на кнопку закрытия
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        formModal.style.display = 'none';
        productModal.style.display = 'none';
    });
});

// Закрытие модальных окон по клику вне области модального окна
window.addEventListener('click', (e) => {
    if (e.target === formModal) formModal.style.display = 'none';
    if (e.target === productModal) productModal.style.display = 'none';
});