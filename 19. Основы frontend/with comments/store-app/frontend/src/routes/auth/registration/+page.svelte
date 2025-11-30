<script>
    // Объект для хранения данных пользователя
    const user = {
        name: 'Ivan',
        email: 'email@email.com',
        password: 'asd',
    }

    // Функция обработки отправки формы регистрации
    function onSubmit(event) {
        // Предотвращение стандартного поведения формы
        event.preventDefault()
        // Вывод данных пользователя в консоль для отладки
        console.log(user)
        // Отправка данных на сервер для регистрации
        fetch('http://localhost:3000/auth/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" // Указание формата данных
            },
            body: JSON.stringify(user) // Преобразование объекта в JSON
        })
    }
</script>

<!-- Секция страницы регистрации -->
<section class="bg-gray-50 dark:bg-gray-900">
    <!-- Контейнер с центрированным содержимым -->
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <!-- Логотип и название -->
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
            Store App
        </a>
        <!-- Форма регистрации -->
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <!-- Заголовок формы -->
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1>
                <!-- Форма с привязкой к функции onSubmit -->
                <form id="registrationForm" class="space-y-4 md:space-y-6" action="#" onsubmit="{onSubmit}">
                    <!-- Поле ввода имени -->
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input name="name" id="name"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Ivan Ivanov" required="" bind:value={user.name}>
                    </div>
                    <!-- Поле ввода email -->
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="name@company.com" required="" bind:value={user.email}>
                    </div>
                    <!-- Поле ввода пароля -->
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••"
                               class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               required="" bind:value={user.password}>
                    </div>
                    <!-- Кнопка отправки формы -->
                    <button type="submit"
                            class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                        Create an account
                    </button>
                    <!-- Ссылка для входа для зарегистрированных пользователей -->
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a href="#"
                                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>