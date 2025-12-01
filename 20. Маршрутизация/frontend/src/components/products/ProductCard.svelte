<script>
    import ChangeQuantityForm from "./ChangeQuantityForm.svelte"






    let {product, callback} = $props()
</script>

<div class="product-card">
    <div class="product-image-container">
        <a href="/products/{product.id}">
            <img class="product-image"
                 src="{product.img}" alt=""/>
        </a>
    </div>
    <div class="product-content">
        <a href="#" class="product-name">{product.name}</a>
        <div class="product-footer">
            <p class="product-price">${product.price}</p>
            <ChangeQuantityForm {product} {callback}></ChangeQuantityForm>
        </div>
    </div>
</div>

<style>
    .product-card {
        border-radius: 0.5rem;
        border: 1px solid #e5e7eb;
        background-color: white;
        padding: 1.5rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .product-image-container {
        height: 14rem;
        width: 100%;
    }

    .product-image {
        margin: 0 auto;
        height: 100%;
        width: auto;
        object-fit: contain;
    }

    .product-content {
        padding-top: 1.5rem;
    }

    .product-header {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .product-badge {
        margin-right: 0.5rem;
        border-radius: 9999px;
        background-color: #dbeafe;
        padding: 0.125rem 0.625rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: #1e40af;
    }

    .product-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.25rem;
    }

    .action-btn {
        border-radius: 0.5rem;
        padding: 0.5rem;
        color: #6b7280;
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .action-btn:hover {
        background-color: #f3f4f6;
        color: #111827;
    }

    .action-icon {
        width: 1.25rem;
        height: 1.25rem;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    .product-name {
        font-size: 1.125rem;
        font-weight: 600;
        line-height: 1.25;
        color: #111827;
        text-decoration: none;
    }

    .product-name:hover {
        text-decoration: underline;
    }

    .product-rating {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .stars {
        display: flex;
        align-items: center;
    }

    .star {
        width: 1rem;
        height: 1rem;
        color: #fbbf24;
    }

    .rating-text {
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }

    .rating-count {
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
    }

    .product-features {
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        list-style: none;
        padding: 0;
    }

    .feature-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .feature-icon {
        width: 1rem;
        height: 1rem;
        color: #6b7280;
    }

    .feature-text {
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
    }

    .product-footer {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .product-price {
        font-size: 1.5rem;
        font-weight: 800;
        line-height: 1.25;
        color: #111827;
    }
</style>
