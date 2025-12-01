<footer>
    <hr/>
    <div class="footer-container">
        <div class="footer-content">
            <a href="/" class="footer-logo">
                <img src="/logo.png" class="logo-img" alt="Store App Logo"/>
            </a>
            <ul class="footer-links">
                <li>
                    <a href="/auth/loging" class="footer-link">Авторизация</a>
                </li>
                <li>
                    <a href="/auth/registration" class="footer-link">Регистрация</a>
                </li>
                <li>
                    <a href="/shopping-cart" class="footer-link">Корзина</a>
                </li>
                <li>
                    <a href="/products" class="footer-link">Список товаров</a>
                </li>
            </ul>
        </div>
        <span class="footer-copyright">© 2025 <a href="/" class="footer-link">Store App</a>. All Rights Reserved.</span>
    </div>
</footer>

<style>
    footer {
        background-color: white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    hr {
        border-color: #e5e7eb;
        margin: 0;
    }

    .footer-container {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 1rem;
    }

    .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .footer-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .logo-img {
        height: 5.5rem;
    }

    .footer-links {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-bottom: 1.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #6b7280;
        list-style: none;
        gap: 1rem;
    }

    .footer-link {
        color: #6b7280;
        text-decoration: none;
    }

    .footer-link:hover {
        text-decoration: underline;
    }

    .footer-copyright {
        display: block;
        font-size: 0.875rem;
        color: #6b7280;
        text-align: center;
    }

    @media (min-width: 640px) {
        .footer-content {
            flex-direction: row;
        }

        .footer-logo {
            margin-bottom: 0;
        }

        .footer-links {
            margin-bottom: 0;
        }
    }
</style>
