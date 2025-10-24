const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Введите ваше имя: ", (name) => {
    rl.question("Сколько вам лет? ", (age) => {
        console.log(`Имя: ${name}, Возраст: ${age}`);
        rl.close();
    });
});
