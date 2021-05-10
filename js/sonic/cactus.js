class Cactus {
  constructor(r, x, y, vx) {
    this.r = r;
    this.x = x;
    this.y = y;
    this.vx = vx;
  }

  move(c) {
    if (!c.playerIsDead) {
      this.x -= this.vx;
    }
  }
  draw(c) {
    // c.image(c.ground_img, this.x, c.height - 45);
    c.image(c.cactus_img, this.x, this.y + this.r - 10, this.r + 10, this.r + 15);
  }
}