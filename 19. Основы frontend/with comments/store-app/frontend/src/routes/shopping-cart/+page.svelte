<script>
    // Импорт функции onMount для выполнения кода при загрузке компонента
    import {onMount} from "svelte"
    // Импорт компонента ProductItem для отображения товаров в корзине
    import ProductItem from "../../components/shopping-cart/ProductItem.svelte"

    // Массив для хранения товаров в корзине
    let products = [
        {
            "rowId": 2,
            "userId": 12,
            "productId": 1,
            "quantity": 6,
            "productName": "Монитор HKS",
            "productCategory": "Мониторы",
            "productPrice": "2500",
            "productImg": "/products/1_monitor_hks.jpg"
        },
        {
            "rowId": 11,
            "userId": 12,
            "productId": 2,
            "quantity": 1,
            "productName": "Монитор DELL",
            "productCategory": "Мониторы",
            "productPrice": "2001",
            "productImg": "/products/2_monitor_dell.jpg"
        }
    ]

    // Асинхронная функция для загрузки товаров корзины с сервера
    async function loadRows() {
        // Запрос к API для получения всех товаров в корзине
        const res = await fetch('http://localhost:3000/shopping-cart/all', {
            credentials: "include", // Включение учетных данных (например, cookies)
        })
        // Сохранение полученных данных в массив products
        products = (await res.json()).data
    }

    // Вызов функции загрузки товаров при монтировании компонента
    onMount(async () => {
        await loadRows()
    })
</script>

<!-- Секция страницы корзины -->
<section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <!-- Заголовок страницы -->
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Корзина</h2>

        <!-- Контейнер для товаров и итогов заказа -->
        <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <!-- Секция с товарами корзины -->
            <div class="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div class="space-y-6">
                    <!-- Цикл для отображения каждого товара в корзине -->
                    {#each products as product}
                        <!-- Компонент ProductItem для отображения товара -->
                        <ProductItem {product} {loadRows}></ProductItem>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>