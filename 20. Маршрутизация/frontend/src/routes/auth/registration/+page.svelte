<script>
    const user = {
        name: 'Ivan',
        email: 'email@email.com',
        password: 'asd',
    }

    function onSubmit(event) {
        event.preventDefault()

        console.log(user)

        fetch('http://localhost:3000/auth/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }
</script>

<section class="registration-section">
    <div class="registration-container">
        <a href="#" class="registration-logo">
            <img class="logo-img" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Store app
        </a>
        <div class="registration-card">
            <div class="registration-card-content">
                <h1 class="registration-title">
                   Регистрация
                </h1>
                <form id="registrationForm" class="registration-form" action="#" onsubmit="{onSubmit}">
                    <div class="form-group">
                        <label for="name" class="form-label">Name</label>
                        <input name="name" id="name"
                               class="form-input"
                               placeholder="Ivan Ivanov" required="" bind:value={user.name}>
                    </div>
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" name="email" id="email"
                               class="form-input"
                               placeholder="name@company.com" required="" bind:value={user.email}>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               class="form-input"
                               required="" bind:value={user.password}>
                    </div>
                    <button type="submit" class="btn-submit">
                        Регистрация
                    </button>
                    <p class="form-footer">
                        Already have an account? <a href="#" class="form-link">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>

<style>
    .registration-section {
        background-color: #f9fafb;
    }

    .registration-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem 1.5rem;
        margin: 0 auto;
        min-height: 100vh;
    }

    .registration-logo {
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

    .registration-card {
        width: 100%;
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        max-width: 28rem;
    }

    .registration-card-content {
        padding: 1.5rem;
    }

    .registration-title {
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: -0.025em;
        color: #111827;
        margin-bottom: 1.5rem;
    }

    .registration-form {
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

    .form-footer {
        font-size: 0.875rem;
        font-weight: 300;
        color: #6b7280;
        text-align: center;
    }

    .form-link {
        font-weight: 500;
        color: #2563eb;
        text-decoration: none;
    }

    .form-link:hover {
        text-decoration: underline;
    }

    @media (min-width: 768px) {
        .registration-container {
            padding: 2rem 1.5rem;
        }

        .registration-card-content {
            padding: 2rem;
        }

        .registration-title {
            font-size: 1.5rem;
        }

        .registration-form {
            gap: 1.5rem;
        }
    }
</style>
