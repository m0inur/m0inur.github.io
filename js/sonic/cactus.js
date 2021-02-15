class Cactus extends Object {
  constructor(r, x, y, vx) {
    super(c, x, y, vx, r, r, c.cactus_img);
  }

  move(c) {
    if (!c.playerIsDead) {
      this.x -= this.vx;
    }
  }
}