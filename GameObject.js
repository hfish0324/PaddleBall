function GameObject(x, y, w, h, color)
{
    this.vx = 0;
    this.vy = 0;

    if (x == undefined)
    {
        this.x = canvas.width / 2;
    }
    else
    {
        this.x = x;
    }

    if (y == undefined)
    {
        this.y = canvas.height / 2;
    }
    else
    {
        this.y = y;
    }

    if (w == undefined)
    {
        this.width = 100;
    }
    else
    {
        this.width = w;
    }

    if (h == undefined)
    {
        this.height = 100;
    }
    else
    {
        this.height = h;
    }

    if (color == undefined)
    {
        this.color = "#ff0000";
    }
    else
    {
        this.color = color;
    }

    this.left = function() { return this.x - this.width / 2; };
    this.right = function() { return this.x + this.width / 2; };
    this.top = function() { return this.y - this.height / 2; };
    this.bottom = function() { return this.y + this.height / 2; };

    this.force = 1;
    this.ax = 1;
    this.ay = 1;

    this.drawCircle = function()
    {
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.translate(this.x, this.y);
        context.arc(0, 0, this.width / 2, 0, Math.PI * 2);
        context.closePath();
        context.fill();
        context.restore();
    };

    this.drawRect = function()
    {
        context.save();
        context.fillStyle = this.color;
        context.translate(this.x, this.y);
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    };

    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;
    };

    this.collisionCheck = function(obj)
    {
        return (
            this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top()
        );
    };
}