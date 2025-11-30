/********************************************
 * Мини-проект 2. Добавляем только html + css: ПРИЛОЖЕНИЕ "ПОГОДА"
 * Тема: async / await, промисы, асинхронные функции
 ********************************************/

/*
async — объявляет асинхронную функцию, которая всегда возвращает Promise.
await — приостанавливает выполнение функции до завершения Promise.

Пример ниже имитирует запрос к погодному API через setTimeout.
*/

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getWeather(city) {
    console.log(`Запрос погоды для города: ${city}...`);

    // имитация запроса через Promise
    const data = await new Promise((resolve) => {
        setTimeout(() => {
            const fakeWeather = {
                city,
                temperature: getRandomInt(10, 30).toFixed(1),
                condition: "Ясно ☀️",
            };
            resolve(fakeWeather);
        }, 2000);
    });

    console.log("Ответ от сервера получен!");
    return data;
}

// Использование async функции:
async function showWeather() {
    try {
        const weather = await getWeather("Омск");
        console.log(`Погода в ${weather.city}: ${weather.temperature}°C, ${weather.condition}`);
    } catch (error) {
        console.log("Ошибка при получении погоды:", error);
    }
}

showWeather();
