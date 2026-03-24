<script>
    import Router from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import { auth } from './lib/authStore';
    
    // Подгружаем маршруты
    import Home from './routes/Home.svelte';
    import Login from './routes/Login.svelte';
    import Register from './routes/Register.svelte';
    import Profile from './routes/Profile.svelte';

    // Конфигурация маршрутизатора
    const routes = {
        '/': Home,
        '/login': Login,
        '/register': Register,
        '/profile': Profile
    };

    onMount(() => {
        auth.check(); // Важно: Проверка авторизации сразу при запуске приложения (для сохранения сессии)
    });
</script>

<main>
    <div class="container">
        <Router {routes} />
    </div>
</main>

<style>
    :global(body) {
        margin: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #2d3436;
    }
    
    .container {
        width: 100%;
        max-width: 450px;
        padding: 20px;
    }

    :global(.card) {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        padding: 2.5rem;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    :global(button) {
        width: 100%;
        padding: 0.8rem;
        background-color: #646cff;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, background-color 0.2s;
        margin-top: 1rem;
    }

    :global(button:hover) {
        background-color: #535bf2;
        transform: translateY(-2px);
    }

    :global(button:active) {
        transform: translateY(0);
    }

    :global(a) {
        color: #646cff;
        text-decoration: none;
        font-weight: 500;
    }

    :global(a:hover) {
        text-decoration: underline;
    }
</style>
