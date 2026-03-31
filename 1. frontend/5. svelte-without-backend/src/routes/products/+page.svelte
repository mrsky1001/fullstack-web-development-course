<script>
    import productsData from "$lib/test-products.json"
    import {onMount} from "svelte"
    import ProductCard from "../../components/ProductCard.svelte"

    let products = []

    onMount(() => {
        products = productsData
    })

</script>

<section class="products-section">
    <div class="products-container">
        <div class="products-grid">
            {#each products as product }
                <ProductCard product={product}/>
            {/each}
        </div>
    </div>
</section>

<style>
    .products-section {
        background-color: #f9fafb;
        padding: 2rem 0;
    }

    .products-container {
        margin: 0 auto;
        max-width: 1280px;
        padding: 0 1rem;
    }

    .products-grid {
        margin-bottom: 1rem;
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
    }

    @media (min-width: 640px) {
        .products-grid {
            grid-template-columns: repeat(2, 1fr);
        }

    }

    @media (min-width: 768px) {
        .products-section {
            padding: 3rem 0;
        }

    }

    @media (min-width: 1024px) {
        .products-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (min-width: 1280px) {
        .products-grid {
            grid-template-columns: repeat(4, 1fr);
        }
    }
</style>
