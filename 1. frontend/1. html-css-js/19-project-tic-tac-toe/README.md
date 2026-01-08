# Проект 19: Крестики-нолики (Tic-Tac-Toe)

## 🎯 Цели проекта

После завершения этого проекта вы сможете:

- Применить знания **HTML, CSS и JavaScript** в комплексе
- Работать с **двумерными массивами** и **вложенными циклами**
- Реализовать **игровую логику** и **определение победителя**
- Обрабатывать **события кликов** и **обновлять интерфейс**
- Управлять **состоянием игры**
- Создать **адаптивный интерфейс**

---

## 📚 Описание игры

**Крестики-нолики** — классическая игра для двух игроков на поле 3×3.

### Правила игры:

1. Игроки ходят по очереди
2. Первый игрок ставит **X**, второй — **O**
3. Цель — выстроить три своих символа в ряд (по горизонтали, вертикали или диагонали)
4. Если все клетки заполнены и никто не выиграл — **ничья**

### Победные комбинации:

```
Горизонтали:     Вертикали:       Диагонали:
[0][1][2]        [0]   [3]   [6]  [0]       [2]
                 |     |     |       \     /
[3][4][5]        [1]   [4]   [7]        [4]
                 |     |     |       /     \
[6][7][8]        [2]   [5]   [8]  [6]       [8]
```

---

## 🛠 Структура проекта

```
19-project-tic-tac-toe/
│
├── README.md                # Этот файл
├── examples/
│   ├── step-1-html/         # Шаг 1: HTML-структура
│   ├── step-2-css/          # Шаг 2: Стили
│   ├── step-3-basic-js/     # Шаг 3: Базовый JS
│   ├── step-4-win-logic/    # Шаг 4: Логика победы
│   └── complete/            # Полное решение
├── practice/
│   ├── starter/             # Стартовый шаблон
│   └── advanced/            # Продвинутые задания
└── assets/
    └── images/
```

---

## 📋 Пошаговая реализация

### Шаг 1: HTML-структура

Создайте базовую разметку игры:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Крестики-нолики</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="game">
        <h1>Крестики-нолики</h1>
        
        <!-- Статус игры -->
        <div class="game-status">
            Ход игрока: <span id="current-player">X</span>
        </div>
        
        <!-- Игровое поле -->
        <div class="game-board" id="board">
            <div class="cell" data-index="0"></div>
            <div class="cell" data-index="1"></div>
            <div class="cell" data-index="2"></div>
            <div class="cell" data-index="3"></div>
            <div class="cell" data-index="4"></div>
            <div class="cell" data-index="5"></div>
            <div class="cell" data-index="6"></div>
            <div class="cell" data-index="7"></div>
            <div class="cell" data-index="8"></div>
        </div>
        
        <!-- Кнопка перезапуска -->
        <button id="restart-btn" class="btn">Начать заново</button>
        
        <!-- Счёт -->
        <div class="score-board">
            <div class="score">X: <span id="score-x">0</span></div>
            <div class="score">Ничья: <span id="score-draw">0</span></div>
            <div class="score">O: <span id="score-o">0</span></div>
        </div>
    </main>
    
    <script src="script.js"></script>
</body>
</html>
```

### Шаг 2: CSS-стили

```css
/* Основные стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game {
    text-align: center;
    background: white;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

/* Статус игры */
.game-status {
    font-size: 1.5rem;
    margin-bottom: 20px;
    color: #555;
}

#current-player {
    font-weight: bold;
    color: #667eea;
}

/* Игровое поле */
.game-board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
    margin: 0 auto 20px;
}

.cell {
    background: #f0f0f0;
    border: 2px solid #ddd;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.cell:hover {
    background: #e0e0e0;
    transform: scale(1.05);
}

.cell.x {
    color: #667eea;
}

.cell.o {
    color: #e74c3c;
}

.cell.winner {
    background: #d4edda;
    animation: pulse 0.5s infinite alternate;
}

@keyframes pulse {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}

/* Кнопка */
.btn {
    padding: 12px 30px;
    font-size: 1rem;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background: #5567d5;
    transform: translateY(-2px);
}

/* Счёт */
.score-board {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
}

.score {
    font-size: 1.2rem;
    color: #555;
}
```

### Шаг 3: JavaScript — Базовая логика

```javascript
// ==============================================
// КРЕСТИКИ-НОЛИКИ: ИГРОВАЯ ЛОГИКА
// ==============================================

// --- СОСТОЯНИЕ ИГРЫ ---
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

// --- DOM ЭЛЕМЕНТЫ ---
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('current-player');
const restartBtn = document.getElementById('restart-btn');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');

// --- ПОБЕДНЫЕ КОМБИНАЦИИ ---
const winningConditions = [
    [0, 1, 2], // верхняя горизонталь
    [3, 4, 5], // средняя горизонталь
    [6, 7, 8], // нижняя горизонталь
    [0, 3, 6], // левая вертикаль
    [1, 4, 7], // центральная вертикаль
    [2, 5, 8], // правая вертикаль
    [0, 4, 8], // главная диагональ
    [2, 4, 6]  // побочная диагональ
];

// --- ОБРАБОТКА ХОДА ---
function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));
    
    // Проверяем, можно ли сделать ход
    if (board[index] !== '' || !isGameActive) {
        return;
    }
    
    // Делаем ход
    makeMove(cell, index);
    
    // Проверяем результат
    checkResult();
}

function makeMove(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

// --- ПРОВЕРКА РЕЗУЛЬТАТА ---
function checkResult() {
    let roundWon = false;
    let winningCells = [];
    
    // Проверяем все победные комбинации
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }
    
    if (roundWon) {
        handleWin(winningCells);
        return;
    }
    
    // Проверяем ничью
    if (!board.includes('')) {
        handleDraw();
        return;
    }
    
    // Меняем игрока
    switchPlayer();
}

function handleWin(winningCells) {
    isGameActive = false;
    statusDisplay.textContent = `${currentPlayer} победил!`;
    scores[currentPlayer]++;
    updateScoreDisplay();
    
    // Подсвечиваем победные клетки
    winningCells.forEach(index => {
        cells[index].classList.add('winner');
    });
}

function handleDraw() {
    isGameActive = false;
    statusDisplay.textContent = 'Ничья!';
    scores.draw++;
    updateScoreDisplay();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = currentPlayer;
}

// --- ОБНОВЛЕНИЕ СЧЁТА ---
function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

// --- ПЕРЕЗАПУСК ИГРЫ ---
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = currentPlayer;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
}

// --- ИНИЦИАЛИЗАЦИЯ ---
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
```

---

## ✅ Обязательные требования

### Функционал:
- [ ] Игровое поле 3×3
- [ ] Два игрока: X и O
- [ ] Отображение символа при клике
- [ ] Смена игрока после каждого хода
- [ ] Определение победителя
- [ ] Определение ничьей
- [ ] Подсветка победной линии
- [ ] Кнопка "Начать заново"
- [ ] Отображение текущего игрока

### Технические:
- [ ] Чистый, комментированный код
- [ ] Адаптивный дизайн
- [ ] Визуальная обратная связь (hover, анимации)
- [ ] Нет ошибок в консоли

---

## 🚀 Дополнительные задания (для продвинутых)

### Уровень 1:
1. **Счёт побед** — вести статистику X, O, ничьих
2. **Анимации** — плавное появление символов
3. **Звуки** — звук хода и победы

### Уровень 2:
4. **Выбор символа** — X или O для первого игрока
5. **Таймер хода** — ограничение времени на ход
6. **История ходов** — возможность отката

### Уровень 3:
7. **Игра с компьютером** — простой ИИ (случайные ходы)
8. **Умный ИИ** — алгоритм Minimax
9. **Поле 4×4** — расширенное игровое поле

---

## 💡 Подсказки

### Как хранить состояние поля?

```javascript
// Массив из 9 элементов
// Индексы соответствуют клеткам:
// [0][1][2]
// [3][4][5]
// [6][7][8]
let board = ['', '', '', '', '', '', '', '', ''];

// После нескольких ходов:
board = ['X', '', 'O', '', 'X', '', 'O', '', ''];
```

### Как определить победителя?

```javascript
// Все победные комбинации (индексы массива board)
const wins = [
    [0, 1, 2], // верх
    [3, 4, 5], // середина
    [6, 7, 8], // низ
    [0, 3, 6], // левый столбец
    [1, 4, 7], // центральный столбец
    [2, 5, 8], // правый столбец
    [0, 4, 8], // диагональ \
    [2, 4, 6]  // диагональ /
];

// Проверка
function checkWin(player) {
    return wins.some(combination => {
        return combination.every(index => {
            return board[index] === player;
        });
    });
}
```

### Как определить ничью?

```javascript
function checkDraw() {
    return board.every(cell => cell !== '');
}
```

---

## 🏆 Критерии оценки

### Базовый уровень (обязательно):
- Работающая игра для двух игроков
- Определение победителя и ничьей
- Возможность перезапуска

### Хороший уровень:
- Стильный дизайн
- Анимации и визуальная обратная связь
- Ведение счёта

### Отличный уровень:
- Игра с компьютером
- Адаптивность для мобильных
- Дополнительные функции

---

## 📚 Полезные ссылки

- [Алгоритм Minimax](https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%BA%D1%81)
- [CSS Grid — MDN](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Grid_Layout)
- [События DOM — MDN](https://developer.mozilla.org/ru/docs/Web/API/Element/click_event)

---

## 🎮 Результат

После выполнения проекта у вас будет полноценная игра "Крестики-нолики", которую можно:
- Добавить в портфолио
- Показывать как пример работы с JavaScript
- Развивать дальше (игра с ИИ, сетевая игра)
