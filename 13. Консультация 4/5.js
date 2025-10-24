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

// Функция отображения ингредиентов
function showIngredients(pizzaName) {
    const pizza = menu.find(p => p.name.toLowerCase() === pizzaName.toLowerCase());
    if (pizza) {
        console.log(`Состав: ${pizza.ingredients.join(', ')}`);
    } else {
        console.log('Пицца не найдена в меню.');
    }
}

// Обычная функция — создаёт заказ
function createOrder(pizzaName) {
    return {
        name: pizzaName,
        status: 'Принят'
    };
}

// Основной процесс
async function start() {
  console.log('Добро пожаловать в PizzaBot!');
  showMenu();

  rl.question('\nВыберите пиццу по номеру или введите название: ', async (answer) => {
      let selected;

      const index = parseInt(answer) - 1;

      //Обработка вариантов ввода названия
      // По номеру
      if (!isNaN(index) && index >= 0 && index < menu.length) {
          selected = menu[index].name;
      } else {
          // По названию
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
