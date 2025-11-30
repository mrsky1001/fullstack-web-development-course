<script>
    // Импорт функции goto для навигации в SvelteKit
    import {goto} from "$app/navigation"

    // Получение пропсов: объект товара и функция для перезагрузки данных
    let {product, loadRows} = $props()

    // Асинхронная функция для удаления товара из корзины
    async function removeProduct() {
        // Вывод данных о товаре в консоль для отладки
        console.log(product)
        // Запрос на удаление товара из корзины по rowId
        const res = await fetch('http://localhost:3000/shopping-cart/remove/' + product.rowId, {
            credentials: "include", // Включение учетных данных (например, cookies)
            method: 'DELETE'
        })
        // Если запрос успешен, обновляем список товаров
        if (res.status === 200) {
            loadRows()
        }
    }

    // Асинхронная функция для изменения количества товара в корзине
    async function changeProductToShoppingCart(product) {
        // Формирование данных для запроса
        const data = {
            id: product.rowId,
            userId: product.userId,
            productId: product.productId,
            quantity: product.quantity,
        }
        // Запрос на обновление данных о товаре в корзине
        const res = await fetch('http://localhost:3000/shopping-cart/change', {
            credentials: "include",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        // Проверка статуса ответа
        const status = (await res.json()).status
        // Если пользователь не авторизован, перенаправляем на страницу логина
        if (status === 401) {
            goto('/auth/login')
        }
        // Обновляем список товаров
        await loadRows()
    }

    // Функция для уменьшения количества товара
    function decrement() {
        // Если больше 0, уменьшаем
        if (product.quantity > 0) {
            product.quantity--
        }
        // Обновляем данные на сервере
        changeProductToShoppingCart(product)
    }

    // Функция для увеличения количества товара
    function increment() {
        // Если меньше 10,увеличиваем
        if (product.quantity < 10) {
            product.quantity++
        }
        // Обновляем данные на сервере
        changeProductToShoppingCart(product)
    }
</script>

<!-- Контейнер для карточки товара в корзине -->
<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <!-- Изображение товара -->
        <a href="#" class="shrink-0 md:order-1">
            <!-- Изображение для светлой темы -->
            <img class="h-20 w-20 dark:hidden"
                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                 alt="imac image"/>
            <!-- Изображение для тёмной темы -->
            <img class="hidden h-20 w-20 dark:block"
                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                 alt="imac image"/>
        </a>

        <!-- Метка для поля ввода количества -->
        <label for="counter-input" class="sr-only">Choose quantity:</label>
        <!-- Блок с управлением количеством и ценой -->
        <div class="flex items-center justify-between md:order-3 md:justify-end">
            <!-- Управление количеством товара -->
            <div class="flex items-center">
                <!-- Кнопка уменьшения количества -->
                <button type="button" id="decrement-button"
                        onclick="{decrement}"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <!-- Иконка минуса -->
                    <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M1 1h16"/>
                    </svg>
                </button>
                <!-- Поле ввода количества -->
                <input type="text" id="counter-input" data-input-counter
                       class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                       placeholder="" value="{product.quantity}" required/>
                <!-- Кнопка увеличения количества -->
                <button type="button" id="increment-button"
                        onclick="{increment}"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <!-- Иконка плюса -->
                    <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
            <!-- Цена товара -->
            <div class="text-end md:order-4 md:w-32">
                <p class="text-base font-bold text-gray-900 dark:text-white">${product.productPrice}</p>
            </div>
        </div>

        <!-- Информация о товаре -->
        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <!-- Название товара -->
            <a href="#" class="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.productName}</a>

            <!-- Кнопки действий -->
            <div class="flex items-center gap-4">
                <!-- Кнопка добавления в избранное -->
                <button type="button"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <!-- Иконка сердца -->
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                         viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                    </svg>
                    Add to Favorites
                </button>
                <!-- Кнопка удаления товара из корзины -->
                <button type="button"
                        onclick="{removeProduct}"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <!-- Иконка крестика -->
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                         viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                    </svg>
                    Удалить
                </button>
            </div>
        </div>
    </div>
</div>