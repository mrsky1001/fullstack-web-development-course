<script>
    import {goto} from "$app/navigation"
    import HeartIcon from "../svg/HeartIcon.svelte"
    import CloseIcon from "../svg/CloseIcon.svelte"
    import MinusIcon from "../svg/MinusIcon.svelte"
    import PlusIcon from "../svg/PlusIcon.svelte"

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

<div class="cart-item">
    <div class="cart-item-content">
        <a href="#" class="cart-item-image">
            <img class="item-img"
                 src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                 alt="imac image"/>
        </a>

        <div class="cart-item-info">
            <a href="#" class="item-name">{product.productName}</a>

            <div class="item-actions">
                <button type="button" class="action-link">
                    <HeartIcon className="action-icon"></HeartIcon>
                    Add to Favorites
                </button>

                <button type="button" onclick="{removeProduct}" class="action-link action-link-danger">
                    <CloseIcon className="action-icon"></CloseIcon>
                    Удалить
                </button>
            </div>
        </div>

        <div class="cart-item-controls">
            <div class="quantity-control">
                <button type="button" id="decrement-button"
                        onclick="{decrement}"
                        class="quantity-btn quantity-btn-left">
                    <MinusIcon className="quantity-icon"></MinusIcon>
                </button>
                <input type="text" id="counter-input"
                       class="quantity-input"
                       placeholder="" value="{product.quantity}" required/>
                <button type="button" id="increment-button"
                        onclick="{increment}"
                        class="quantity-btn quantity-btn-right">
                    <PlusIcon className="quantity-icon"></PlusIcon>
                </button>
            </div>
            <div class="item-price">
                <p class="price-text">${product.productPrice}</p>
            </div>
        </div>
    </div>
</div>

<style>
    .cart-item {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .cart-item-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .cart-item-image {
        flex-shrink: 0;
    }

    .item-img {
        height: 5rem;
        width: 5rem;
    }

    .cart-item-info {
        width: 100%;
        min-width: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .item-name {
        font-size: 1rem;
        font-weight: 500;
        color: #111827;
        text-decoration: none;
    }

    .item-name:hover {
        text-decoration: underline;
    }

    .item-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .action-link {
        display: inline-flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
        background: none;
        border: none;
        cursor: pointer;
        text-decoration: none;
    }

    .action-link:hover {
        color: #111827;
        text-decoration: underline;
    }

    .action-link-danger {
        color: #dc2626;
    }

    .action-link-danger:hover {
        color: #991b1b;
    }

    .action-icon {
        margin-right: 0.375rem;
        width: 1.25rem;
        height: 1.25rem;
    }

    .cart-item-controls {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .quantity-control {
        display: flex;
        align-items: center;
    }

    .quantity-btn {
        display: inline-flex;
        height: 1.25rem;
        width: 1.25rem;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        border: 1px solid #d1d5db;
        background-color: #f3f4f6;
        border-radius: 0.375rem;
        cursor: pointer;
    }

    .quantity-btn:hover {
        background-color: #e5e7eb;
    }

    .quantity-btn:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(243, 244, 246, 1);
    }

    .quantity-btn-left {
        border-radius: 0.375rem 0 0 0.375rem;
    }

    .quantity-btn-right {
        border-radius: 0 0.375rem 0.375rem 0;
    }

    .quantity-icon {
        width: 0.625rem;
        height: 0.625rem;
        color: #111827;
    }

    .quantity-input {
        width: 2.5rem;
        flex-shrink: 0;
        border: 0;
        background: transparent;
        text-align: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
        padding: 0;
    }

    .quantity-input:focus {
        outline: none;
    }

    .item-price {
        text-align: right;
    }

    .price-text {
        font-size: 1rem;
        font-weight: 700;
        color: #111827;
    }

    @media (min-width: 768px) {
        .cart-item-content {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .cart-item-controls {
            flex-direction: row;
            gap: 1.5rem;
        }

        .item-price {
            width: 8rem;
        }
    }
</style>
