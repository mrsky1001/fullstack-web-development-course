<script>
    import {goto} from "$app/navigation"
    import MinusIcon from "../svg/MinusIcon.svelte"
    import PlusIcon from "../svg/PlusIcon.svelte"
    import CartIcon from "../svg/CartIcon.svelte"

    let {product, callback} = $props()

    async function addProductToShoppingCart(product) {
        const data = {
            productId: product.id,
            quantity: 1,
        }

        const res = await fetch('http://localhost:3000/shopping-cart/add', {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const status = (await res.json()).status

        if (status === 401) {
            goto('/auth/login')
        }

        await callback()
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

        await callback()
    }

    function decrement() {
        if (product.quantity === 0) {
            product.quantity
        } else {
            product.quantity--
        }

        changeProductToShoppingCart(product)
    }

    function increment() {
        if (product.quantity === 10) {
            product.quantity
        } else {
            product.quantity++
        }

        changeProductToShoppingCart(product)
    }
</script>

{#if product.isExistInShoppingCart && product.quantity > 0}
    <div class="quantity-control">
        <button onclick="{()=> decrement()}" type="button" id="decrement-button"
                class="quantity-btn quantity-btn-left">
            <MinusIcon className="quantity-icon"></MinusIcon>
        </button>
        <input type="text" id="quantity-input-1"
               class="quantity-input"
               placeholder="99" bind:value="{product.quantity}" required="">
        <button onclick="{()=> increment()}" type="button" id="increment-button"
                class="quantity-btn quantity-btn-right">
            <PlusIcon className="quantity-icon"></PlusIcon>
        </button>
    </div>
{:else}
    <button type="button"
            onclick={() => addProductToShoppingCart(product)}
            class="btn-add-to-cart">
        <CartIcon className="btn-icon"></CartIcon>
        В корзину
    </button>
{/if}

<style>
    .quantity-control {
        position: relative;
        display: flex;
        align-items: center;
    }

    .quantity-btn {
        height: 2.5rem;
        border: 1px solid #e5e7eb;
        padding: 0.75rem;
        background-color: #374151;
        border: none;
        cursor: pointer;
    }

    .quantity-btn-left {
        border-radius: 0.5rem 0 0 0.5rem;
    }

    .quantity-btn-right {
        border-radius: 0 0.5rem 0.5rem 0;
    }

    .quantity-btn:hover {
        background-color: #4b5563;
    }

    .quantity-icon {
        color: white;
        width: 0.75rem;
        height: 0.75rem;
    }

    .quantity-input {
        width: 3rem;
        text-align: center;
        height: 2.5rem;
        color: white;
        border: 1px solid #e5e7eb;
        background-color: #374151;
        border-left: none;
        border-right: none;
        padding: 0;
    }

    .quantity-input:focus {
        outline: none;
    }

    .btn-add-to-cart {
        display: inline-flex;
        align-items: center;
        border-radius: 0.5rem;
        background-color: #1d4ed8;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: white;
        border: none;
        cursor: pointer;
    }

    .btn-add-to-cart:hover {
        background-color: #1e40af;
    }

    .btn-add-to-cart:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
    }

    .btn-icon {
        margin-left: -0.5rem;
        margin-right: 0.5rem;
        width: 1.25rem;
        height: 1.25rem;
    }
</style>
