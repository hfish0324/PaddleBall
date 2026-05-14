var canvas, context, ball, player, timer, interval = 1000 / 60;
var frictionX = 1;
var frictionY = 1;
var gravity = 0.3;

var Score = 0;

var a = false;
var d = false;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

context.font = "bold 40px Arial";
context.fillStyle = "black";

ball = new GameObject(canvas.width / 2, canvas.height / 2, 80, 80, "#ff0000");
player = new GameObject(canvas.width / 2, 700, 190, 40);

ball.vx = 0;
ball.vy = 0;

timer = setInterval(animate, interval);

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillText("Score: ", 50, 75);
    context.fillText(Score, 180, 76);

    doHandleAcceleration();
    doApplyFriction();
    doHandleGravity();
    doUpdatePosition();
    doCheckBottomBounds();

    ball.move();

    if (ball.x > canvas.width + ball.width / 2 - 100)
    {
        ball.vx *= -1;
    }

    if (ball.x < ball.width / 2)
    {
        ball.vx *= -1;
        ball.x = ball.width / 2;
    }

    if (ball.y > canvas.height + ball.height / 2 - 100)
    {
        ball.vy *= -1;
        Score = 0;
    }

    player.move();

    if (player.x < canvas.width / 2 - 400)
    {
        player.x = canvas.width / 2 - 400;
        if (player.vx < 0) player.vx = 0;
    }

    if (player.x > canvas.width / 2 + 400)
    {
        player.x = canvas.width / 2 + 400;
        if (player.vx > 0) player.vx = 0;
    }

    function doHandleAcceleration()
    {
        if (d)
        {
            player.vx += player.ax * player.force;
        }

        if (a)
        {
            player.vx -= player.ax * player.force;
        }
    }

    function doHandleGravity()
    {
        ball.vy += gravity;
    }

    function doUpdatePosition()
    {
        ball.x += ball.vx;
        ball.y += ball.vy;
    }

    function doCheckBottomBounds()
    {
        if (ball.y > canvas.height - ball.height / 2)
        {
            ball.vy *= -1;
            Score = 0;
        }
    }

    function doApplyFriction()
    {
        player.vx *= 0.93;
    }

    if (ball.collisionCheck(player))
    {
        if (ball.x < player.x - player.width / 3)
        {
            ball.vy = -10;
            ball.vx = ball.force * -5;
            Score++;
        }
        else if (ball.x < player.x - player.width / 6)
        {
            ball.vy = -10;
            ball.vx = ball.force * -2.5;
            Score++;
        }
        else if (ball.x < player.x + player.width / 6)
        {
            ball.vy = -10;
            ball.vx = 0;
            Score++;
        }
        else if (ball.x < player.x + player.width / 3)
        {
            ball.vy = -10;
            ball.vx = ball.force * 2.5;
            Score++;
        }
        else
        {
            ball.vy = -10;
            ball.vx = ball.force * 5;
            Score++;
        }
    }

    context.beginPath();
    context.moveTo(ball.x, ball.y);
    context.lineTo(player.x, player.y);
    context.lineWidth = 6;
    context.stroke();

    ball.drawCircle();
    player.drawRect();
}