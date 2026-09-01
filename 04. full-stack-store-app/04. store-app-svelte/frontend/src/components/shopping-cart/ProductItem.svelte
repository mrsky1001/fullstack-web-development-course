<script>
    import {goto} from "$app/navigation"

    let {product, loadRows} = $props()

    async function removeProduct() {
        console.log(product)

        const res = await fetch('http://localhost:3000/shopping-cart/remove/' + product.rowId, {
            credentials: "include",
            method: 'DELETE'
        })

        if (res.status === 200) {
            loadRows()
        }

    }

    async function changeProductToShoppingCart(product) {
        const data = {
            id: product.rowId,
            userId: product.userId,
            productId: product.productId,
            quantity: product.quantity,
        }

        const res = await fetch('http://localhost:3000/shopping-cart/change', {
            credentials: "include",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const status = (await res.json()).status

        if (status === 401) {
            goto('/auth/login')
        }

        await loadRows()
    }

    function decrement() {
        // const inputEl = document.getElementById('')

        if (product.quantity === 0) {
            product.quantity
        } else {
            product.quantity--
        }

        changeProductToShoppingCart(product)
    }

    function increment() {
        // const inputEl = document.getElementById('')

        if (product.quantity === 10) {
            product.quantity
        } else {
            product.quantity++
        }

        changeProductToShoppingCart(product)
    }
</script>
<div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
    <div class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" class="shrink-0 md:order-1">
            <img class="h-20 w-20 dark:hidden"
                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                 alt="imac image"/>
            <img class="hidden h-20 w-20 dark:block"
                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                 alt="imac image"/>
        </a>

        <label for="counter-input" class="sr-only">Choose quantity:</label>
        <div class="flex items-center justify-between md:order-3 md:justify-end">
            <div class="flex items-center">
                <button type="button" id="decrement-button"
                        onclick="{decrement}"
                        data-input-counter-decrement="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" id="counter-input" data-input-counter
                       class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                       placeholder="" value="{product.quantity}" required/>
                <button type="button" id="increment-button"
                        onclick="{increment}"
                        data-input-counter-increment="counter-input"
                        class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg class="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
            </div>
            <div class="text-end md:order-4 md:w-32">
                <p class="text-base font-bold text-gray-900 dark:text-white">${product.productPrice}</p>
            </div>
        </div>

        <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <a href="#"
               class="text-base font-medium text-gray-900 hover:underline dark:text-white">{product.productName}</a>

            <div class="flex items-center gap-4">
                <button type="button"
                        class="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white">
                    <svg class="me-1.5 h-5 w-5" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                         viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"
                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                    </svg>
                    Add to Favorites
                </button>

                <button type="button"
                        onclick="{removeProduct}"
                        class="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
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