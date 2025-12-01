<script>
    // Импорт компонента для изменения количества товара
    import ChangeQuantityForm from "../../../components/products/ChangeQuantityForm.svelte"

    // Получение пропса lib с информацией о товаре
    let {data} = $props()

    // Реактивное состояние для хранения данных о товаре
    // let product = $state(lib.product)
    let product =  {
        "id": 1,
        "name": "Монитор HKS",
        "price": "2500",
        "category": "Мониторы",
        "quantity": null,
        "rowId": null,
        "img": "/products/1_monitor_hks.jpg",
        "isExistInShoppingCart": 0
    }

    // Асинхронная функция для загрузки данных о товаре с сервера
    async function loadProduct() {
        // Запрос к API для получения данных о товаре по его ID
        const res = await fetch(`http://localhost:3000/product/${product.id}`, {
            credentials: "include", // Включение учетных данных (например, cookies)
            method: 'GET',
        })

        // Обновление данных о товаре из ответа сервера
        product = (await res.json()).data
    }
</script>

<!-- Секция страницы товара -->
<section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <!-- Сетка с двумя колонками для изображения и информации -->
        <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <!-- Изображение товара -->
            <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
                <img class="w-full hidden dark:block"
                     src="{product.img}" alt=""/>
            </div>

            <!-- Информация о товаре -->
            <div class="mt-6 sm:mt-8 lg:mt-0">
                <!-- Название товара -->
                <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {product.name}
                </h1>
                <!-- Блок с ценой и рейтингом -->
                <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <!-- Цена товара -->
                    <p class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                        ${product.price}
                    </p>

                    <!-- Рейтинг и отзывы -->
                    <div class="flex items-center gap-2 mt-2 sm:mt-0">
                        <!-- Иконки звёзд для рейтинга (5 звёзд) -->
                        <div class="flex items-center gap-1">
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                            </svg>
                            <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                            </svg>
                        </div>
                        <!-- Средний рейтинг -->
                        <p class="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                            (5.0)
                        </p>
                        <!-- Ссылка на отзывы -->
                        <a href="#" class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                            345 Reviews
                        </a>
                    </div>
                </div>

                <!-- Кнопки и форма количества -->
                <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <!-- Кнопка добавления в избранное -->
                    <a href="#" title=""
                       class="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                       role="button">
                        <!-- Иконка сердца -->
                        <svg class="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                        </svg>
                        Add to favorites
                    </a>

                    <!-- Компонент для изменения количества товара -->
                    <ChangeQuantityForm bind:product callback="{() => loadProduct()}"></ChangeQuantityForm>
                </div>

                <!-- Разделитель -->
                <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800"/>

                <!-- Описание товара -->
                <p class="mb-6 text-gray-500 dark:text-gray-400">
                    Studio quality three mic array for crystal clear calls and voice recordings. Six-speaker sound system
                    for a remarkably robust and high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                </p>

                <p class="text-gray-500 dark:text-gray-400">
                    Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast Wi-Fi 6 and Bluetooth 5.0 wireless.
                    Color matched Magic Mouse with Magic Keyboard or Magic Keyboard with Touch ID.
                </p>
            </div>
        </div>
    </div>
</section>