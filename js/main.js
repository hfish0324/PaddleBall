var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

let paddle = GameObject(350, 550, 100, 20);
paddle.speed = 0;

paddle.acceleration = 0.5;
paddle.friction = 0.9;

let ball = GameObject(400, 300, 20, 20);
ball.speedX = 5;
ball.speedY = 2;

ball.gravity = 0.1;

function drawPaddle() {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.beginPath();

    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function movePaddle() {
    if (keys['ArrowLeft']) {
        paddle.speed -= paddle.acceleration;
    }
    if (keys['ArrowRight']) {
        paddle.speed += paddle.acceleration;
    }
    paddle.speed *= paddle.friction;
    paddle.x += paddle.speed;

    // Prevent paddle from going out of bounds
    if (paddle.x < 0) {
        paddle.x = 0;
        paddle.speed = 0;
    }
    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
        paddle.speed = 0;
    }
}

function moveBall() {
    ball.speedY += ball.gravity;
    ball.x += ball.speedX;
    ball.y += ball.speedY;
}

function wallCollision() {
    if (ball.x + ball.radius > canvas.width) {
        ball.speedX *= -1;

    }
    if (ball.x - ball.radius < 0) {
        ball.speedX *= -1;
    }
    if (ball.y + ball.radius > canvas.height) {
        ball.speedY *= -1;
    }
}

function paddleCollision() {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y + ball.radius > paddle.y) {
        ball.speedY *= -1;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    movePaddle();
    moveBall();
    wallCollision();
    paddleCollision();
    drawPaddle();
    drawBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();