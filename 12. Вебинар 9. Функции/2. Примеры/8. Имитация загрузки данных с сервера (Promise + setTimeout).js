/********************************************
 * Мини-проект 1: ИМИТАЦИЯ ЗАГРУЗКИ ДАННЫХ
 * Тема: Promise, setTimeout, асинхронность
 ********************************************/

/*
Promise (обещание) — это объект, который представляет результат
асинхронной операции. Он может быть:
  - pending (ожидание)
  - fulfilled (выполнено)
  - rejected (отклонено)

setTimeout имитирует задержку сети при запросе данных.
*/

function fetchData() {
    return new Promise((resolve, reject) => {
        console.log("Запрос данных с сервера...");

        setTimeout(() => {
            const success = Math.random() > 0.2; // случайный успех/ошибка

            if (success) {
                resolve({ id: 1, name: "Тестовый пользователь", age: 25 });
            } else {
                reject("Ошибка соединения с сервером!");
            }
        }, 2000);
    });
}

// Использование Promise:
fetchData()
    .then(data => {
        console.log("Данные успешно получены:", data);
    })
    .catch(error => {
        console.log("Произошла ошибка:", error);
    })
    .finally(() => {
        console.log("Запрос завершён (успех или ошибка).");
    });
