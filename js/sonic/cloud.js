class Cloud {
  constructor(x, y, vx, spaceBetween, w, h) {
    this.x = x;
    this.y = y;
    this.vx = vx
    this.spaceBetween = spaceBetween;
    this.w = w;
    this.h = h;
  }

  move() {
    this.x -= this.vx;
  }

  draw(c) {
    // c.image(c.cloud_img, this.x, c.height - 45);
    c.image(c.cloud_img, this.x, this.y, this.w, this.h);
    // console.log(this.spaceBetween);
    // image(graphics, this.x, height - graphics.height);
  }
}