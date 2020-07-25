class Bubble {
  constructor(x, y, vy, bubbleHittable, radius, colors) {
    this.x = x;
    this.y = y;
    // this.y = random(0, width)
    this.radius = radius;
    this.vy = vy;
    this.bubbleHittable = bubbleHittable;
    this.opacity = 255;
    this.colors = colors[Math.floor(Math.random() * colors.length)];
    this.rotationSpeed = 0;
  }


  move(c) {
    if (this.y < 400) {
      this.y += this.vy;
    } else {
      this.y += this.vy - 1.5;
    }

  }


  hitPlayer(c, bubble, player) {
    //     var x1 = player.x + player.width * 0.42;
    //     var y1 = player.y + player.width * 0.42;

    //        var hit = c.collideCircleCircle(x1, y1, player.width, bubble.x, bubble.y, bubble.radius);

    // var hit = c.collideRectCircle(x1, y1, player.width, player.height , bubble.x, bubble.y, bubble.radius);

    // if(hit) {
    //   c.noLoop();
    //   c.playerIsDead = true; 
    // }
  }

  hit(c, bullet) {
    var d = c.dist(this.x, this.y, bullet.x, bullet.y);

    if (d < this.radius + bullet.radius) {
      return true;
    } else {
      return false;
    }
    // if () return true;
  }

  hasEnded(c) {
    if (this.y > c.height - 5) {
      c.playerIsDead = true;
    }
  }
  draw(c) {

    c.noStroke();

    if (this.y > 250) {
      if (this.opacity > c.colorMaxRange) {
        c.increaseOpacity = -4;
      } else if (this.opacity < c.colorMinRange) {
        c.increaseOpacity = 4;
      }
      this.opacity += c.increaseOpacity
      c.changeBubblesOpacity = true;
    }
    var squareColor = c.color(this.colors);
    if (c.changeBubblesOpacity) {
      if (c.increaseOpacity) {
        squareColor.setAlpha(this.opacity);
      }
    }

    c.fill(squareColor)

    c.push();


    //     if(this.rotationSpeed > 5) {
    //      this.rotationSpeed = 5;
    //     }
    c.translate(this.x, this.y);
    if (!c.playerIsDead) {
      this.rotationSpeed += c.random(1, 3);
      c.rotate(this.rotationSpeed);
    }
    c.ellipse(0, 0, this.radius * 2);
    c.fill(255);
    c.textSize(20)
    c.textFont(c.numberFont);
    c.text("" + c.round(this.bubbleHittable + 1), 0, -1);

    c.pop();
  }
}