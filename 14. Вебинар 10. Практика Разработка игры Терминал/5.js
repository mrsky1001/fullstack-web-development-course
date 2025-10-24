const readline = require("readline");

// Интерфейс ввода/вывода в терминале
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Настройки игры
const MAX_ATTEMPTS = 3;      // Количество попыток
const WORD_LENGTH = 7;       // Длина каждого слова
const DISPLAY_ROWS = 6;      // Количество строк на колонку

// Список русских слов (ровно 7 букв каждое)
const wordList = [
    "АРХИВЫ", "ПАРОЛЬ", "КОМАНД", "СЕТЕВОЙ", "ПОИСКИ", "ОБНОВКА",
    "РАЗГОН", "ЗАЩИТА", "ЗАПУСК", "РЕЗЕРВ", "СИСТЕМА", "КОНТРОЛ",
    "ШИФРОВ", "ФАЙЛОВ", "РЕГИСТР", "ОТКАЗЫ", "ЗАВОДЫ", "ПАКЕТЫ"
];

// Возвращает случайный элемент массива
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


// Создаёт структуру для отображения двух колонок
function createTerminalDisplay(words) {
    const columnA = [];
    const columnB = [];

    for (let i = 0; i < DISPLAY_ROWS * 2; i++) {
        const word = words[i];
        const address = (0xA000 + i * 0x10).toString(16).toUpperCase();

        const entry = { address, word };
        if (i % 2 === 0) {
            columnA.push(entry);
        } else {
            columnB.push(entry);
        }
    }

    return [columnA, columnB];
}

// Печатает колонки в терминале
function printDisplay(columns) {
    console.log("\n💾 ТЕРМИНАЛ ЗАЩИЩЁН :: ВЕРСИЯ BIOS V2.3\n");

    for (let i = 0; i < DISPLAY_ROWS; i++) {
        const colA = columns[0][i];
        const colB = columns[1][i];

        const paddedA = colA.word.padEnd(10, ' ');
        const paddedB = colB.word.padEnd(10, ' ');

        console.log(`${colA.address}: ${paddedA}    ${colB.address}: ${paddedB}`);
    }
}


// Основная функция запуска игры
async function startGame() {
    // Выбираем 12 случайных уникальных слов
    const selectedWords = [];
    while (selectedWords.length < DISPLAY_ROWS * 2) {
        const word = getRandomItem(wordList);
        if (!selectedWords.includes(word)) {
            selectedWords.push(word);
        }
    }

    // Выбираем одно из них как правильный пароль
    const correctWord = getRandomItem(selectedWords);

    // Создаём отображение терминала
    const display = createTerminalDisplay(selectedWords);

    // Показываем интерфейс игроку
    printDisplay(display);


    let attempts = MAX_ATTEMPTS;

    // Игровой цикл
    while (attempts > 0) {
        const input = await ask(`\n🔐 Введите слово (кол. попыток: ${attempts}): `);
        const guess = input.trim().toUpperCase();

        // Проверка: слово должно быть из списка
        if (!selectedWords.includes(guess)) {
            console.log("⛔ Такого слова нет в терминале. Попробуйте из списка выше.");
            continue;
        }

        // Победа
        if (guess === correctWord) {
            console.log("\n✅ ДОСТУП РАЗРЕШЁН! Вы успешно взломали терминал.");
            rl.close();
            return;
        }

        // Подсчёт совпадений
        const matchCount = getMatches(guess, correctWord);
        console.log(`❌ Неверно. Совпадений по позиции: ${matchCount}`);
        attempts--;
    }

    // Если попытки закончились
    console.log(`\n🔒 Терминал заблокирован. Правильный пароль был: ${correctWord}`);
    rl.close();
}

// Запускаем игру
startGame();
