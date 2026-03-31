<script>
    let { data } = $props();

    let product = data.product;

</script>

<section class="product-detail-section">
    <div class="product-detail-container">
        <div class="product-detail-grid">
            <div class="product-image-wrapper">
                <img class="product-image" src="{product.img}"
                     alt="" />
            </div>

            <div class="product-info">
                <h1 class="product-title">
                    {product.name}
                </h1>
                <div class="product-price-rating">
                    <p class="product-price">
                        ${product.price}
                    </p>
                </div>

                <hr class="divider" />

                <p class="product-description">
                    Studio quality three mic array for crystal clear calls and voice
                    recordings. Six-speaker sound system for a remarkably robust and
                    high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                </p>

                <p class="product-description">
                    Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                    Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                    Magic Keyboard or Magic Keyboard with Touch ID.
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    .product-detail-section {
        padding: 2rem 0;
        background-color: white;
    }

    .product-detail-container {
        max-width: 1280px;
        padding: 0 1rem;
        margin: 0 auto;
    }

    .product-detail-grid {
        display: grid;
        gap: 2rem;
    }

    .product-image-wrapper {
        flex-shrink: 0;
        max-width: 28rem;
        margin: 0 auto;
    }

    .product-image {
        width: 100%;
    }

    .product-info {
        margin-top: 1.5rem;
    }

    .product-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }

    .product-price-rating {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .product-price {
        font-size: 1.5rem;
        font-weight: 800;
        color: #111827;
    }

    .product-actions {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
    }

    .divider {
        margin: 1.5rem 0;
        border-color: #e5e7eb;
        border-width: 0;
        border-top-width: 1px;
    }

    .product-description {
        margin-bottom: 1.5rem;
        color: #6b7280;
        line-height: 1.75;
    }

    @media (min-width: 640px) {
        .product-price-rating {
            flex-direction: row;
            align-items: center;
        }

        .product-actions {
            flex-direction: row;
            align-items: center;
        }
    }

    @media (min-width: 1024px) {
        .product-detail-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .product-info {
            margin-top: 0;
        }

        .product-title {
            font-size: 1.5rem;
        }

        .product-price {
            font-size: 1.875rem;
        }
    }
</style>
