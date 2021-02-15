class Sonic {
  constructor(c) {
    this.r = 60;
    this.x = this.r;
    this.y = c.height - this.r - 45;
    this.gravity = 2;
    this.vy = 0;
    this.jumpDistance = -18;
    this.jumpHeight = 19;

    // Boolean vars
    this.isGrounded = true;
  }

  jump(c) {
    if (!c.playerIsDead) {
      if (this.y == c.height - this.r - 40) {
        this.vy = -25;
      }
      if (c.keyCode == 38) {
        this.vy = -25;
      }
    }
  }

  move(c, cloudVel, cactusVel, groundVel) {
    if (!c.playerIsDead) {

      if (this.vy < 0) {
        this.isGrounded = false;
      }

      if (!this.isGrounded) {


        c.graphics = c.sonic_jump_1_img;
      }

    } else {
      c.graphics = c.sonic_death_img;
      c.playerIsDead = true;
      cloudVel = 2;
      this.y += 2

      cactusVel = 0;
      groundVel = 0;

      c.image(c.game_over_img, c.width / 2 - 125, c.height / 2 - 140, 250, 250)
      if (darkMode) {
        c.fill("#e5e5ea");
      } else {
        c.fill("#333")
      }
      c.text('Score: ' + c.score, c.width / 2, c.height / 2 + 25);
      // }
    }

    // Make player jump
    if (!c.playerIsDead) {
      this.y += this.vy;
      this.vy += this.gravity;
      this.y = c.constrain(this.y, 0, c.height - this.r - 40);
    }
  }

  hits(cl, c) {
    var x1 = this.x + this.r * 0.5;
    var y1 = this.y + this.r * 0.5;
    var x2 = cl.x + cl.r * 0.5;
    var y2 = cl.y + cl.r * 0.5;

    var hit = c.collideCircleCircle(x1, y1, this.r, x2, y2, cl.r);
    if (hit) {
      c.playerIsDead = true;
    }
  }

  draw(c) {
    if (!c.playerIsDead) {

      if (this.y == c.height - this.r - 40) {
        this.isGrounded = true;
      }

    }

    if (this.isGrounded == true && !c.playerIsDead) {

      if ((c.int)(c.frameCount / 3) % 4 == 0) {
        c.graphics = c.sonic_run_1_img;
      } else if ((c.int)(c.frameCount / 3) % 4 == 1) {
        c.graphics = c.sonic_run_2_img;
      } else if ((c.int)(c.frameCount / 3) % 4 == 2) {
        c.graphics = c.sonic_run_3_img;
      } else {
        c.graphics = c.sonic_run_4_img;
      }
    }
    c.image(c.graphics, this.x, this.y + 15, this.r, this.r);
  }
}