<script>

    let {product} = $props()

</script>

{#if product.isExistInShoppingCart && product.quantity > 0}
    <div class="quantity-control">
        <button type="button" id="decrement-button"
                class="quantity-btn quantity-btn-left">
            -
        </button>
        <input type="text" id="quantity-input-1"
               class="quantity-input"
               placeholder="99" bind:value="{product.quantity}" required="">
        <button type="button" id="increment-button"
                class="quantity-btn quantity-btn-right">
            +
        </button>
    </div>
{:else}
    <button type="button"

            class="btn-add-to-cart">
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

        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .quantity-btn-left {
        border-radius: 0.5rem 0 0 0.5rem;

    }

    .quantity-btn-right {
        color: white;
        border-radius: 0 0.5rem 0.5rem 0;
    }

    .quantity-btn:hover {
        background-color: #4b5563;
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

</style>
