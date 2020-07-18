class Sonic {
  constructor() {
    this.r = 60;
    this.x = this.r;
    this.y = height - this.r - 45;
    this.gravity = 2;
    // this.groundDistance = 40;
    this.vy = 0;
    this.jumpDistance = -18;
    this.jumpHeight = 19;

    // Boolean vars
    this.isGrounded = true;
    this.isDead = false;
  }

  jump() {
    if (!this.isDead) {
      if (this.y == height - this.r - 40) {
        this.vy = -25;
      }
    }
  }

  move() {
    // console.log(this.y)
    if (!this.isDead) {

      if (this.vy < 0) {
        this.isGrounded = false;
        // console.log("it's not grounded");
      }

      if (!this.isGrounded) {

        // console.log("Image loaded");

        graphics = sonic_jump_1_img;
      }

    } else {
      graphics = sonic_death_img;
      cloud.vx = 1;
      this.y += 2

      cactus.vx = 0;
      groundVel = 0;

      image(game_over_img, width / 2 - 140, height / 2 - 135, 250, 250)
      text('Score: ' + score, width / 2 - 3, height / 2 + 25);

    }

    // Make player jump
    if (!playerIsDead) {
      // console.log(this.vy);
      this.y += this.vy;
      this.vy += this.gravity;
      this.y = constrain(this.y, 0, height - this.r - 40);
    }
  }

  hits(c) {
    /* 
     * Properties of rectangle
     *
     * x1 & x1 = Player Properties
     *
     * x2 & x2 = Obstacles Properties
     *
     * c = cactus
     */

    var x1 = this.x + this.r * 0.5;
    var y1 = this.y + this.r * 0.5;
    var x2 = c.x + c.r * 0.5;
    var y2 = c.y + c.r * 0.5;



    var hit = collideCircleCircle(x1, y1, this.r, x2, y2, c.r);
    if (hit) {
      playerIsDead = true;
      this.isDead = true;
    }
    // return collideRectRect(this.x, this.y, this.width, this.height, c.x, c.y, c.width, c.height);
  }

  draw() {
    if (!this.isDead) {

      if (this.y == height - this.r - 40) {
        this.isGrounded = true;
      }

    } else {
      graphics = sonic_death_img;
      cloud.vx = 2;
      this.y += 2

      cactus.vx = 0;
      groundVel = 0;

      image(game_over_img, width / 2, height / 2, 250, 250)
    }


    if (this.isGrounded == true && !this.isDead) {

      if ((int)(frameCount / 3) % 4 == 0) {
        graphics = sonic_run_1_img;
      } else if ((int)(frameCount / 3) % 4 == 1) {
        graphics = sonic_run_2_img;
      } else if ((int)(frameCount / 3) % 4 == 2) {
        graphics = sonic_run_3_img;
      } else {
        graphics = sonic_run_4_img;
      }
    }

    image(graphics, this.x, this.y + 15, this.r, this.r);
  }
}