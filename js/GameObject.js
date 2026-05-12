function GameObject(x, y, width, height, color) {

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.vx = 0;
    this.vy = 0;

    this.ax = 0;
    this.ay = 0;

    this.color = color;
}

GameObject.prototype.update = function(deltaTime) {

    // Apply acceleration
    this.vx = this.vx + this.ax;
    this.vy = this.vy + this.ay;

    // Update position
    this.x = this.x + this.vx * deltaTime;
    this.y = this.y + this.vy * deltaTime;
};

GameObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
};

GameObject.prototype.collidesWith = function(other) {

    if (this.x < other.x + other.width &&
        this.x + this.width > other.x &&
        this.y < other.y + other.height &&
        this.y + this.height > other.y) {

        return true;
    }

    return false;
};