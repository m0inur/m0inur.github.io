class Cactus {
  constructor(r, x, y, vx) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.vx = vx;
  }

  move() {
    if (!playerIsDead) {
      this.x -= this.vx;
    }
  }
  draw() {
    image(cactus_img, this.x, this.y + this.r - 10, this.r + 10, this.r + 15);
  }
}