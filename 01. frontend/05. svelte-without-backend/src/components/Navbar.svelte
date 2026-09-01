<script>
    import {onMount} from 'svelte'
    import {goto} from '$app/navigation'
    import {isAuthenticated, logout} from '$lib/auth.js'

    // Реактивная переменная для отслеживания статуса авторизации
    let authenticated = false

    // Проверяем статус авторизации при монтировании компонента
    // и добавляем слушатель события storage для синхронизации между вкладками
    onMount(() => {
        authenticated = isAuthenticated()

        // Функция для обновления статуса авторизации
        function updateAuthStatus() {
            authenticated = isAuthenticated()
        }

        // Слушаем изменения в localStorage для синхронизации состояния между вкладками
        window.addEventListener('storage', updateAuthStatus)

        // Слушаем кастомное событие для обновления при логине/выходе в той же вкладке
        window.addEventListener('authStateChanged', updateAuthStatus)

        // Также проверяем при фокусе на окне (на случай изменений в той же вкладке)
        window.addEventListener('focus', updateAuthStatus)

        return () => {
            window.removeEventListener('storage', updateAuthStatus)
            window.removeEventListener('authStateChanged', updateAuthStatus)
            window.removeEventListener('focus', updateAuthStatus)
        }
    })

    // Обработчик выхода из системы
    function handleLogout() {
        logout()
        authenticated = false
        // Отправляем событие для обновления других компонентов
        window.dispatchEvent(new Event('authStateChanged'))
        goto('/')
    }
</script>

<nav>
    <div class="navbar-container">
        <a href="/" class="logo-link">
            <img src="/logo.png" class="logo-img" alt="Logo"/>
        </a>
        <button type="button" class="menu-toggle" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
        </button>
        <div class="navbar-menu" id="navbar-default">
            <ul class="nav-list">
                <li>
                    <a href="/products" class="nav-link">Товары</a>
                </li>
                <li>
                    <a href="/shopping-cart" class="nav-link">Корзина</a>
                </li>
                {#if authenticated}
                    <li>
                        <button type="button" class="nav-link nav-button" onclick={handleLogout}>
                            Выход
                        </button>
                    </li>
                {:else}
                    <li>
                        <a href="/auth/login" class="nav-link">Логин</a>
                    </li>
                    <li>
                        <a href="/auth/registration" class="nav-link">Регистрация</a>
                    </li>
                {/if}
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

    .nav-button {
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        font-weight: inherit;
        font-size: inherit;
        display: block;
        padding: 0.5rem 0.75rem;
        color: #111827;
        border-radius: 0.25rem;
        text-decoration: none;
    }

    .nav-button:hover {
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

        .nav-button {
            padding: 0;
        }

        .nav-button:hover {
            background-color: transparent;
        }
    }
</style>
