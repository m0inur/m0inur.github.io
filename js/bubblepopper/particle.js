class Particle {
  constructor(x, y, vx, vy ,r, color) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.r = r
    this.color = color;
  }
  
  move(c) {
    // this.vy = c.random(this.vy - 0.50, this.vy + 0.50);
    // this.vy += vy;
    this.x += this.vx;
    this.y += this.vy;
  }
  
  draw(c) {
    c.fill(this.color);
    c.noStroke();
    c.ellipse(this.x, this.y, this.r * 2);
  }
}