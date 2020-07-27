class Player {
  constructor(x, y, width, height, type) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    this.count = 1
    this.angle = 0;
    // this.graphics = NULL;
  }

  move(c) {
    if (c.mouseX < c.width - 13 && c.mouseX > 0 + 20) {
      this.x = c.mouseX - 25;
    }



    if (c.pmouseX < c.mouseX) {
      this.angle += 2;

      c.push();

      c.turnAngleLeft = false;
      if (!c.turnAngleLeft) {
        if (this.angle < 10) {
          c.rotate(this.angle);
        } else {
          this.angle = 10;
        }


      }



      c.pop();
    }
    if (c.pmouseX > c.mouseX) {
      this.angle -= 2;

      c.push();

      if (this.angle > -10) {
        c.rotate(this.angle);
      } else {
        this.angle = -10;
      }

      c.pop();
    }

    if (this.angle > 0) {
      c.playerFps++;

      if (c.playerFps % 20 == 0) {
        c.turnAngleLeft = true;
        c.playerFps = 0;
      }
    }

    if (this.angle < 0) {
      c.playerFps++;
      if (c.playerFps % 20 == 0) {
        c.turnAngleRight = true;
        c.playerFps = 0;
      }
    }

    if (c.turnAngleLeft) {
      this.angle -= 2;

      if (this.angle < 2) {
        c.turnAngleLeft = false;
      }
    }

    if (c.turnAngleRight) {
      this.angle += 2;
      if (this.angle > -2) {
        c.turnAngleRight = false;
      }
    }
  }

  draw(c) {
    if (this.type == "original") {
      c.push();

      c.translate(this.x, this.y);
      c.rotate(this.angle);
      if (c.frameCount % 60 == 0) {
        c.turnOver = true;
      }
      c.image(c.player_img, 0, 0, this.width, this.height);

      c.pop();
    }

    if (this.type == "clone") {
      c.push();

      c.translate(this.x, this.y);
      c.rotate(120);
      if (c.frameCount % 60 == 0) {
        c.turnOver = true;
      }

      c.image(c.player_img, 0, 0, this.width, this.height);

      c.pop();
    }
  }
}