<script>
    let {product} = $props()

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
            <button type="button" class="btn-add-to-cart">
                В корзину
            </button>
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
