// app.js
const readline = require('readline');

// Меню пицц
const menu = [
  { name: 'Маргарита', ingredients: ['томат', 'сыр', 'базилик'] },
  { name: 'Пепперони', ingredients: ['сыр', 'пепперони'] },
  { name: 'Гавайская', ingredients: ['ветчина', 'ананас', 'сыр'] }
];

// Создание интерфейса ввода
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Обычная функция — создаёт заказ
function createOrder(pizzaName) {
  return {
    name: pizzaName,
    status: 'Принят'
  };
}

// Функция отображения ингредиентов
function showIngredients(pizzaName) {
  const pizza = menu.find(p => p.name.toLowerCase() === pizzaName.toLowerCase());
  if (pizza) {
    console.log(`Состав: ${pizza.ingredients.join(', ')}`);
  } else {
    console.log('Пицца не найдена в меню.');
  }
}

// Асинхронная функция — готовит пиццу
async function preparePizza(order) {
  console.log('Пицца готовится...');
  await delayRandom();
  order.status = 'Готово';
  console.log(`Пицца готова: ${JSON.stringify(order)}`);
  return order;
}

// Асинхронная функция — доставляет пиццу
async function deliverPizza(order) {
  console.log('Пицца доставляется...');
  await delayRandom();
  order.status = 'Доставлено';
  console.log(`Пицца доставлена: ${JSON.stringify(order)}`);
  return order;
}

// Задержка от 2 до 5 секунд
function delayRandom() {
  const ms = Math.floor(Math.random() * 3000) + 2000;
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
    let selected;

    const index = parseInt(answer) - 1;
    if (!isNaN(index) && index >= 0 && index < menu.length) {
      selected = menu[index].name;
    } else {
      const match = menu.find(p => p.name.toLowerCase() === answer.toLowerCase());
      if (match) selected = match.name;
    }

    if (!selected) {
      console.log('Такой пиццы нет в меню.');
      rl.close();
      return;
    }

    console.log(`\nВы выбрали: ${selected}`);
    showIngredients(selected);

    const order = createOrder(selected);
    console.log(`\nЗаказ создан: ${JSON.stringify(order)}`);

    await preparePizza(order);
    await deliverPizza(order);

    rl.close();
  });
}

start();
