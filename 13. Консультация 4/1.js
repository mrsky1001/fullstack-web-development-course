// app.js
const readline = require('readline');

// Создание интерфейса ввода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Основной процесс
async function start() {
  console.log('Добро пожаловать в PizzaBot!');
  showMenu();

  rl.question('\nВыберите пиццу по номеру или введите название: ', async (answer) => {

    rl.close();
  });
}

start();
