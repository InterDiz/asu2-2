const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startButton = document.getElementById('startButton');

const cellSize = 20;
const cellCount = canvas.width / cellSize;

let snake;
let food;
let direction;
let nextDirection;
let score;
let timer;

function startGame() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  food = { x: 14, y: 10 };
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  scoreElement.textContent = score;

  clearInterval(timer);
  timer = setInterval(gameStep, 150);
  drawGame();
}

function gameStep() {
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  if (isGameOver(head)) {
    clearInterval(timer);
    alert('Игра окончена! Счет: ' + score);
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreElement.textContent = score;
    placeFood();
  } else {
    snake.pop();
  }

  drawGame();
}

function isGameOver(head) {
  const hitWall = head.x < 0 || head.x >= cellCount || head.y < 0 || head.y >= cellCount;
  const hitSnake = snake.some(part => part.x === head.x && part.y === head.y);

  return hitWall || hitSnake;
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cellCount),
    y: Math.floor(Math.random() * cellCount)
  };

  const foodOnSnake = snake.some(part => part.x === food.x && part.y === food.y);

  if (foodOnSnake) {
    placeFood();
  }
}

function drawGame() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#ef4444';
  context.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);

  context.fillStyle = '#22c55e';
  snake.forEach(part => {
    context.fillRect(part.x * cellSize, part.y * cellSize, cellSize - 1, cellSize - 1);
  });
}

function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction.y !== 1) {
    nextDirection = { x: 0, y: -1 };
  }

  if (event.key === 'ArrowDown' && direction.y !== -1) {
    nextDirection = { x: 0, y: 1 };
  }

  if (event.key === 'ArrowLeft' && direction.x !== 1) {
    nextDirection = { x: -1, y: 0 };
  }

  if (event.key === 'ArrowRight' && direction.x !== -1) {
    nextDirection = { x: 1, y: 0 };
  }
}

document.addEventListener('keydown', changeDirection);
startButton.addEventListener('click', startGame);

startGame();
