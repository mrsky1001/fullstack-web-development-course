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
}

// Запускаем игру
startGame();
