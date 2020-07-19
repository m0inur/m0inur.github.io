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
    // collide with brick
    if (ball.location.y - ball.radius + 20 <= this.location.y + this.height &&
      ball.location.y + ball.radius >= this.location.y &&
      ball.location.x + ball.radius >= this.location.x &&
      ball.location.x - ball.radius + 20 <= this.location.x + this.width) {
      return true
    }
  }
}