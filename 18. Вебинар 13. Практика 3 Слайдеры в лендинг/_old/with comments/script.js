/**
 * ============================================
 * ОСНОВНЫЕ ПЕРЕМЕННЫЕ И ИНИЦИАЛИЗАЦИЯ
 * ============================================
 * 
 * В JavaScript для работы с DOM (Document Object Model) используются методы:
 * - querySelector() - находит первый элемент по CSS-селектору
 * - querySelectorAll() - находит все элементы по CSS-селектору (возвращает NodeList)
 * 
 *  DOM - это представление HTML-документа в виде дерева объектов.
 * Каждый элемент страницы становится объектом, с которым можно взаимодействовать через JavaScript.
 */

// Получаем все карточки товаров для фильтрации и модальных окон
const productCards = document.querySelectorAll('.product-card');

// Элементы слайдера отзывов
const reviewSlider = document.querySelector('.review-slider'); // Контейнер слайдера
const reviewSlides = document.querySelectorAll('.review-card'); // Все слайды (отзывы)
const prevReviewButton = document.querySelector('.review-arrow.left'); // Кнопка "Назад"
const nextReviewButton = document.querySelector('.review-arrow.right'); // Кнопка "Вперед"
const reviewDotsContainer = document.querySelector('.review-dots'); // Контейнер для точек навигации

// Переменные состояния приложения
let orderCount = 0; // Счетчик товаров в корзине
let currentReviewIndex = 0; // Индекс текущего слайда в слайдере отзывов

/**
 * ============================================
 * СОЗДАНИЕ НАВИГАЦИОННЫХ ТОЧЕК ДЛЯ СЛАЙДЕРА
 * ============================================
 * 
 *  Динамическое создание элементов DOM
 * - createElement() - создает новый HTML-элемент
 * - classList - объект для работы с CSS-классами элемента
 * - appendChild() - добавляет элемент в конец родительского элемента
 * - addEventListener() - регистрирует обработчик события
 * 
 * forEach() - метод массивов для перебора элементов
 * Первый параметр - элемент, второй - его индекс
 */

// Создаем точки навигации для каждого слайда
// forEach перебирает все слайды и создает для каждого точку
reviewSlides.forEach((_, index) => {
    // Создаем новый элемент <span> для точки
    const dot = document.createElement('span');
    
    // Добавляем CSS-класс для стилизации
    dot.classList.add('review-dot');
    
    // Первая точка активна по умолчанию (визуально выделена)
    if (index === 0) dot.classList.add('active');
    
    // Добавляем обработчик клика - при клике переходим к соответствующему слайду
    // Используем стрелочную функцию для сохранения контекста index
    dot.addEventListener('click', () => goToReviewSlide(index));
    
    // Добавляем точку в контейнер навигации
    reviewDotsContainer.appendChild(dot);
});

// Получаем все созданные точки для дальнейшей работы
const reviewDots = document.querySelectorAll('.review-dot');

/**
 * ============================================
 * ОБНОВЛЕНИЕ ПОЗИЦИИ СЛАЙДЕРА
 * ============================================
 * 
 *  CSS Transform и анимации
 * - transform: translateX() - перемещает элемент по горизонтали
 * - offsetWidth - ширина элемента в пикселях (включая padding и border)
 * - style.transform - установка CSS-свойства через JavaScript
 * 
 * Принцип работы слайдера:
 * Все слайды расположены в ряд. При смене слайда контейнер сдвигается влево
 * на ширину одного слайда, создавая эффект прокрутки.
 */

function updateReviewSlider() {
    // Вычисляем ширину одного слайда (включая отступ между слайдами - 20px)
    // offsetWidth возвращает полную ширину элемента
    const slideWidth = reviewSlides[0].offsetWidth + 20;
    
    // Сдвигаем контейнер слайдера влево на нужное расстояние
    // Используем шаблонную строку (template literal) для вставки значения
    // Отрицательное значение сдвигает влево
    reviewSlider.style.transform = `translateX(-${currentReviewIndex * slideWidth}px)`;
    
    // Обновляем активную точку навигации
    // classList.toggle() добавляет класс, если второй параметр true, иначе удаляет
    reviewDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentReviewIndex);
    });
}

/**
 * ============================================
 * ПЕРЕХОД К КОНКРЕТНОМУ СЛАЙДУ
 * ============================================
 * 
 *  Циклическая навигация (carousel)
 * При достижении границ массива переходим на противоположный конец.
 * Это создает эффект "бесконечного" слайдера.
 */

function goToReviewSlide(index) {
    // Устанавливаем новый индекс текущего слайда
    currentReviewIndex = index;
    
    // Проверка границ: если индекс меньше 0, переходим к последнему слайду
    if (currentReviewIndex < 0) currentReviewIndex = reviewSlides.length - 1;
    
    // Если индекс больше или равен количеству слайдов, переходим к первому
    if (currentReviewIndex >= reviewSlides.length) currentReviewIndex = 0;
    
    // Обновляем визуальное отображение слайдера
    updateReviewSlider();
}

/**
 * ============================================
 * ОБРАБОТЧИКИ СОБЫТИЙ ДЛЯ КНОПОК НАВИГАЦИИ
 * ============================================
 * 
 *  События (Events) в JavaScript
 * - addEventListener() - добавляет обработчик события
 * - 'click' - событие клика мыши
 * - 'resize' - событие изменения размера окна
 * 
 * Стрелочные функции (arrow functions):
 * () => {} - компактный синтаксис для функций
 * Автоматически сохраняют контекст (this) из внешней области видимости
 */

// Обработчик клика на кнопку "Назад" (предыдущий слайд)
prevReviewButton.addEventListener('click', () => {
    // Уменьшаем индекс на 1
    currentReviewIndex--;
    
    // Если вышли за левую границу, переходим к последнему слайду
    if (currentReviewIndex < 0) currentReviewIndex = reviewSlides.length - 1;
    
    // Обновляем отображение
    updateReviewSlider();
});

// Обработчик клика на кнопку "Вперед" (следующий слайд)
nextReviewButton.addEventListener('click', () => {
    // Увеличиваем индекс на 1
    currentReviewIndex++;
    
    // Если вышли за правую границу, переходим к первому слайду
    if (currentReviewIndex >= reviewSlides.length) currentReviewIndex = 0;
    
    // Обновляем отображение
    updateReviewSlider();
});

// Обработчик изменения размера окна браузера
// При изменении размера нужно пересчитать позицию слайдера,
// так как ширина слайдов может измениться
window.addEventListener('resize', updateReviewSlider);

// Инициализация: устанавливаем начальную позицию слайдера при загрузке страницы
updateReviewSlider();

/**
 * ============================================
 * ФУНКЦИЯ ФИЛЬТРАЦИИ ТОВАРОВ
 * ============================================
 * 
 *  Фильтрация данных на клиенте
 * - getElementById() - получение элемента по ID
 * - value - свойство для получения значения из input
 * - parseFloat() - преобразование строки в число с плавающей точкой
 * - toLowerCase() - приведение строки к нижнему регистру (для поиска без учета регистра)
 * - dataset - объект для доступа к lib-атрибутам HTML-элемента
 * - includes() - проверка наличия подстроки в строке
 * - split() - разбиение строки на массив по разделителю
 * 
 * Логические операторы:
 * && (И) - возвращает true, если оба условия true
 * || (ИЛИ) - возвращает первое истинное значение или последнее ложное
 * 
 * Оператор || используется для значений по умолчанию:
 * parseFloat(value) || 0 - если parseFloat вернет NaN, используется 0
 */

function filterProducts() {
    // Получаем значения из полей фильтрации
    // toLowerCase() делает поиск нечувствительным к регистру
    const nameFilter = document.getElementById('name-filter').value.toLowerCase();
    
    // Для числовых полей используем parseFloat() для преобразования строки в число
    // Если поле пустое, parseFloat вернет NaN, поэтому используем || для значения по умолчанию
    // Infinity используется как максимальное значение, если верхний предел не указан
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

    // Перебираем все карточки товаров
    productCards.forEach(card => {
        // Получаем данные из lib-атрибутов карточки
        // dataset - объект, содержащий все lib-* атрибуты элемента
        const price = parseFloat(card.dataset.price);
        const name = card.dataset.name.toLowerCase();
        
        // Парсим характеристики товара из строки
        // split(', ') разбивает строку на массив по запятой и пробелу
        // Затем извлекаем числовые значения из каждой характеристики
        const specs = card.dataset.specs.split(', ');
        const power = parseFloat(specs[0].split(': ')[1]) || 0;      // Мощность
        const speed = parseFloat(specs[1].split(': ')[1]) || 0;     // Скорость
        const cutDepth = parseFloat(specs[2].split(': ')[1]) || 0;   // Глубина реза
        const weight = parseFloat(specs[3].split(': ')[1]) || 0;    // Вес

        // Проверяем соответствие товара каждому критерию фильтрации
        const matchesName = name.includes(nameFilter); // Поиск подстроки в названии
        const matchesPrice = price >= minPrice && price <= maxPrice; // Диапазон цены
        const matchesPower = power >= minPower && power <= maxPower; // Диапазон мощности
        const matchesSpeed = speed >= minSpeed && speed <= maxSpeed; // Диапазон скорости
        const matchesCutDepth = cutDepth >= minCutDepth && cutDepth <= maxCutDepth; // Диапазон глубины реза
        const matchesWeight = weight >= minWeight && weight <= maxWeight; // Диапазон веса

        // Показываем карточку только если она соответствует ВСЕМ критериям
        // Используем тернарный оператор: условие ? значение_если_true : значение_если_false
        // display: 'block' - элемент виден, 'none' - элемент скрыт
        card.style.display = matchesName && matchesPrice && matchesPower && matchesSpeed && matchesCutDepth && matchesWeight ? 'block' : 'none';
    });
}

/**
 * ============================================
 * ФУНКЦИЯ ДОБАВЛЕНИЯ ТОВАРА В КОРЗИНУ
 * ============================================
 * 
 *  Обработка событий и всплытие (event bubbling)
 * - event.stopPropagation() - останавливает всплытие события к родительским элементам
 * - textContent - свойство для установки текстового содержимого элемента
 * 
 * Всплытие событий:
 * Когда происходит событие на элементе, оно "всплывает" вверх по DOM-дереву.
 * Если не остановить всплытие, событие может сработать на родительских элементах.
 * В нашем случае кнопка находится внутри карточки товара, которая открывает модальное окно.
 * Без stopPropagation() клик по кнопке также откроет модальное окно.
 */

function addToOrder(event) {
    // Останавливаем всплытие события, чтобы клик по кнопке не открывал модальное окно товара
    event.stopPropagation();
    
    // Увеличиваем счетчик товаров в корзине
    orderCount++;
    
    // Обновляем отображение счетчика в интерфейсе
    // textContent безопаснее innerHTML, так как не интерпретирует HTML-теги
    document.getElementById('order-count').textContent = orderCount;
}

/**
 * ============================================
 * ВАЛИДАЦИЯ ФОРМЫ ОБРАТНОЙ СВЯЗИ
 * ============================================
 * 
 *  Валидация форм на клиенте
 * - preventDefault() - отменяет стандартное поведение события (отправку формы)
 * - trim() - удаляет пробелы в начале и конце строки
 * - Регулярные выражения (RegExp) - паттерны для проверки формата строк
 * - classList.add() / remove() - добавление/удаление CSS-классов
 * - reset() - сброс формы к начальным значениям
 * 
 * Регулярное выражение для email:
 * /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 * ^ - начало строки
 * [^\s@]+ - один или более символов, не являющихся пробелом или @
 * @ - символ @
 * [^\s@]+ - один или более символов, не являющихся пробелом или @
 * \. - точка (экранированная)
 * [^\s@]+ - один или более символов, не являющихся пробелом или @
 * $ - конец строки
 */

// Получаем элементы формы и модального окна
const contactForm = document.getElementById('contact-form');
const formModal = document.getElementById('form-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');

// Обработчик отправки формы
contactForm.addEventListener('submit', (e) => {
    // Отменяем стандартную отправку формы (перезагрузку страницы)
    e.preventDefault();
    
    // Флаг валидности формы
    let isValid = true;

    // Получаем элементы полей формы и контейнеров для ошибок
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Очищаем предыдущие ошибки и стили
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    name.classList.remove('error');
    email.classList.remove('error');
    message.classList.remove('error');

    // Валидация имени: минимум 2. Добавляем только html + css символа
    // trim() удаляет пробелы в начале и конце
    if (name.value.trim().length < 2) {
        nameError.textContent = 'Имя должно содержать минимум 2. Добавляем только html + css символа';
        name.classList.add('error'); // Добавляем класс для визуального выделения ошибки
        isValid = false;
    }

    // Валидация email: проверка формата с помощью регулярного выражения
    // test() возвращает true, если строка соответствует паттерну
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = 'Введите корректный email';
        email.classList.add('error');
        isValid = false;
    }

    // Валидация сообщения: минимум 10 символов
    if (message.value.trim().length < 10) {
        messageError.textContent = 'Сообщение должно содержать минимум 10 символов';
        message.classList.add('error');
        isValid = false;
    }

    // Если все поля валидны, показываем модальное окно успешной отправки
    if (isValid) {
        formModal.style.display = 'flex'; // Показываем модальное окно
        contactForm.reset(); // Очищаем форму
    }
});

/**
 * ============================================
 * МОДАЛЬНОЕ ОКНО ДЛЯ ПРОСМОТРА ТОВАРА
 * ============================================
 * 
 *  Модальные окна (Modal Windows)
 * Модальное окно - это элемент интерфейса, который блокирует взаимодействие
 * с остальной частью страницы до тех пор, пока пользователь не закроет его.
 * 
 * querySelector() - поиск элемента внутри другого элемента
 * src - свойство для получения/установки источника изображения
 * innerHTML - свойство для установки HTML-содержимого элемента
 * (используется осторожно, так как может быть уязвимостью XSS)
 */

// Получаем элемент модального окна товара
const productModal = document.getElementById('product-modal');

// Добавляем обработчик клика на каждую карточку товара
productCards.forEach(card => {
    card.addEventListener('click', () => {
        // Извлекаем данные из карточки товара
        // querySelector() ищет элемент внутри карточки
        const title = card.querySelector('h3').textContent; // Название товара
        const price = card.querySelector('p').textContent; // Цена (первый параграф)
        const image = card.querySelector('img').src; // URL изображения
        const description = card.dataset.description; // Описание из lib-атрибута
        const specs = card.dataset.specs.split(', '); // Характеристики (массив)

        // Заполняем модальное окно данными товара
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-price').textContent = price;
        document.getElementById('modal-image').src = image;
        document.getElementById('modal-description').textContent = description;
        
        // Динамически создаем список характеристик
        const specsList = document.getElementById('modal-specs');
        specsList.innerHTML = ''; // Очищаем предыдущий список
        
        // Создаем элемент <li> для каждой характеристики
        specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li); // Добавляем в список
        });
        
        // Показываем модальное окно
        // display: 'flex' делает элемент видимым и использует flexbox для центрирования
        productModal.style.display = 'flex';
    });
});

/**
 * ============================================
 * ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
 * ============================================
 * 
 *  Закрытие модальных окон
 * Существует два способа закрытия:
 * 1. Клик по кнопке закрытия (крестик)
 * 2. Добавляем только html + css. Клик по затемненной области вокруг модального окна
 * 
 * event.target - элемент, на котором произошло событие
 * === - строгое сравнение (проверяет тип и значение)
 */

// Закрытие модальных окон по клику на кнопку закрытия
// Один обработчик закрывает оба модальных окна (на случай, если открыто несколько)
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        formModal.style.display = 'none'; // Скрываем модальное окно формы
        productModal.style.display = 'none'; // Скрываем модальное окно товара
    });
});

// Закрытие модальных окон по клику вне их области
// Если клик произошел непосредственно на затемненном фоне (не на содержимом),
// закрываем соответствующее модальное окно
window.addEventListener('click', (e) => {
    // e.target - элемент, на который кликнули
    // Если кликнули на сам модальный контейнер (фон), а не на его содержимое
    if (e.target === formModal) formModal.style.display = 'none';
    if (e.target === productModal) productModal.style.display = 'none';
});