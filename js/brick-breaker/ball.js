class Ball {
  constructor(velocity, c, paddle) {
    this.radius = 25
    this.size = this.radius * 2
    this.location = c.createVector(paddle.location.x + (paddle.width / 2), (paddle.location.y - this.radius - 5))
    this.color = c.color(147, 112, 219)
    this.velocity = velocity;
    // this.velocity = c.createVector(5, -5)
    this.paddle = paddle
  }

  bouncePaddle() {
    // We are within the width of the paddle
    if (this.location.x + this.radius >= this.paddle.location.x &&
      this.location.x - this.radius <= this.paddle.location.x + this.paddle.width) {
      if (this.location.y + this.radius > this.paddle.location.y) {
        this.reverse('y');
        this.location.y = this.paddle.location.y - this.radius - 1;
      }
    }
  }

  bounceEdge(c) {
    if (this.location.x + this.radius >= c.width) { // Check right edge
      this.reverse('x')
    } else if (this.location.x - this.radius <= 0) { // Check left edge
      this.reverse('x')
    } else if (this.location.y - this.radius <= -25) { // Check the top
      this.reverse('y')
    }
  }


  display(c) {
    // c.fill(this.color)
    // c.ellipse(this.location.x - 5, this.location.y, this.size, this.size)
    c.image(c.ball_img, this.location.x - 20, this.location.y, this.radius, this.radius)
  }

  update() {
    this.location.add(this.velocity)
  }

  reverse(coord) {
    this.velocity[coord] *= -1
  }

  belowBottom(c) {
    return this.location.y - this.radius > c.height
  }

  belowPaddle(c, paddle) {
    console.log(paddle.x);
    if (this.y > paddle.x) {
      console.log('below paddle')
      return true;
    }
  }
}