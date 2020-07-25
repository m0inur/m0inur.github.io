class ShipBubs {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  draw(c, player) {
    c.fill(255);
    c.stroke(0);

    c.moveShipLeft = false;
    c.moveShipRight = false;
    c.moveShipMiddle = false;

    c.x2 = 0;
    c.y2 = 0;

    if (!c.playerIsDead) {
      if (!c.isPaused) {

        if (c.pmouseX > c.mouseX) {
          c.fps++;
          // if (c.fps % 40 == 0) {
          c.moveShipLeft = true;
          // }
        } else if (c.pmouseX < c.mouseX) {
          c.fps++;
          // if (c.fps % 40 == 0) {
          c.moveShipRight = true;
          // }
        } else {
          c.moveShipMiddle = true;
        }

        if (c.moveShipLeft) {
          c.x2 += 20
          c.y2 += -15
        }
        if (c.moveShipRight) {

          c.x2 += -25;
          c.y2 += 0;
        }
      }
    }


    // c.ellipse(this.x, this.y, this.r * 2);
    c.fill(255)
    // c.stroke(0)
    c.strokeWeight(3)

    c.ellipse(this.x + c.x2, this.y + c.y2, this.r * 2);
  }
}