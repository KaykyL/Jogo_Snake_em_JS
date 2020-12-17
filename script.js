let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let scoreText = document.getElementById("score")

let score = 0
let trueScore = 0
let scoreColor = 0
let scoreSize = 100

let gameOverScreen = document.getElementById("gameover-screen")
let gameOverTitle = document.getElementById("gameover-title")

let scoreTitle = document.getElementById("score-title")
let gameTitle = document.getElementById("title")
let gameTitleColorR = 255
let gameTitleColorG = 166
let gameTitleColorB = 0

let box = 32
let snake = []
let eatInterval


snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "stopped";

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function makeBG() {
    context.fillStyle = "lightgrey"
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function createSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'orange'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = "dimgray"
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left'
    if (event.keyCode == 38 && direction != 'down') direction = 'up'
    if (event.keyCode == 39 && direction != 'left') direction = 'right'
    if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function eat() {
    clearInterval(eatInterval)
    trueScore += 10


    scoreColor = 255
    scoreSize = 135
    gameTitleColorR = 255
    gameTitleColorG = 255
    gameTitleColorB = 0
    eatInterval = setInterval(updateScore, 100)
}

function updateScore() {
    score = lerp(score, trueScore + 2, 0.1)
    scoreColor = lerp(scoreColor, 0, 0.1)
    gameTitleColorR = lerp(gameTitleColorR, 255, 0.1)
    gameTitleColorG = lerp(gameTitleColorG, 166, 0.1)
    gameTitleColorB = lerp(gameTitleColorB, 0, 0.1)
    scoreSize = lerp(scoreSize, 100, 0.1)

    scoreText.innerHTML = Math.floor(score).toString()
    scoreText.style["font-size"] = scoreSize + "px"
    scoreText.style["color"] = "rgba(" + scoreColor + ", " + scoreColor + ", " + scoreColor + ", " + 1 + ")"
    scoreTitle.style["color"] = "rgba(" + scoreColor + ", " + scoreColor + ", " + scoreColor + ", " + 1 + ")"
    gameTitle.style["color"] = "rgba(" + gameTitleColorR + ", " + gameTitleColorG + ", " + gameTitleColorB + ", " + 1 + ")"

    if (score >= trueScore) {
        clearInterval(eatInterval)
    }
}

function resetScore() {
    score = lerp(score, -3, 0.3);
    if (score <= 1) score = 0
    scoreColor = lerp(scoreColor, 0, 0.2)
    scoreSize = lerp(scoreSize, 100, 0.2)

    scoreText.innerHTML = Math.floor(score).toString()
    scoreText.style["font-size"] = scoreSize + "px"
    scoreText.style["color"] = "rgba(" + scoreColor + ", " + scoreColor + ", " + scoreColor + ", " + 1 + ")"

    if (score == 0) {
        clearInterval(eatInterval)
    }
}

function startGame() {
    resumeGame()
    if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            gameOver()
        }
    }

    makeBG()
    createSnake()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y


    if (direction == "right") snakeX += box
    if (direction == "left") snakeX -= box
    if (direction == "up") snakeY -= box
    if (direction == "down") snakeY += box


    if (snakeX != food.x || snakeY != food.y) {
        snake.pop()
    } else {
        eat()
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    console.log(snake[0])
}



function restartGame() {

    clearInterval(game);
    clearInterval(eatInterval)
    eatInterval = setInterval(resetScore, 100)

    for (i = snake.length - 1; i > 0; i--) {
        snake.pop()
    }

    snake[0].x = 8 * box
    snake[0].y = 8 * box

    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box

    trueScore = 0

    direction = "stopped"

    game = setInterval(startGame, 100);

    resumeGame()
}

function gameOver() {
    gameOverScreen.style['width'] = 700 + "px"
    gameOverTitle.style['color'] = "white"
}

function resumeGame() {
    gameOverScreen.style['width'] = 0 + "px"
    gameOverTitle.style['color'] = "transparent"
}

let game = setInterval(startGame, 100);