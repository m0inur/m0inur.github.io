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
    // if (ball.location.y - ball.radius - 3 <= this.location.y + this.height &&
    //   ball.location.y + ball.radius >= this.location.y &&
    //     ball.location.x + ball.radius >= this.location.x &&
    //     ball.location.x - ball.radius - 3 <= this.location.x + this.width) {
    //   // ball.reverse('y')
    //   return true
    // }

    // if (hit) {
    //   return true;
    // }
    // var x1 = this.location.x + this.width * 0.01;
    // var y1 = this.location.y + this.width * 0.01;
    // var x2 = ball.location.x + ball.radius * 0.01;
    // var y2 = ball.location.y + ball.radius * 0.01;

    var hit = c.collideRectRect(this.location.x - 10, this.location.y + 5, this.width, this.height, ball.location.x, ball.location.y, ball.radius, ball.radius);
    if (hit) {
      return true;
    }

  }
}