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