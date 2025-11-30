/********************************************
 * Мини-проект 2. Добавляем только html + css: ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
 * Тема: setInterval, setTimeout, функции управления
 ********************************************/

/*
setInterval — запускает функцию через определённые интервалы времени (в миллисекундах).
setTimeout — выполняет функцию один раз с задержкой.

Таймер здесь уменьшается каждую секунду до нуля.
*/

function startCountdown(seconds) {
    let remaining = seconds;

    const timer = setInterval(() => {
        console.log("Осталось:", remaining, "сек.");

        remaining--;

        if (remaining < 0) {
            clearInterval(timer); // останавливаем таймер
            console.log("Время вышло!");
        }
    }, 1000);
}

// Пример использования:
startCountdown(5);
