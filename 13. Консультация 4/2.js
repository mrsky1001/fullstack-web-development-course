// app.js
const readline = require('readline');

// Создание интерфейса ввода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Меню пицц
const menu = [
    { name: 'Маргарита', ingredients: ['томат', 'сыр', 'базилик'] },
    { name: 'Пепперони', ingredients: ['сыр', 'пепперони'] },
    { name: 'Гавайская', ingredients: ['ветчина', 'ананас', 'сыр'] }
];

// Отображение меню
function showMenu() {
    console.log('\nМеню пицц:');
    menu.forEach((pizza, index) => {
        console.log(`${index + 1}. ${pizza.name}`);
    });
}

// Основной процесс
async function start() {
  console.log('Добро пожаловать в PizzaBot!');
  showMenu();

  rl.question('\nВыберите пиццу по номеру или введите название: ', async (answer) => {

    rl.close();
  });
}

start();
