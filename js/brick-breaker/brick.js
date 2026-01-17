class Brick {
  constructor(location, width, height, color) {
    this.location = location
    this.width = width
    this.height = height
    this.color = color
    this.points = 1
  }

  display(c) {
    var squareColor = c.color(this.color);
    squareColor.setAlpha(254)
    c.fill(squareColor)
    c.noStroke();
    c.rect(this.location.x, this.location.y, this.width, this.height)
  }

  isColliding(c, ball) {
    var hit = c.collideRectRect(this.location.x - 10, this.location.y + 5, this.width, this.height, ball.location.x, ball.location.y, ball.radius, ball.radius);
    if (hit) {
      return true;
    }
  }

  isCollidingSideways(c, ball) {
    var brickX = this.location.x - 10;
    var brickY = this.location.y + 5;

    var brickRight = brickX + this.width;
    var brickBottom = brickY + this.height;
    var ballRight = ball.location.x + ball.radius;
    var ballBottom = ball.location.y + ball.radius;

    var overlapX = Math.min(ballRight, brickRight) - Math.max(ball.location.x, brickX);
    var overlapY = Math.min(ballBottom, brickBottom) - Math.max(ball.location.y, brickY);

    return overlapX <= overlapY;
  }
}
