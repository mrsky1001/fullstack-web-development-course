<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import { user, auth, loading } from '../lib/authStore';

    onMount(async () => {
        // Если данных о пользователе нет, пробуем их получить (восстановить сессию)
        if (!$user) {
            await auth.check();
            // Если после проверки пользователя все еще нет - кидаем на логин
            if (!$user && !$loading) {
                push('/login');
            }
        }
    });

    // Обработка выхода
    async function handleLogout() {
        const res = await auth.logout();
        if (res.status === 'success') {
            push('/login');
        }
    }
</script>

<div class="card">
    {#if $loading}
        <p>Загрузка...</p>
    {:else if $user}
        <h2>Профиль</h2>
        <div class="info">
            <p><strong>Имя:</strong> {$user.name}</p>
            <p><strong>Email:</strong> {$user.email}</p>
        </div>
        <button on:click={handleLogout} class="danger">Выйти</button>
    {:else}
        <p>Перенаправление на страницу входа...</p>
    {/if}
</div>

<style>
    .info {
        text-align: left;
        margin: 1.5rem 0;
        padding: 1rem;
        background: #f1f2f6;
        border-radius: 4px;
    }
    button.danger {
        background-color: #ff4757;
    }
    button.danger:hover {
        background-color: #ff6b81;
    }
</style>
