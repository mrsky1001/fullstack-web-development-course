/********************************************
 * Мини-проект 1: СЧЁТЧИК КЛИКОВ (замыкание)
 * Тема: функции, область видимости, замыкания
 ********************************************/

/*
Замыкание — это функция, которая «помнит» контекст,
в котором была создана, даже после его завершения.
Здесь счётчик хранит своё внутреннее состояние.
*/

let countGlobal = 0

function clicker (){
    countGlobal ++
}


clicker() // countGlobal = 1
clicker() // countGlobal = 2
clicker() // countGlobal = 3

//-------------------------------------


function createClickCounter() {
    let count = 0; // локальная переменная (недоступна снаружи)

    return function () {
        count++; // увеличиваем внутренний счётчик
        console.log("Количество кликов:", count);
        return count
    };
}

// создаём независимый экземпляр счётчика
const clickCounter = createClickCounter();

// имитация кликов:
clickCounter(); // 1
clickCounter(); // 2
clickCounter(); // 3
