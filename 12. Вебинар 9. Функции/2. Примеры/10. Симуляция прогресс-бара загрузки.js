/********************************************
 * Мини-проект 3: СИМУЛЯЦИЯ ПРОГРЕСС-БАРА
 * Тема: setInterval, асинхронные функции, await
 ********************************************/

/*
Асинхронные функции позволяют выполнять действия пошагово с задержкой.
setInterval можно использовать для визуализации "процесса загрузки".
*/

async function simulateLoading() {
    console.log("Начало загрузки...");

    let progress = 0;

    // оборачиваем setInterval в Promise для управления остановкой
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            progress += 10;
            console.log(`Загрузка: ${progress}%`);

            if (progress >= 100) {
                clearInterval(interval);
                resolve();
            }
        }, 500); // каждые 0.5 секунды
    });

    console.log("Загрузка завершена ✅");
}

// Запуск симуляции:
simulateLoading();
