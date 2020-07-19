class Paddle {
  constructor(c) {
    this.width = 100
    this.height = 15
    this.color = c.color(255)
    this.location = c.createVector((c.width / 2) - (this.width / 2), c.height - 35)
    const speed = 8
    this.speed = {
      right: c.createVector(speed, 0),
      left: c.createVector(speed * -1, 0)
    }
  }

  display(c) {
    c.fill(0, 155, 167)
    // c.stroke();
    // c.fill(materialColor())
    c.rect(this.location.x, this.location.y, this.width, this.height)
  }

  move(c) {
    this.location.x = c.mouseX - 60;

    if (this.location.x < 0) {
      this.location.x = 0
    } else if (this.location.x + this.width > c.width) {
      this.location.x = c.width - this.width
    }
  }
}