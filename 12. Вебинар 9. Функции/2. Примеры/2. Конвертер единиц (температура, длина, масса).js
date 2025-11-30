/********************************************
 * Мини-проект 2. Добавляем только html + css: КОНВЕРТЕР ЕДИНИЦ
 * Тема: функции, математические вычисления, параметры
 ********************************************/

/*
Цель:
  Освоить передачу параметров и написание функций,
  которые выполняют различные преобразования данных.
*/

// ----- Температура -----
function celsiusToFahrenheit(c) {
    return (c * 9) / 5 + 32;
}

function fahrenheitToCelsius(f) {
    return ((f - 32) * 5) / 9;
}

// ----- Длина -----
function metersToKilometers(m) {
    return m / 1000;
}

function kilometersToMeters(km) {
    return km * 1000;
}

// ----- Масса -----
function gramsToKilograms(g) {
    return g / 1000;
}

function kilogramsToGrams(kg) {
    return kg * 1000;
}

// Пример использования
console.log("Температура 20°C =", celsiusToFahrenheit(20), "°F");
console.log("Температура 68°F =", fahrenheitToCelsius(68).toFixed(10), "°C");

console.log("1500 м =", metersToKilometers(1500), "км");
console.log("3 км =", kilometersToMeters(3), "м");

console.log("2500 г =", gramsToKilograms(2500), "кг");
console.log("5 кг =", kilogramsToGrams(5), "г");
