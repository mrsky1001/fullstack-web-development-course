<script>
    // Импорт функции жизненного цикла onMount из Svelte для инициализации
    import {onMount} from "svelte"
    // Импорт компонента ProductCard для отображения карточек товаров
    import ProductCard from "../../components/products/ProductCard.svelte"

    // Массив для хранения всех товаров, полученных с сервера
    let loadedProducts = []
    // Массив для хранения отфильтрованных товаров для отображения
    let products = [
        {
            "id": 1,
            "name": "Монитор HKS",
            "price": "2500",
            "category": "Мониторы",
            "quantity": null,
            "rowId": null,
            "img": "/products/1_monitor_hks.jpg",
            "isExistInShoppingCart": 0
        },
        {
            "id": 2,
            "name": "Монитор DELL",
            "price": "2001",
            "category": "Мониторы",
            "quantity": null,
            "rowId": null,
            "img": "/products/2_monitor_dell.jpg",
            "isExistInShoppingCart": 0
        },

    ]
    // Объект фильтра для управления ценой и категориями
    let filter = {
        price: {min: null, max: null}, // Минимальная и максимальная цена
        categories: [
            {name: 'Мониторы', isChecked: false}, // Категория "Мониторы" с флагом выбора
            {name: 'Клавиатуры', isChecked: false} // Категория "Клавиатуры" с флагом выбора
        ]
    }
    // Флаг для отображения/скрытия модального окна фильтра
    let isShowFilter = false

    // Функция для переключения видимости модального окна фильтра
    function toggleFilter() {
        // Получение элемента модального окна по ID
        const el = document.getElementById("filterModal")
        // Инвертирование состояния видимости
        isShowFilter = !isShowFilter

        // Показ или скрытие модального окна через добавление/удаление класса
        if (isShowFilter) {
            el.classList.remove("hidden")
        } else {
            el.classList.add("hidden")
        }
    }

    // Функция фильтрации товаров на основе текущих настроек фильтра
    function onFilter(rawProducts = loadedProducts) {
        // Вывод текущего состояния фильтра в консоль для отладки
        console.log(filter)
        // Фильтрация товаров
        products = rawProducts.filter((product) => {
            let isRespond = true // Флаг соответствия товара фильтру

            // Проверка минимальной цены, если указана
            if (filter.price.min) {
                isRespond &&= product.price >= filter.price.min
            }

            // Проверка максимальной цены, если указана
            if (filter.price.max) {
                isRespond &&= product.price <= filter.price.max
            }

            // Проверка выбранных категорий, если хотя бы одна выбрана
            if (filter.categories.find(c => c.isChecked)) {
                isRespond &&= !!filter.categories.find((c) => c.isChecked && c.name === product.category)
            }

            // Возвращаем true, если товар соответствует всем условиям
            return isRespond
        })
    }

    // Асинхронная функция для загрузки товаров с сервера
    async function loadProducts() {
        // Выполнение запроса к API для получения всех товаров
        const res = await fetch('http://localhost:3000/product/all', {
            credentials: "include", // Включение учетных данных (например, cookies) в запрос
        })

        // Получение данных товаров из ответа
        const rawProducts = (await res.json()).data
        // Сохранение всех товаров в loadedProducts
        loadedProducts = rawProducts

        // Применение фильтра к загруженным товарам
        onFilter(rawProducts)
    }

    // Вызов функции загрузки товаров при монтировании компонента
    onMount(() => {
        loadProducts()
    })
</script>

<!-- Секция с товарами и фильтрами -->
<section class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <!-- Заголовок и фильтры -->
        <div class="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
                <!-- Навигационная цепочка (хлебные крошки) -->
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <a href="/"
                               class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white">
                                <!-- Иконка дома -->
                                <svg class="me-2.5 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                                </svg>
                                Главная
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <!-- Стрелка разделителя -->
                                <svg class="h-5 w-5 text-gray-400 rtl:rotate-180" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m9 5 7 7-7 7"/>
                                </svg>
                                <a href="/products"
                                   class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2">Товары</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <!-- Заголовок страницы -->
                <h2 class="mt-3 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Список всех товаров</h2>
            </div>
            <div class="flex items-center space-x-4">
                <!-- Кнопка для открытия модального окна фильтра -->
                <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button"
                        onclick="{()=>toggleFilter()}"
                        class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                    <!-- Иконка фильтра -->
                    <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                              d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z"/>
                    </svg>
                    Фильтр
                    <!-- Стрелка для кнопки -->
                    <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
                <!-- Кнопка для открытия выпадающего меню сортировки -->
                <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button"
                        class="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                    <!-- Иконка сортировки -->
                    <svg class="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"/>
                    </svg>
                    Сортировка
                    <!-- Стрелка для кнопки -->
                    <svg class="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                         height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="m19 9-7 7-7-7"/>
                    </svg>
                </button>
                <!-- Выпадающее меню сортировки -->
                <div id="dropdownSort1"
                     class="z-50 hidden w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                     data-popper-placement="bottom">
                    <ul class="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        aria-labelledby="sortDropdownButton">
                        <li>
                            <a href="#"
                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                Самые популярные </a>
                        </li>
                        <li>
                            <a href="#"
                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                Новинки </a>
                        </li>
                        <li>
                            <a href="#"
                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                По возрастанию цены </a>
                        </li>
                        <li>
                            <a href="#"
                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                По убыванию цены </a>
                        </li>
                        <li>
                            <a href="#"
                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                Количество отзывов </a>
                        </li>
                        <li>
                            <a href="#"
                               class="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                                Скидка % </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Секция с карточками товаров -->
        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            <!-- Цикл для отображения карточек товаров -->
            {#each products as product }
                <!-- Компонент ProductCard для каждого товара с передачей данных и функции обратного вызова -->
                <ProductCard product={product} callback={loadProducts} />
            {/each}
        </div>
    </div>
    <!-- Модальное окно фильтра -->
    <form action="#" method="get" id="filterModal" tabindex="-1"
          class="fixed left-0 right-0 top-0 z-50 hidden h-modal w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full">
        <div class="relative h-full w-full max-w-xl md:h-auto">
            <!-- Контент модального окна -->
            <div class="relative rounded-lg bg-white shadow dark:bg-gray-800">
                <!-- Заголовок модального окна -->
                <div class="flex items-start justify-between rounded-t p-4 md:p-5">
                    <h3 class="text-lg font-normal text-gray-500 dark:text-gray-400">Фильтры</h3>
                    <!-- Кнопка закрытия модального окна -->
                    <button type="button"
                            onclick="{()=>toggleFilter()}"
                            class="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="filterModal">
                        <!-- Иконка крестика -->
                        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M6 18 17.94 6M18 18 6.06 6"/>
                        </svg>
                        <span class="sr-only">Закрыть модальное окно</span>
                    </button>
                </div>
                <!-- Тело модального окна -->
                <div class="px-4 md:px-5">
                    <div class="space-y-4" id="advanced-filters" role="tabpanel" aria-labelledby="advanced-filters-tab">
                        <!-- Секция фильтра по цене -->
                        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <div class="grid grid-cols-2 gap-3">
                                <h6 class="mb-2 text-sm font-medium text-black dark:text-white">Цена</h6>
                                <div class="col-span-2 flex items-center justify-between space-x-2">
                                    <!-- Поле ввода минимальной цены -->
                                    <input type="number" id="min-price-input" bind:value="{filter.price.min}" min="0"
                                           max="100000"
                                           onchange="{()=>onFilter()}"
                                           class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 "
                                           placeholder="" required/>
                                    <!-- Текст "to" между полями -->
                                    <div class="shrink-0 text-sm font-medium dark:text-gray-300">to</div>
                                    <!-- Поле ввода максимальной цены -->
                                    <input type="number" id="max-price-input" bind:value="{filter.price.max}" min="0"
                                           max="100000"
                                           onchange="{()=>onFilter()}"
                                           class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                           placeholder="" required/>
                                </div>
                            </div>
                        </div>
                        <!-- Секция фильтра по категориям -->
                        <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                            <div class="mb-10">
                                <h6 class="mb-2 text-sm font-medium text-black dark:text-white">Категория</h6>
                                <div class="space-y-2">
                                    <!-- Цикл для отображения чекбоксов категорий -->
                                    {#each filter.categories as category, idx}
                                        <div class="flex items-center">
                                            <!-- Чекбокс для категории -->
                                            <input id="category{idx}" type="checkbox"
                                                   bind:checked="{category.isChecked}"
                                                   onchange="{()=>onFilter()}"
                                                   class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"/>
                                            <!-- Название категории -->
                                            <label for="category{idx}"
                                                   class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {category.name} </label>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>

<style>
    /* Стили для компонента (пустой блок, так как стили не определены) */
</style>