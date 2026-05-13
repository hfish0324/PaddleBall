function GameObject(x, y, w, h, color)
{
    // Velocity
    this.vx = 0;
    this.vy = 0;

    // Set up X
    if (x == undefined)
    {
        this.x = canvas.width / 2;
    }
    else
    {
        this.x = x;
    }

    // Set up Y
    if (y == undefined)
    {
        this.y = canvas.height / 2;
    }
    else
    {
        this.y = y;
    }

    // Width Setup
    if (w == undefined)
    {
        this.width = 100;
    }
    else
    {
        this.width = w;
    }

    // Height Setup
    if (h == undefined)
    {
        this.height = 100;
    }
    else
    {
        this.height = h;
    }

    // Color Setup
    if (color == undefined)
    {
        this.color = color;
    }
    else
    {
        this.color = "#ff0000";
    }

    // Bounadries
    this.left = function()
    {
        return this.x - this.width / 2;
    };

    this.right = function()
    {
        return this.x + this.width / 2;
    };

    this.top = function()
    {
        return this.y - this.height / 2;
    };

    this.bottom = function()
    {
        return this.y + this.height / 2;
    };

    this.prevX = this.x;

    this.force = 1;
    this.ax = 1;
    this.ay = 1;

    this.drawCircle = function()
    {
        context.save();
        context.fillStyle = this.color;
        context.beginPath();
        context.translate(this.x, this.y);
        context.arc(0, 0, this.width / 2, 0, 360 * Math.PI / 180);
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
        if (
            this.left() < obj.right() &&
            this.right() > obj.left() &&
            this.top() < obj.bottom() &&
            this.bottom() > obj.top()
        )
        {
            return true;
        }

        return false;
    };
}