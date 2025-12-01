<script>
    import {onMount} from "svelte"
    import ProductCard from "../../components/products/ProductCard.svelte"
    import HomeIcon from "../../components/svg/HomeIcon.svelte"
    import ChevronRightIcon from "../../components/svg/ChevronRightIcon.svelte"
    import FilterIcon from "../../components/svg/FilterIcon.svelte"
    import ChevronDownIcon from "../../components/svg/ChevronDownIcon.svelte"
    import CloseIcon from "../../components/svg/CloseIcon.svelte"
    import productsData from "$lib/test-products.json"

    let loadedProducts = []
    let products = []
    let filter = {
        price: {min: null, max: null},
        categories: [{name: 'Мониторы', isChecked: false}, {name: 'Клавиатуры', isChecked: false}]
    }
    let isShowFilter = false

    function toggleFilter() {
        const el = document.getElementById("filterModal")

        isShowFilter = !isShowFilter

        if (isShowFilter) {
            el.classList.remove("hidden")
        } else {
            el.classList.add("hidden")
        }
    }

    function onFilter(rawProducts = loadedProducts) {
        console.log(filter)
        products = rawProducts.filter((product) => {
            let isRespond = true

            if (filter.price.min) {
                isRespond &&= product.price >= filter.price.min
            }

            if (filter.price.max) {
                isRespond &&= product.price <= filter.price.max
            }

            if (filter.categories.find(c => c.isChecked)) {
                isRespond &&= !!filter.categories.find((c) => c.isChecked && c.name === product.category)
            }

            return isRespond
        })
    }

    function loadProducts() {
        const rawProducts = productsData
        loadedProducts = rawProducts
        onFilter(rawProducts)
    }

    onMount(() => {
        loadProducts()
    })
</script>

<section class="products-section">
    <div class="products-container">
        <div class="products-header">
            <div class="header-left">
                <nav class="breadcrumb" aria-label="Breadcrumb">
                    <ol class="breadcrumb-list">
                        <li class="breadcrumb-item">
                            <a href="/" class="breadcrumb-link">
                                <HomeIcon className="breadcrumb-icon"></HomeIcon>
                                Главная
                            </a>
                        </li>
                        <li class="breadcrumb-item">
                            <div class="breadcrumb-separator">
                                <ChevronRightIcon className="breadcrumb-arrow"></ChevronRightIcon>
                                <a href="/products" class="breadcrumb-link">Товары</a>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h2 class="page-title">Список всех товаров</h2>
            </div>
            <div class="header-actions">
                <button type="button" onclick="{()=>toggleFilter()}" class="btn-filter">
                    <FilterIcon className="btn-icon"></FilterIcon>
                    Фильтр
                    <ChevronDownIcon className="btn-icon"></ChevronDownIcon>
                </button>
            </div>
        </div>

        <div class="products-grid">
            {#each products as product }
                <ProductCard product={product} callback={loadProducts} />
            {/each}
        </div>
    </div>

    <form action="#" method="get" id="filterModal" tabindex="-1" class="filter-modal hidden">
        <div class="modal-overlay" onclick="{()=>toggleFilter()}"></div>
        <div class="modal-content">
            <div class="modal-card">
                <div class="modal-header">
                    <h3 class="modal-title">Filters</h3>
                    <button type="button" onclick="{()=>toggleFilter()}" class="modal-close">
                        <CloseIcon className="close-icon"></CloseIcon>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="filter-content">
                        <div class="filter-group">
                            <div class="filter-row">
                                <h6 class="filter-label">Цена</h6>
                                <div class="price-inputs">
                                    <input type="number" id="min-price-input" bind:value="{filter.price.min}" min="0"
                                           max="100000" onchange="{()=>onFilter()}"
                                           class="price-input" placeholder="Мин" required/>
                                    <div class="price-separator">to</div>
                                    <input type="number" id="max-price-input" bind:value="{filter.price.max}" min="0"
                                           max="100000" onchange="{()=>onFilter()}"
                                           class="price-input" placeholder="Макс" required/>
                                </div>
                            </div>
                        </div>

                        <div class="filter-group">
                            <h6 class="filter-label">Категория</h6>
                            <div class="categories-list">
                                {#each filter.categories as category, idx}
                                    <div class="checkbox-item">
                                        <input id="category{idx}" type="checkbox"
                                               bind:checked="{category.isChecked}"
                                               onchange="{()=>onFilter()}"
                                               class="checkbox"/>
                                        <label for="category{idx}" class="checkbox-label">
                                            {category.name}
                                        </label>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
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

    .products-header {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .header-left {
        flex: 1;
    }

    .breadcrumb {
        display: flex;
    }

    .breadcrumb-list {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .breadcrumb-item {
        display: inline-flex;
        align-items: center;
    }

    .breadcrumb-link {
        display: inline-flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
        text-decoration: none;
    }

    .breadcrumb-link:hover {
        color: #2563eb;
    }

    .breadcrumb-icon {
        margin-right: 0.625rem;
        width: 0.75rem;
        height: 0.75rem;
    }

    .breadcrumb-separator {
        display: flex;
        align-items: center;
    }

    .breadcrumb-arrow {
        width: 1.25rem;
        height: 1.25rem;
        color: #9ca3af;
        margin-right: 0.25rem;
    }

    .page-title {
        margin-top: 0.75rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: #111827;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .btn-filter {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
        background-color: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .btn-filter:hover {
        background-color: #f9fafb;
        color: #1d4ed8;
    }

    .btn-icon {
        width: 1rem;
        height: 1rem;
        margin: 0 0.25rem;
    }

    .products-grid {
        margin-bottom: 1rem;
        display: grid;
        gap: 1rem;
        grid-template-columns: 1fr;
    }

    .filter-modal {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 50;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 1rem;
    }

    .filter-modal.hidden {
        display: none;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
        position: relative;
        height: 100%;
        width: 100%;
        max-width: 36rem;
        margin: 0 auto;
    }

    .modal-card {
        position: relative;
        border-radius: 0.5rem;
        background-color: white;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
        border-radius: 0.5rem 0.5rem 0 0;
    }

    .modal-title {
        font-size: 1.125rem;
        font-weight: 400;
        color: #6b7280;
    }

    .modal-close {
        margin-left: auto;
        display: inline-flex;
        align-items: center;
        padding: 0.375rem;
        font-size: 0.875rem;
        color: #9ca3af;
        background: transparent;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .modal-close:hover {
        background-color: #f3f4f6;
        color: #111827;
    }

    .close-icon {
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

    .modal-body {
        padding: 1rem;
    }

    .filter-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .filter-group {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .filter-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.75rem;
    }

    .filter-label {
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #000;
    }

    .price-inputs {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
    }

    .price-input {
        display: block;
        width: 100%;
        border-radius: 0.5rem;
        border: 1px solid #d1d5db;
        background-color: #f9fafb;
        padding: 0.625rem;
        font-size: 0.875rem;
        color: #111827;
    }

    .price-input:focus {
        outline: none;
        border-color: #2563eb;
    }

    .price-separator {
        flex-shrink: 0;
        font-size: 0.875rem;
        font-weight: 500;
        color: #374151;
    }

    .categories-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .checkbox-item {
        display: flex;
        align-items: center;
    }

    .checkbox {
        width: 1rem;
        height: 1rem;
        border-radius: 0.25rem;
        border: 1px solid #d1d5db;
        background-color: #f3f4f6;
        cursor: pointer;
    }

    .checkbox:checked {
        background-color: #2563eb;
        border-color: #2563eb;
    }

    .checkbox-label {
        margin-left: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }

    @media (min-width: 640px) {
        .products-grid {
            grid-template-columns: repeat(2, 1fr);
        }

        .products-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
        }
    }

    @media (min-width: 768px) {
        .products-section {
            padding: 3rem 0;
        }

        .page-title {
            font-size: 1.5rem;
        }

        .filter-group {
            grid-template-columns: repeat(2, 1fr);
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
