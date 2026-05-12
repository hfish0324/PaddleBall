var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var lastTime = 0;

var gravity = 0.4;
var friction = 0.99;
var stringLength = 150;

/* -------------------------
   PADDLE
--------------------------*/

function Paddle(x, y) {
    GameObject.call(this, x, y, 120, 20, "cyan");
    this.speed = 0.6;
}

Paddle.prototype = Object.create(GameObject.prototype);

Paddle.prototype.update = function(deltaTime) {

    this.ax = 0;

    if (keys["ArrowLeft"]) {
        this.ax = -this.speed;
    }

    if (keys["ArrowRight"]) {
        this.ax = this.speed;
    }

    if (keys["Shift"]) {
        this.ax = this.ax * 1.8;
    }

    GameObject.prototype.update.call(this, deltaTime);

    this.vx = this.vx * 0.9;

    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width)
        this.x = canvas.width - this.width;
};

/* -------------------------
   BALL
--------------------------*/

function Ball(x, y) {
    GameObject.call(this, x, y, 20, 20, "red");
}

Ball.prototype = Object.create(GameObject.prototype);

Ball.prototype.update = function(deltaTime) {

    this.ay = gravity;

    GameObject.prototype.update.call(this, deltaTime);

    this.vx = this.vx * friction;
    this.vy = this.vy * friction;

    // Anchor point (center of paddle top)
    var anchorX = paddle.x + paddle.width / 2;
    var anchorY = paddle.y;

    // Ball center
    var ballCenterX = this.x + this.width / 2;
    var ballCenterY = this.y + this.height / 2;

    var dx = ballCenterX - anchorX;
    var dy = ballCenterY - anchorY;

    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > stringLength) {

        var angle = Math.atan2(dy, dx);

        ballCenterX = anchorX + Math.cos(angle) * stringLength;
        ballCenterY = anchorY + Math.sin(angle) * stringLength;

        this.x = ballCenterX - this.width / 2;
        this.y = ballCenterY - this.height / 2;

        this.vx = this.vx * 0.8;
        this.vy = this.vy * 0.8;
    }
};

/* -------------------------
   SETUP
--------------------------*/

var paddle = new Paddle(canvas.width / 2 - 60, canvas.height - 80);
var ball = new Ball(
    canvas.width / 2 - 10,
    canvas.height - 80 - stringLength
);

/* -------------------------
   UPDATE
--------------------------*/

function update(deltaTime) {
    paddle.update(deltaTime);
    ball.update(deltaTime);
}

/* -------------------------
   DRAW
--------------------------*/

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw string
    ctx.beginPath();
    ctx.moveTo(
        paddle.x + paddle.width / 2,
        paddle.y
    );

    ctx.lineTo(
        ball.x + ball.width / 2,
        ball.y + ball.height / 2
    );

    ctx.strokeStyle = "black";
    ctx.stroke();

    paddle.draw(ctx);
    ball.draw(ctx);
}

/* -------------------------
   LOOP
--------------------------*/

function gameLoop(timestamp) {

    var deltaTime = (timestamp - lastTime) / 16;
    lastTime = timestamp;

    update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);