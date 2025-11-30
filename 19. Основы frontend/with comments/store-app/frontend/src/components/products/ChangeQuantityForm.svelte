<script>
    // Импорт функции goto для навигации по страницам
    import {goto} from "$app/navigation"

    // Получение пропсов: объект товара (product) и функция обратного вызова (callback)
    let {product, callback} = $props()

    // Функция добавления товара в корзину
    async function addProductToShoppingCart(product) {
        // Формирование данных для запроса: ID товара и количество (по умолчанию 1)
        const data = {
            productId: product.id,
            quantity: 1,
        }

        // Отправка POST-запроса на сервер для добавления товара в корзину
        const res = await fetch('http://localhost:3000/shopping-cart/add', {
            credentials: "include", // Включение учетных данных (например, cookies)
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        // Получение статуса ответа
        const status = (await res.json()).status

        // Если пользователь не авторизован (статус 401), перенаправление на страницу логина
        if (status === 401) {
            goto('/auth/login')
        }

        // Вызов функции обратного вызова для обновления данных
        await callback()
    }

    // Функция изменения количества товара в корзине
    async function changeProductToShoppingCart(product) {
        // Формирование данных для запроса: ID записи, ID пользователя, ID товара и количество
        const data = {
            id: product.rowId,
            userId: product.userId,
            productId: product.productId,
            quantity: product.quantity,
        }

        // Отправка PUT-запроса на сервер для обновления количества товара
        const res = await fetch('http://localhost:3000/shopping-cart/change', {
            credentials: "include", // Включение учетных данных
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        // Получение статуса ответа
        const status = (await res.json()).status

        // Если пользователь не авторизован (статус 401), перенаправление на страницу логина
        if (status === 401) {
            goto('/auth/login')
        }

        // Вызов функции обратного вызова для обновления данных
        await callback()
    }

    // Функция уменьшения количества товара
    function decrement() {
        // Если количество равно 0, ничего не делаем, иначе уменьшаем на 1
        if (product.quantity === 0) {
            product.quantity
        } else {
            product.quantity--
        }

        // Обновление количества товара в корзине
        changeProductToShoppingCart(product)
    }

    // Функция увеличения количества товара
    function increment() {
        // Если количество достигло 10, ничего не делаем, иначе увеличиваем на 1
        if (product.quantity === 10) {
            product.quantity
        } else {
            product.quantity++
        }

        // Обновление количества товара в корзине
        changeProductToShoppingCart(product)
    }
</script>

<!-- Условный рендеринг: если товар в корзине и его количество больше 0 -->
{#if product.isExistInShoppingCart && product.quantity > 0}
    <!-- Блок с кнопками для изменения количества товара -->
    <div class="relative flex items-center">
        <!-- Кнопка уменьшения количества -->
        <button onclick="{()=> decrement()}" type="button" id="decrement-button"
                data-input-counter-decrement="quantity-input-1"
                class="h-[2.5rem] rounded-s-lg border-1 border-gray-200 p-[.75rem] dark:border-gray-600 bg-gray-700">
            <!-- Иконка минуса -->
            <svg class="text-white h-[.75rem] w-[.75rem]"
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16"></path>
            </svg>
        </button>
        <!-- Поле ввода количества товара -->
        <input type="text" id="quantity-input-1" data-input-counter="" data-input-counter-min="1"
               data-input-counter-max="50" aria-describedby="helper-text-explanation"
               class="w-12 text-center h-[2.5rem] text-white border-gray-200 dark:border-gray-600 bg-gray-700 dark:focus:border-primary-500 dark:focus:ring-primary-500"
               placeholder="99" bind:value="{product.quantity}" required="">
        <!-- Кнопка увеличения количества -->
        <button onclick="{()=> increment()}" type="button" id="increment-button"
                data-input-counter-increment="quantity-input-1"
                class="h-[2.5rem] rounded-e-lg border-1 border-gray-200 p-[.75rem] dark:border-gray-600 bg-gray-700">
            <!-- Иконка плюса -->
            <svg class="text-white h-[.75rem] w-[.75rem]"
                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16"></path>
            </svg>
        </button>
    </div>
{:else}
    <!-- Кнопка добавления товара в корзину -->
    <button type="button"
            onclick={() => addProductToShoppingCart(product)}
            class="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        <!-- Иконка корзины -->
        <svg class="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"/>
        </svg>
        В корзину
    </button>
{/if}