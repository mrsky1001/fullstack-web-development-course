<script>
    import MenuIcon from "../svg/MenuIcon.svelte"
</script>

<nav>
    <div class="navbar-container">
        <a href="/" class="logo-link">
            <img src="/logo.png" class="logo-img" alt="Logo"/>
        </a>
        <button type="button" class="menu-toggle" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <MenuIcon className="menu-icon"></MenuIcon>
        </button>
        <div class="navbar-menu" id="navbar-default">
            <ul class="nav-list">
                <li>
                    <a href="/products" class="nav-link">Товары</a>
                </li>
                <li>
                    <a href="/shopping-cart" class="nav-link">Корзина</a>
                </li>
                <li>
                    <a href="/auth/login" class="nav-link">Логин</a>
                </li>
                <li>
                    <a href="/auth/registration" class="nav-link">Регистрация</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>
    nav {
        background-color: white;
        border-bottom: 1px solid #e5e7eb;
    }

    .navbar-container {
        max-width: 1280px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        margin: 0 auto;
        padding: 1rem;
    }

    .logo-link {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .logo-img {
        height: 3rem;
    }

    .menu-toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 0.875rem;
        color: #6b7280;
        border-radius: 0.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .menu-toggle:hover {
        background-color: #f3f4f6;
    }

    .menu-icon {
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

    .navbar-menu {
        width: 100%;
    }

    .nav-list {
        font-weight: 500;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        margin-top: 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        background-color: #f9fafb;
        list-style: none;
        gap: 0.5rem;
    }

    .nav-link {
        display: block;
        padding: 0.5rem 0.75rem;
        color: #111827;
        border-radius: 0.25rem;
        text-decoration: none;
    }

    .nav-link:hover {
        background-color: #f3f4f6;
        color: #1d4ed8;
    }

    @media (min-width: 768px) {
        .menu-toggle {
            display: none;
        }

        .navbar-menu {
            width: auto;
        }

        .nav-list {
            flex-direction: row;
            gap: 2rem;
            padding: 0;
            margin-top: 0;
            border: none;
            background-color: transparent;
        }

        .nav-link {
            padding: 0;
        }

        .nav-link:hover {
            background-color: transparent;
        }
    }
</style>
