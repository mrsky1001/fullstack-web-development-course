
const board = document.getElementById('board') //доска
const statusDiv = document.getElementById('status')

let currentPlayer = 'X'
// Создаём 3x3 массив для состояния поля (пустые строки)
const gameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
]

let movesCount = 0
let gameOver = false

// Функция для проверки победы
function checkWinner() {
    // Проверяем строки
    for (let i = 0; i < 3; i++) {
        if (
            gameState[i][0] !== '' &&
            gameState[i][0] === gameState[i][1] &&
            gameState[i][1] === gameState[i][2]
        ) {
            return gameState[i][0]
        }
    }

    // Проверяем столбцы
    for (let j = 0; j < 3; j++) {
        if (
            gameState[0][j] !== '' &&
            gameState[0][j] === gameState[1][j] &&
            gameState[1][j] === gameState[2][j]
        ) {
            return gameState[0][j]
        }
    }

    // Проверяем диагонали
    if (
        gameState[0][0] !== '' &&
        gameState[0][0] === gameState[1][1] &&
        gameState[1][1] === gameState[2][2]
    ) {
        return gameState[0][0]
    }

    if (
        gameState[0][2] !== '' &&
        gameState[0][2] === gameState[1][1] &&
        gameState[1][1] === gameState[2][0]
    ) {
        return gameState[0][2]
    }

    return null
}

// Обработчик клика по ячейке
function cellClick(event) {
    if (gameOver) return

    const target = event.target
    const row = parseInt(target.getAttribute('lib-row'))
    const col = parseInt(target.getAttribute('lib-col'))

    // Проверяем, пустая ли ячейка
    if (gameState[row][col] !== '') {
        return // Уже занята
    }

    // Ставим символ текущего игрока
    gameState[row][col] = currentPlayer
    target.textContent = currentPlayer
    movesCount++

    // Проверяем победу
    const winner = checkWinner()

    if (winner) {
        statusDiv.textContent = `Победил игрок ${winner}! 🎉`
        gameOver = true
        return
    }

    // Проверяем ничью
    if (movesCount === 9) {
        statusDiv.textContent = 'Ничья! ♾️'
        gameOver = true
        return
    }

    // Меняем игрока
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusDiv.textContent = `Ходит: ${currentPlayer}`
}

// Назначаем обработчики всем ячейкам
const cells = board.getElementsByTagName('td')
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', cellClick)
}