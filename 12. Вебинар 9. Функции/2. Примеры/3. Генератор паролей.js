/********************************************
 * Мини-проект 3: ГЕНЕРАТОР ПАРОЛЕЙ
 * Тема: функции, строки, циклы, случайные числа
 ********************************************/

/*
Цель:
  Научиться использовать цикл и случайные значения для генерации строки.
  Понять работу со строками и массивами символов.
*/

function generatePassword(length = 10, includeSymbols = true) {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}<>?";

    // создаём "набор" символов для выбора
    let chars = letters + numbers;
    if (includeSymbols) chars += symbols;

    let password = "";

    // цикл создаёт строку заданной длины
    for (let i = 0; i < length; i++) {
        const m = Math.random() * chars.length
        // console.log(m)
        let randomIndex = Math.floor(m);
        // console.log(randomIndex)

        password += chars[randomIndex];

        // console.log(chars[randomIndex])
        // console.log("------")
    }

    return password;
}

// Примеры использования:
console.log("Пароль (10 символов):", generatePassword(10));
console.log("Пароль без символов:", generatePassword(8, false));
console.log("Пароль (16 символов):", generatePassword(16));
