const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Оборачиваем вопрос в промис для использования await
function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function main() {
    const name = await ask("Введите имя: ");
    const city = await ask("Из какого вы города? ");
    console.log(`Приятно познакомиться, ${name} из ${city}!`);
    rl.close();
}

main();
