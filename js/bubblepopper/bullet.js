class Bullet {
  constructor(x, y, vy, vx, type, radius, colors) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
    this.vx = vx;
    this.type = type;
    this.angle = 0;
    this.colors = colors[Math.floor(Math.random() * colors.length)];
  }

  move() {
    if (this.type == "centerBullet") {
      this.y -= this.vy;
    }
    if (this.type == "leftBullet") {

      this.y -= this.vy;
      this.x -= this.vx * 0.60;


    } else if (this.type == "rightBullet") {

      this.y -= this.vy;
      this.x -= this.vx * -0.60;
    }
  }

  offTheScreen(bullet) {
    if (this.y < 0 - 200) {
      for (var i = 0; i < bullet.length; i++) {
        bullet.splice(i, 1);
      }
    }
  }

  draw(c) {


    if (this.type == "rightBullet") {
      c.push();
      c.translate(this.x - 5, this.y - 50);
      c.rotate(12);
      c.image(c.bullet_img, 18, 2, 20, 20);
      c.pop();
    }

    if (this.type == "leftBullet") {
      c.push();
      c.translate(this.x - 15, this.y - 46);
      c.rotate(-8);
      c.image(c.bullet_img, 18, 2, 20, 20);
      c.pop();
    }

    if (this.type == "centerBullet") {
      c.push();
      c.translate(this.x, this.y);
      // console.log("angleeee");
      c.rotate(this.angle);

      c.image(c.bullet_img, 8, -50, this.radius, this.radius);
      c.pop()
    }
  }
}