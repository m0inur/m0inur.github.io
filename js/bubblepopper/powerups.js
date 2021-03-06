class Powerup {
  constructor(x, y, vy, r, width, height, hp, type, icon) {
    this.x = x;
    this.y = y;
    this.vy = vy;
    this.r = r;
    this.width = width;
    this.height = height;
    this.hp = hp;
    this.type = type;
    this.icon = icon;
  }

  hit(c, bullet) {
    var d = c.dist(this.x, this.y, bullet.x, bullet.y);

    if (d < this.r + bullet.radius) {
      return true;
    } else {
      return false;
    }
  }
  draw(c) {
    c.textAlign(c.CENTER, c.CENTER)

    c.fill(255);
    c.stroke(0);
    c.strokeWeight(2)
    c.ellipse(this.x, this.y, this.r * 2);

    c.fill(0);
    // c.textStyle(c.NORMAL);
    c.textSize(20)
    c.strokeWeight(0)
    c.textFont(c.numberFont);
    c.text(c.round(this.hp + 2), this.x, this.y - 12)

    if (this.type == "plateSweep") {
      c.fill(0);
      c.ellipse(this.x - this.r / 2 + 15, this.y + 8, this.width, this.height);
    } else if (this.type != "trippleBullets") {
      c.image(this.icon, this.x - this.r / 2 + 8, this.y - 1, this.width, this.height);
    } else if (this.type == "trippleBullets") {
      this.height = 30;
      this.width = 30;

      c.image(this.icon, this.x - this.r / 2, this.y - 2, this.width, this.height);
    }
  }
}