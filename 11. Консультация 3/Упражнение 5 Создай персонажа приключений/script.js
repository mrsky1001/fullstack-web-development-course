// Имя и класс персонажа
const name = "Торин";
const className = "Маг";

// Базовые характеристики
const baseStrength = 10;
const baseAgility = 8;
const baseIntelligence = 30;

// Есть ли магическое кольцо
const hasMagicRing = true;

// Дополнительные очки для распределения
const bonusPoints = 20;

// Возраст персонажа
const age = 120;

// Распределяем бонусные очки по характеристикам:
// 50% в силу, 30% в ловкость, 20% в интеллект
const bonusStrength = bonusPoints * 0.5;
const bonusAgility = bonusPoints * 0.3;
const bonusIntelligence = bonusPoints * 0.2;

// Итоговые характеристики
const totalStrength = baseStrength + bonusStrength;
const totalAgility = baseAgility + bonusAgility;
const totalIntelligence = baseIntelligence + bonusIntelligence;

// Описание персонажа (строковое объединение)
const description = `Имя: ${name}, Класс: ${className}, Возраст: ${age} лет`;

// Логические и сравнительные операции
const isStrong = totalStrength > 20;
const isOld = age >= 100;

// Логическое выражение для легендарности
const isLegendary = isStrong || (hasMagicRing && totalIntelligence > 30);

console.log("\n");
console.log("===============[ Упражнение 5. Персонаж приключений ] ===============");
console.log("\n");
console.log("// Выводим типы переменных с помощью typeof");
console.log("Тип name:", typeof name);
console.log("Тип className:", typeof className);
console.log("Тип hasMagicRing:", typeof hasMagicRing);
console.log("Тип totalStrength:", typeof totalStrength);

// Тернарный оператор для титула
const title = isLegendary ? "Легендарный герой" : "Обычный герой";

console.log("\n");
console.log("// Выводим всю информацию в консоль");
console.log(description);
console.log("Сила:", totalStrength);
console.log("Ловкость:", totalAgility);
console.log("Интеллект:", totalIntelligence);
console.log("Имеет магическое кольцо:", hasMagicRing);
console.log("isStrong:", isStrong);
console.log("isOld:", isOld);
console.log("isLegendary:", isLegendary);
console.log("Роль:", title);
console.log("======================================================================");
