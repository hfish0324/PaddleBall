var canvas, context, ball, player, timer, interval = 1000 / 60;
var frictionX = 1;
var frictionY = 1;
var gravity = 0.3;

var Score = 0;

var d = false;
var a = false;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

context.font = "bold 40px Arial";
context.fillStyle = "black";

ball = new GameObject(canvas.width / 2, canvas.height / 2, 80, 80, "#ff0000");
player = new GameObject(canvas.width / 2, 700, 190, 40);

ball.vx = 0;
ball.vy = 0;
ball.jumpSpeed = -20;

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

    if (ball.x < 0 + ball.width / 2)
    {
        ball.vx *= -1;
        ball.x++;
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
            player.vx += player.ax * -player.force;
        }
    }

    if (ball.collisionCheck(player))
    {
        // Outer Left
        if (ball.x < player.x - player.width / 3)
        {
            console.log("Outer Left");
            ball.vy = -10;
            ball.vx = ball.force * -5;
            Score++;
        }
        // Inner Left
        else if (ball.x < player.x - player.width / 6)
        {
            console.log("Inner Left");
            ball.vy = -10;
            ball.vx = ball.force * -2.5;
            Score++;
        }
        // Middle
        else if (ball.x < player.x + player.width / 6)
        {
            console.log("Center");
            ball.vy = -10;
            ball.vx = ball.force * 0;
            Score++;
        }
        // Inner Right
        else if (ball.x < player.x + player.width / 3)
        {
            console.log("Inner Right");
            ball.vy = -10;
            ball.vx = ball.force * 2.5;
            Score++;
        }
        // Outer Right
        else
        {
            console.log("Outer Right");
            ball.vy = -10;
            ball.vx = ball.force * 5;
            Score++;
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
        }
    }

    function doApplyFriction()
    {
        player.vx *= 0.93;
    }

    context.beginPath();
    context.moveTo(ball.x, ball.y);
    context.lineTo(player.x, player.y);
    context.closePath();
    context.lineWidth = 6;
    context.stroke();

    ball.drawCircle();
    player.drawRect();
}