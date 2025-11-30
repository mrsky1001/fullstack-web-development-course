    const game = document.getElementById("game");
    const scoreElem = document.getElementById("score");
    const levelElem = document.getElementById("level");
    const startBtn = document.getElementById("startBtn");

    let score = 0;
    let level = 1;
    let spawnInterval = 1200;
    let monsterLife = 1500;
    let gameLoop;

    function startGame() {
        resetGame();

        gameLoop = setInterval(() => {
            createMonster();
        }, spawnInterval);
    }

    function resetGame() {
    score = 0;
    level = 1;
    spawnInterval = 1200;
    monsterLife = 1500;
    scoreElem.textContent = score;
    levelElem.textContent = level;

    // Удаляем всех монстров
    game.innerHTML = "";
}

    function createMonster() {
    const monster = document.createElement("div");
    monster.classList.add("monster");

    // 10% шанс на красного монстра
    const isRed = Math.random() < 0.1;
    monster.classList.add(isRed ? "red" : "normal");

    // Случайная позиция
    monster.style.left = Math.random() * 90 + "vw";
    monster.style.top = Math.random() * 90 + "vh";

    // Размер уменьшается с уровнями
    const size = 50 - level * 3;
    monster.style.width = size + "px";
    monster.style.height = size + "px";

    // Добавляем на сцену
    game.appendChild(monster);

    // Если игрок кликнул по монстру
    monster.addEventListener("click", () => {
    if (isRed) {
    score += 3;
} else {
    score += 1;
}

    scoreElem.textContent = score;
    monster.remove();

    checkLevelUp();
});

    // Если игрок не успел — удаляем
    setTimeout(() => {
    if (game.contains(monster)) {
    monster.remove();
}
}, monsterLife);
}

    function checkLevelUp() {
    if (score !== 0 && score % 10 === 0) {
    level++;
    levelElem.textContent = level;

    // Усложняем игру
    spawnInterval = Math.max(300, spawnInterval - 100);
    monsterLife = Math.max(400, monsterLife - 80);

    clearInterval(gameLoop);
    gameLoop = setInterval(() => {
    createMonster();
}, spawnInterval);
}
}

    startBtn.addEventListener("click", () => {
    clearInterval(gameLoop);
    startGame();
});
