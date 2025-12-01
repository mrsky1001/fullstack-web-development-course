<script>
    import {onMount} from "svelte"
    import ProductItem from "../../components/shopping-cart/ProductItem.svelte"
    import ArrowBackIcon from "../../components/svg/ArrowBackIcon.svelte"
    import cartData from "$lib/test-cart.json"

    let products = []

    function loadRows() {
        products = cartData
    }

    onMount(() => {
        loadRows()
    })
</script>

<section class="cart-section">
    <div class="cart-container">
        <h2 class="cart-title">Корзина</h2>

        <div class="cart-layout">
            <div class="cart-items">
                <div class="items-list">
                    {#each products as product}
                        <ProductItem {product} {loadRows}></ProductItem>
                    {/each}
                </div>
            </div>

            <div class="cart-summary">
                <div class="summary-card">
                    <p class="summary-title">Order summary</p>

                    <div class="summary-details">
                        <div class="summary-row">
                            <dl class="summary-item">
                                <dt class="summary-label">Original price</dt>
                                <dd class="summary-value">$7,592.00</dd>
                            </dl>

                            <dl class="summary-item">
                                <dt class="summary-label">Savings</dt>
                                <dd class="summary-value summary-value-green">-$299.00</dd>
                            </dl>

                            <dl class="summary-item">
                                <dt class="summary-label">Store Pickup</dt>
                                <dd class="summary-value">$99</dd>
                            </dl>

                            <dl class="summary-item">
                                <dt class="summary-label">Tax</dt>
                                <dd class="summary-value">$799</dd>
                            </dl>
                        </div>

                        <dl class="summary-item summary-total">
                            <dt class="summary-label">Total</dt>
                            <dd class="summary-value">$8,191.00</dd>
                        </dl>
                    </div>

                    <a href="#" class="btn-checkout">
                        Proceed to Checkout
                    </a>

                    <div class="summary-footer">
                        <span class="summary-footer-text"> or </span>
                        <a href="#" class="summary-footer-link">
                            Continue Shopping
                            <ArrowBackIcon className="footer-link-icon"></ArrowBackIcon>
                        </a>
                    </div>
                </div>

                <div class="voucher-card">
                    <form class="voucher-form">
                        <div class="form-group">
                            <label for="voucher" class="form-label">
                                Do you have a voucher or gift card?
                            </label>
                            <input type="text" id="voucher"
                                   class="form-input"
                                   placeholder="" required/>
                        </div>
                        <button type="submit" class="btn-apply">
                            Apply Code
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .cart-section {
        background-color: white;
        padding: 2rem 0;
    }

    .cart-container {
        margin: 0 auto;
        max-width: 1280px;
        padding: 0 1rem;
    }

    .cart-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }

    .cart-layout {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .cart-items {
        margin: 0 auto;
        width: 100%;
        flex: none;
    }

    .items-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .cart-summary {
        margin: 0 auto;
        max-width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .summary-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .summary-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }

    .summary-details {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .summary-row {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .summary-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .summary-total {
        border-top: 1px solid #e5e7eb;
        padding-top: 0.5rem;
    }

    .summary-label {
        font-size: 1rem;
        font-weight: 400;
        color: #6b7280;
    }

    .summary-value {
        font-size: 1rem;
        font-weight: 500;
        color: #111827;
    }

    .summary-total .summary-label {
        font-weight: 700;
        color: #111827;
    }

    .summary-total .summary-value {
        font-weight: 700;
        color: #111827;
    }

    .summary-value-green {
        color: #16a34a;
    }

    .btn-checkout {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        background-color: #1d4ed8;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: white;
        text-decoration: none;
    }

    .btn-checkout:hover {
        background-color: #1e40af;
    }

    .btn-checkout:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
    }

    .summary-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    }

    .summary-footer-text {
        font-size: 0.875rem;
        font-weight: 400;
        color: #6b7280;
    }

    .summary-footer-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #1d4ed8;
        text-decoration: underline;
    }

    .summary-footer-link:hover {
        text-decoration: none;
    }

    .footer-link-icon {
        width: 1.25rem;
        height: 1.25rem;
    }

    .voucher-card {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        background-color: white;
        padding: 1rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .voucher-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-label {
        margin-bottom: 0.5rem;
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }

    .form-input {
        display: block;
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
        background-color: #f9fafb;
        padding: 0.625rem;
        font-size: 0.875rem;
        color: #111827;
    }

    .form-input:focus {
        outline: none;
        border-color: #2563eb;
    }

    .form-input::placeholder {
        color: #9ca3af;
    }

    .btn-apply {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem;
        background-color: #1d4ed8;
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: white;
        border: none;
        cursor: pointer;
    }

    .btn-apply:hover {
        background-color: #1e40af;
    }

    .btn-apply:focus {
        outline: none;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.3);
    }

    @media (min-width: 768px) {
        .cart-section {
            padding: 4rem 0;
        }

        .summary-card {
            padding: 1.5rem;
        }
    }

    @media (min-width: 1024px) {
        .cart-layout {
            flex-direction: row;
            align-items: flex-start;
        }

        .cart-items {
            max-width: 42rem;
        }

        .cart-summary {
            width: 100%;
        }
    }
</style>
