<script>
    import { link } from 'svelte-spa-router';
    import { user } from '../lib/authStore';
</script>

<div class="card">
    <h1>Welcome to Auth Demo</h1>
    <p>Modern authentication with Svelte & Passport.js</p>
    
    <div class="actions">
        {#if $user}
            <a href="/profile" use:link class="button">Go to Profile</a>
        {:else}
            <a href="/login" use:link class="button">Login</a>
            <a href="/register" use:link class="button secondary">Register</a>
        {/if}
    </div>
</div>

<style>
    .actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
    }
    .button.secondary {
        background: transparent;
        border: 2px solid #646cff;
        color: #646cff;
    }
</style>
