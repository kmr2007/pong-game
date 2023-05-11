// Pong Game https://www.youtube.com/watch?v=nl0KXCa5pJk

//Set up Canvas
const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
canvas.width = "600";
canvas.height = "400";

// Global Variables and Constants
const user = {
  x: 0,
  y: canvas.height / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};
const com = {
  x: canvas.width - 10,
  y: canvas.height / 2 - 100 / 2,
  width: 10,
  height: 100,
  color: "WHITE",
  score: 0,
};
const net = {
  x: canvas.width / 2 - 2 / 2,
  y: 0,
  width: 2,
  height: 10,
  color: "WHITE",
};
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 5,
  velocityX: 5,
  velocityY: 5,
  color: "WHITE",
};
const framePerSecond = 50;
let computerLevel = 0.05;

//Set Interval
setInterval(game, 1000 / framePerSecond);

// Event Listeners
document.getElementById("easy-btn").addEventListener("click", easyBtnClicked);
document
  .getElementById("normal-btn")
  .addEventListener("click", normalBtnClicked);
document.getElementById("hard-btn").addEventListener("click", hardBtnClicked);

// Functions
function drawRect(x, y, w, h, color) {
  context.fillStyle = color;
  context.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, Math.PI * 2, false);
  context.closePath();
  context.fill();
}
function drawNet() {
  for (let i = 0; i <= canvas.height; i += 15) {
    drawRect(net.x, net.y + i, net.width, net.height, net.color);
  }
}
function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = "75px fantasy";
  context.fillText(text, x, y);
}
function render() {
  drawRect(0, 0, canvas.width, canvas.height, "BLACK");
  drawRect(user.x, user.y, user.width, user.height, user.color);
  drawRect(com.x, com.y, com.width, com.height, com.color);
  drawCircle(ball.x, ball.y, ball.radius, ball.color);
  drawNet();
  drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
  drawText(com.score, (3 * canvas.width) / 4, canvas.height / 5, "WHITE");
}
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.speed = 5;
  ball.velocityX = -ball.velocityX;
}
function update() {
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.velocityY = -ball.velocityY;
  }
  let player = ball.x < canvas.width / 2 ? user : com;
  if (collision(ball, player)) {
    let collidePoint = ball.y - (player.y + player.height / 2);
    collidePoint = collidePoint / (player.height / 2);
    let angleRad = (Math.PI / 4) * collidePoint;
    let direction = ball.x < canvas.width / 2 ? 1 : -1;
    ball.velocityX = direction * ball.speed * Math.cos(angleRad);
    ball.velocityY = direction * ball.speed * Math.sin(angleRad);

    ball.speed += 0.1;
  }

  if (ball.x - ball.radius < 0) {
    com.score++;
    resetBall();
  } else if (ball.x + ball.radius > canvas.width) {
    user.score++;
    resetBall();
  }

  com.y += (ball.y - (com.y + com.height / 2)) * computerLevel;
  user.y += (ball.y - (user.y + user.height / 2)) * computerLevel;
}
function collision(b, p) {
  p.top = p.y;
  p.bottom = p.y + p.height;
  p.left = p.x;
  p.right = p.x + p.width;

  b.top = b.y - b.radius;
  b.bottom = b.y + b.radius;
  b.left = b.x - b.radius;
  b.right = b.x + b.radius;

  return (
    b.right > p.left && b.top < p.bottom && b.left < p.right && b.bottom > p.top
  );
}
function game() {
  update();
  render();
}


// Difficulty Buttons
function easyBtnClicked() {
  document.getElementById("easy-btn").classList.add("active");
  document.getElementById("normal-btn").classList.remove("active");
  document.getElementById("hard-btn").classList.remove("active");

  computerLevel = 0.05;
}

function normalBtnClicked() {
  document.getElementById("easy-btn").classList.remove("active");
  document.getElementById("normal-btn").classList.add("active");
  document.getElementById("hard-btn").classList.remove("active");

  computerLevel = 0.075;
}

function hardBtnClicked() {
  document.getElementById("easy-btn").classList.remove("active");
  document.getElementById("normal-btn").classList.remove("active");
  document.getElementById("hard-btn").classList.add("active");

  computerLevel = 0.1;
}
