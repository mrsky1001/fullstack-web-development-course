// Импортируем модуль readline
const readline = require("readline");

// Создаём интерфейс для ввода/вывода через консоль
const rl = readline.createInterface({
    input: process.stdin,   // стандартный поток ввода (клавиатура)
    output: process.stdout  // стандартный поток вывода (консоль)
});

// Задаём вопрос пользователю
rl.question("Как тебя зовут? ", (name) => {
    console.log(`Привет, ${name}!`);

    // Закрываем интерфейс, чтобы программа завершилась
    rl.close();
});
