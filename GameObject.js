function GameObject(x, y, width, height, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0.5;
    this.force = 1;

    this.color = color;

    this.move = function()
    {
        this.x += this.vx;
        this.y += this.vy;
    };

    this.drawRect = function()
    {
        context.fillStyle = this.color;
        context.fillRect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    };

    this.drawCircle = function()
    {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.width / 2, 0, Math.PI * 2);
        context.fill();
    };

    this.collisionCheck = function(obj)
    {
        return (
            this.x < obj.x + obj.width / 2 &&
            this.x > obj.x - obj.width / 2 &&
            this.y < obj.y + obj.height / 2 &&
            this.y > obj.y - obj.height / 2
        );
    };
}