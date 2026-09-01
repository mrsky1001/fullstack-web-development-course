<script>
    import { push } from 'svelte-spa-router';
    import { auth } from '../lib/authStore';
    
    let email = '';
    let password = '';
    let error = '';
    let loading = false;

    // Обработка отправки формы входа
    async function handleLogin() {
        error = '';
        loading = true;
        const res = await auth.login(email, password);
        if (res.status === 'success') {
            push('/profile');
        } else {
            error = res.message || 'Ошибка входа';
        }
        loading = false;
    }
</script>

<div class="card">
    <h2>Вход</h2>
    <form on:submit|preventDefault={handleLogin}>
        <div class="input-group">
            <label for="email">Email</label>
            <input type="email" id="email" bind:value={email} required />
        </div>
        <div class="input-group">
            <label for="password">Пароль</label>
            <input type="password" id="password" bind:value={password} required />
        </div>
        
        {#if error}
            <p class="error">{error}</p>
        {/if}
        
        <button type="submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
        </button>
    </form>
    <p class="footer">Нет аккаунта? <a href="#/register">Зарегистрироваться</a></p>
</div>

<style>
    .input-group {
        margin-bottom: 1rem;
        text-align: left;
    }
    label {
        display: block;
        margin-bottom: 0.3rem;
        font-weight: 500;
    }
    input {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .error {
        color: #ff4757;
        font-size: 0.9rem;
        margin: 0.5rem 0;
    }
    .footer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
    }
</style>
