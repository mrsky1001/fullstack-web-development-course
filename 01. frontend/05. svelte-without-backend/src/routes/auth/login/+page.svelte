<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { fakeLogin, getAuthState } from '$lib/auth.js';

    let form = {
        email: '',
        password: ''
    };


    let notification = null;
    let isSubmitting = false;

    onMount(() => {
        const stored = getAuthState();
        if (stored?.user?.email) {
            form.email = stored.user.email;
        }
    });

    async function onSubmit(event) {
        event.preventDefault();
        if (isSubmitting) return;

        notification = null;
        isSubmitting = true;

        const result = fakeLogin(form.email.trim(), form.password.trim());

        if (result.success) {
            notification = { type: 'success', message: result.message };

            // Отправляем событие для обновления Navbar
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('authStateChanged'));
            }
            await new Promise((resolve) => setTimeout(resolve, 600));
            goto('/products');
        } else {
            notification = { type: 'error', message: result.message };
        }

        isSubmitting = false;
    }

    console.log("HELLO это страница с логином")
</script>

<section class="login-section">
    <div class="login-container">
        <a href="#" class="login-logo">
            <img class="logo-img" src="/logo.png" alt="logo">
            Store app
        </a>
        <div class="login-card">
            <div class="login-card-content">
                <h1 class="login-title">
                    Авторизация
                </h1>
                <form class="login-form" action="#" onsubmit="{onSubmit}">
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" name="email" id="email"
                               class="form-input"
                               placeholder="name@company.com" required="" bind:value={form.email} />
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               class="form-input"
                               required="" bind:value={form.password} />
                    </div>
                    {#if notification}
                        <p class="notice" data-type={notification.type}>{notification.message}</p>
                    {:else}
                        <p class="notice">Сообщений нет!</p>
                    {/if}
                    <button type="submit" class="btn-submit" disabled={isSubmitting}>
                        Войти
                    </button>
                    <p class="login-footer">
                        Нет аккаунта?
                        <a href="/auth/registration" class="login-link">Зарегистрироваться</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>

<style>
    .login-section {
        background-color: #f9fafb;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 1.5rem;
        margin: 0 auto;
        min-height: 100vh;
    }

    .login-logo {
        display: flex;
        align-items: center;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        color: #111827;
        text-decoration: none;
    }

    .logo-img {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
    }

    .login-card {
        width: 100%;
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        max-width: 28rem;
    }

    .login-card-content {
        padding: 1.5rem;
    }

    .login-title {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: -0.025em;
        color: #111827;
        margin-bottom: 1.5rem;
    }

    .login-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: #111827;
    }

    .form-input {
        background-color: #f9fafb;
        border: 1px solid #d1d5db;
        color: #111827;
        border-radius: 0.5rem;
        padding: 0.625rem;
        width: 100%;
        font-size: 0.875rem;
    }

    .form-input:focus {
        outline: none;
        border-color: #2563eb;
        ring: 2px;
        ring-color: #2563eb;
    }

    .form-input::placeholder {
        color: #9ca3af;
    }

    .btn-submit {
        width: 100%;
        color: white;
        background-color: #2563eb;
        font-weight: 500;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        padding: 0.625rem 1.25rem;
        border: none;
        cursor: pointer;
    }

    .btn-submit[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .btn-submit:hover {
        background-color: #1d4ed8;
    }

    .btn-submit:focus {
        outline: none;
        ring: 4px;
        ring-color: #93c5fd;
    }

    @media (min-width: 768px) {
        .login-container {
            padding: 2rem 1.5rem;
        }

        .login-card-content {
            padding: 2rem;
        }

        .login-title {
            font-size: 1.5rem;
        }

        .login-form {
            gap: 1.5rem;
        }
    }

    .notice {
        border-radius: 0.5rem;
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .notice[data-type="success"] {
        background-color: #ecfdf5;
        color: #065f46;
        border: 1px solid #34d399;
    }

    .notice[data-type="error"] {
        background-color: #fef2f2;
        color: #b91c1c;
        border: 1px solid #fecaca;
    }

    .login-footer {
        text-align: center;
        font-size: 0.875rem;
        color: #6b7280;
    }

    .login-link {
        color: #2563eb;
        text-decoration: none;
    }

    .login-link:hover {
        text-decoration: underline;
    }
</style>
