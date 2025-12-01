<script>
    import BadgeArrowIcon from "../components/svg/BadgeArrowIcon.svelte"
    import ArrowForwardIcon from "../components/svg/ArrowForwardIcon.svelte"
</script>

<section class="hero">
    <div class="hero-container">
        <a href="/products" class="announcement-badge" role="alert">
            <span class="badge-label">Новинка</span>
            <span class="badge-text">Ознакомьтесь с нашими новыми гаджетами!</span>
            <BadgeArrowIcon className="badge-icon"></BadgeArrowIcon>
        </a>
        <h1 class="hero-title">
            ТехноТренд
        </h1>
        <p class="hero-subtitle">
            Откройте для себя передовые технологии и премиальную электронику, чтобы улучшить ваш стиль жизни с
            непревзойденным качеством и инновациями.
        </p>
        <div class="hero-actions">
            <a href="/products" class="btn btn-primary">
                Купить сейчас
                <ArrowForwardIcon className="btn-icon"></ArrowForwardIcon>
            </a>
            <a href="/auth/login" class="btn btn-secondary">
                Авторизоваться
            </a>
        </div>
    </div>
</section>

<style>
    .hero {
        height: 100vh;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        background-color: white;
    }

    .hero-container {
        padding: 2rem 1rem;
        margin: 0 auto;
        max-width: 1280px;
        text-align: center;
    }

    .announcement-badge {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.25rem 0.25rem 0.25rem 0.25rem;
        margin-bottom: 1.75rem;
        font-size: 0.875rem;
        color: #374151;
        background-color: #f3f4f6;
        border-radius: 9999px;
        text-decoration: none;
    }

    .announcement-badge:hover {
        background-color: #e5e7eb;
    }

    .badge-label {
        font-size: 0.75rem;
        background-color: #2563eb;
        border-radius: 9999px;
        color: white;
        padding: 0.375rem 1rem;
        margin-right: 0.75rem;
    }

    .badge-text {
        font-size: 0.875rem;
        font-weight: 500;
    }

    .badge-icon {
        margin-left: 0.5rem;
        width: 1.25rem;
        height: 1.25rem;
    }

    .hero-title {
        margin-bottom: 1rem;
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.025em;
        line-height: 1.1;
        color: #111827;
    }

    .hero-subtitle {
        margin-bottom: 2rem;
        font-size: 1.125rem;
        font-weight: 400;
        line-height: 1.75rem;
        color: #6b7280;
    }

    .hero-actions {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        gap: 1rem;
    }

    .btn {
        display: inline-flex;
        justify-content: space-around;
        align-items: center;
        padding: 0.75rem 1.25rem;
        font-size: 1rem;
        font-weight: 500;
        text-align: center;
        text-decoration: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .btn-primary {
        color: white;
        background-color: #1d4ed8;
    }

    .btn-primary:hover {
        background-color: #1e40af;
    }

    .btn-secondary {
        color: #111827;
        background-color: white;
        border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
        background-color: #f9fafb;
    }

    .btn-icon {
        margin-left: 0.5rem;
        margin-right: -0.25rem;
        width: 1.25rem;
        height: 1.25rem;
    }

    @media (min-width: 640px) {
        .hero-actions {
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
        }
    }

    @media (min-width: 768px) {
        .hero-container {
            padding: 4rem 3rem;
        }

        .hero-title {
            font-size: 3rem;
        }

        .hero-subtitle {
            font-size: 1.25rem;
        }
    }

    @media (min-width: 1024px) {
        .hero-title {
            font-size: 3.75rem;
        }
    }
</style>
