<script>
    import { push } from 'svelte-spa-router';
    import { auth } from '../lib/authStore';
    
    let name = '';
    let email = '';
    let password = '';
    let error = '';
    let success = '';
    let loading = false;

    // Обработка регистрации
    async function handleRegister() {
        error = '';
        success = '';
        loading = true;
        const res = await auth.register(name, email, password);
        if (res.status === 'success') {
            success = res.message;
            setTimeout(() => push('/login'), 1500);
        } else {
            error = res.message || 'Ошибка регистрации';
        }
        loading = false;
    }
</script>

<div class="card">
    <h2>Регистрация</h2>
    <form on:submit|preventDefault={handleRegister}>
        <div class="input-group">
            <label for="name">Имя</label>
            <input type="text" id="name" bind:value={name} required />
        </div>
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
        {:else if success}
            <p class="success">{success}</p>
        {/if}
        
        <button type="submit" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
    </form>
    <p class="footer">Уже есть аккаунт? <a href="#/login">Войти</a></p>
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
    .success {
        color: #2ed573;
        font-size: 0.9rem;
        margin: 0.5rem 0;
    }
    .footer {
        margin-top: 1.5rem;
        font-size: 0.9rem;
    }
</style>
