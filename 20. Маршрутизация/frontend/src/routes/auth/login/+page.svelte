<script>
    import {goto} from "$app/navigation"

    let user = {
        email: 'email@test.ru',
        password: 'pswd'
    }

    async function onSubmit(event) {
        event.preventDefault()

        console.log(user)

        const res = await fetch('http://localhost:3000/auth/login', {
            credentials: "include",
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        console.log(res)

        const status = (await res.json()).status

        console.log(status)

        goto('/products')
    }
</script>

<section class="login-section">
    <div class="login-container">
        <a href="#" class="login-logo">
            <img class="logo-img" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Store app
        </a>
        <div class="login-card">
            <div class="login-card-content">
                <h1 class="login-title">
                    Sign in to your account
                </h1>
                <form class="login-form" action="#" onsubmit="{onSubmit}">
                    <div class="form-group">
                        <label for="email" class="form-label">Your email</label>
                        <input type="email" name="email" id="email"
                               class="form-input"
                               placeholder="name@company.com" required="" bind:value={user.email}/>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               class="form-input"
                               required="" bind:value={user.password}/>
                    </div>
                    <button type="submit" class="btn-submit">
                        Sign in
                    </button>
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
</style>
