var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var lastTime = 0;

var gravity = 0.4;
var friction = 0.99;
var stringLength = 150;

var score = 0;   // NEW

   // Paddle 

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

   // Ball

function Ball(x, y) {
    GameObject.call(this, x, y, 20, 20, "red");
}

Ball.prototype = Object.create(GameObject.prototype);

Ball.prototype.update = function(deltaTime) {

    this.ay = gravity;

    GameObject.prototype.update.call(this, deltaTime);

    this.vx = this.vx * friction;
    this.vy = this.vy * friction;

      
    // Paddle Collision
    
   if (
    this.x < paddle.x + paddle.width &&
    this.x + this.width > paddle.x &&
    this.y < paddle.y + paddle.height &&
    this.y + this.height > paddle.y
) {
    // place ball above paddle
    this.y = paddle.y - this.height;

    // stronger bounce upward
    this.vy = -Math.abs(this.vy) * 1.2;

    // small extra lift so it doesn't stick
    this.vy -= 2;

    // horizontal influence
    this.vx += paddle.vx * 0.5;

    // Score increase
    score++;
}

       // Anchor point 

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

    // Loss Condition
    if (this.y > canvas.height) {

        // reset position
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 80 - stringLength;

        // reset velocity
        this.vx = 0;
        this.vy = 0;

        // reset score
        score = 0;
    }
};

   // Setup

var paddle = new Paddle(canvas.width / 2 - 60, canvas.height - 80);

var ball = new Ball(
    canvas.width / 2 - 10,
    canvas.height - 80 - stringLength
);

   // Update

function update(deltaTime) {
    paddle.update(deltaTime);
    ball.update(deltaTime);
}

   // Draw

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

    // Score Counter
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 20, 30);
}

   // Loop

function gameLoop(timestamp) {

    var deltaTime = (timestamp - lastTime) / 16;
    lastTime = timestamp;

    update(deltaTime);
    draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);