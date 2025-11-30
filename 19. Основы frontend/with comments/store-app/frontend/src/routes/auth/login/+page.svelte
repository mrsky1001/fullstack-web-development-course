<script>
    // Импорт функции goto для навигации в SvelteKit
    import {goto} from "$app/navigation"

    // Объект для хранения данных пользователя
    let user = {
        email: 'email@test.ru',
        password: 'pswd'
    }

    // Асинхронная функция обработки отправки формы входа
    async function onSubmit(event) {
        // Предотвращение стандартного поведения формы
        event.preventDefault()
        // Вывод данных пользователя в консоль для отладки
        console.log(user)
        // Отправка данных на сервер для входа
        const res = await fetch('http://localhost:3000/auth/login', {
            credentials: "include", // Включение учетных данных (например, cookies)
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Указание формата данных
            },
            body: JSON.stringify(user) // Преобразование объекта в JSON
        })
        // Вывод ответа сервера в консоль для отладки
        console.log(res)
        // Получение статуса из ответа
        const status = (await res.json()).status
        // Вывод статуса в консоль
        console.log(status)
        // Перенаправление на страницу товаров после входа
        goto('/products')
    }
</script>

<!-- Секция страницы входа -->
<section class="bg-gray-50 dark:bg-gray-900">
    <!-- Контейнер с центрированным содержимым -->
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <!-- Логотип и название приложения -->
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Store app
        </a>
        <!-- Форма входа -->
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <!-- Заголовок формы -->
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <!-- Форма с привязкой к функции onSubmit -->
                <form class="space-y-4 md:space-y-6" action="#" onsubmit="{onSubmit}">
                    <!-- Поле ввода email -->
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email"
                               class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@company.com" required="" bind:value={user.email}/>
                    </div>
                    <!-- Поле ввода пароля -->
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required="" bind:value={user.password}/>
                    </div>
                    <!-- Кнопка отправки формы -->
                    <button type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>