const bubblePopper = c => {
  // Images
  var player_img;
  var bullet_img;

  //Objects
  var player;

  var bubbles = [];
  var shipBubs = [];
  var bullets = [];
  var bulletCenter = "centerBullet";
  var bulletLeft = "leftBullet";
  var bulletRight = "rightBullet";

  var bParticles = [];
  var powerUps = [];

  // Frame rates
  var frameCounter = 0;
  var keyFrames = 0;
  var countScoreFrames = 0;
  var countFrames = 0;
  c.playerFps = 0;

  // Object Colors
  var colors = [
    "#2185C5",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FF0000",
    "#9400D3",
    "#4B0082",
    "#0000FF",
    "#00FF00",
    "#FFFF00",
    "#FF7F00",
  ];

  c.bubbleColors = [
    "#5D33FF",
    "#FF336F",
    "#FF5D33",
    "#336FFF",
    "#33FF9F",
    "#FF336F",
  ];
  // Objects properties

  // bpp
  var score = {
    x: 0,
    y: 0,
  }
  var bParticle = {
    x: 0,
    y: 0,
    vy: 0.90,
    side: 0,
    bubbleHittable: 0,
    radius: 5,
    colors: null
  }
  // Bubbles
  var bubble = {
    x: 0,
    y: 0,
    radius: 30,
    vy: 3,
    hp: 0
  }

  var bubbleHittable;

  // Bullets
  var bullet = {
    radius: 20,
    spawnRate: 4,
    vy: 12,
    vx: 3,
  }
  // Player
  var playerProps = {
    x: 0,
    y: 0,
    w: 85,
    h: 85,
  }

  var tBullet = {
    x: 0,
    y: 0,
    vy: 2,
    r: 30,
    width: 30,
    height: 30,
    hp: 0,
    type: "trippleBullets",
    icon: null
  }

  var doubleBullets = {
    x: 0,
    y: 0,
    vy: 2,
    r: 30,
    width: 15,
    height: 15,
    hp: 0,
    type: "doubleBullets",
    icon: null
  }

  var doubleScore = {
    x: 0,
    y: 0,
    vy: 2,
    r: 30,
    width: 15,
    height: 15,
    hp: 0,
    type: "doubleScore",
    icon: null
  }

  var shipBub = {
    r: 13
  }
  // Boolean
  var initComplete = false;
  var firstFrame = true;
  c.playerIsDead = false;

  var spawntrippleBullet = false;
  var spawnDoubleBullet = false;
  var spawnDoubleScore = false;
  var powerTextColor = 0;

  var isPoweredUp = false;
  c.playerMaxAngle = 20;
  // Normal vars
  c.score = 0;
  c.particlesFps = 0;
  c.powerTextY = 0;
  c.rotateSpeed = 0;
  c.colorMinRange = 150;
  c.colorMaxRange = 255;
  c.opacity = 255;
  c.changeBubblesOpacity = false;
  
  c.textFrames = 0;
  c.increaseOpacity = -1;

  var powerupShowText = false;
  var lastPowerup;
  var showingPowerup = false;
  var showMaxBubbles = 8;

  // Images
  c.preload = function() {
    c.bullet_img = c.loadImage('images/bullet.png');
    c.player_img = c.loadImage('images/spaceship.png');
    c.tripple_bullet = c.loadImage('images/tripple_bullet.png');
    c.double_bullet = c.loadImage('images/double_bullet.png');
    c.double_score = c.loadImage('images/double_score.png');
    c.game_over = c.loadImage('images/game_over.png');

    c.orbi = c.loadFont('Orbitron-Bold.ttf');
    c.numberFont = c.loadFont('Superstar-M54.ttf');
  }

  c.setup = function() {
    let cnv = c.createCanvas(617, 737);

    cnv.position(100, 0);

    playerProps.x = c.width / 2 - 30;
    playerProps.y = 600;

    player = new Player(c, playerProps.x, playerProps.y, playerProps.w, playerProps.h);

    score.x = c.width / 1 - 60;
    score.y = 25;

    // c.text styles
    c.textSize(20);
    c.textFont(c.orbi);
    c.textSize(20);
    c.textAlign(c.CENTER, c.CENTER);

    c.angleMode(c.DEGREES);
  }

  c.draw = function() {
    c.background(255);


    // Score
    if (!c.playerIsDead) {
      c.fill(0);
      c.textSize(20);
      c.textFont(c.orbi);
      c.text('Score: ' + c.round(c.score), score.x, score.y);
    }

    // Change Object Properties

    // Bubble properties
    bubble.x = c.floor(c.random(10, (c.width - 50) / 3)) * 3;
    // bubble.y = c.floor(c.random(10, (c.height - 50) / 3)) * 3;

    // PowerUps properties
    tBullet.x = doubleBullets.x = doubleScore.x = c.floor(c.random(10, (c.width - 50) / 3)) * 3;

    // Initialize Objects
    /* ------------------------------ Bullets -------------------------------- */
    if (c.frameCount % bullet.spawnRate == 0) {
      bullets.push(new Bullet(player.x + 24, player.y + 60, bullet.vy, bullet.vx, bulletCenter, bullet.radius, colors));
    }

    /* ------------------------------ Plane Bublles -------------------------------- */
    if (c.frameCount % 5 == 0) {
      shipBubs.push(new ShipBubs(player.x + 43, player.y + 80, shipBub.r));
    }




    /* ------------------------------ Use? Objects -------------------------------- */

    /* ------------------------------ Player -------------------------------- */
    player.draw(c);
    player.move(c);

    /* ------------------------------ Bubbles -------------------------------- */
    if (bubbles.length > 0) {
      for (i = 0; i < bubbles.length; i++) {

        bubbles[i].draw(c, player);
        bubbles[i].move(c);

        bubbles[i].hasEnded(c);
        bubbles[i].hitPlayer(c, bubbles[i], player);
      }
    }

    /* ------------------------------ Bullets -------------------------------- */

    for (i = 0; i < bullets.length; i++) {
      bullets[i].draw(c, player);
      bullets[i].move(c, player);
    }


    /* ------------------------------ BP Particles -------------------------------- */

    for (var i = 0; i < bParticles.length; i++) {
      bParticles[i].draw(c);
      bParticles[i].move(c);

      c.particlesFps++
      if (c.particlesFps > 500) {
        bParticles.splice(i, bParticles.length);

        c.particlesFps = 0;
      }
    }


    /* ------------------------------ Plane Bubbles -------------------------------- */

    for (var i = 0; i < shipBubs.length; i++) {
      shipBubs[i].draw(c);

      if (shipBubs[i].r > 0) {
        shipBubs[i].y += 3;
        shipBubs[i].r -= 0.50;
      } else {
        shipBubs.splice(i, 1);
      }
    }


    /* ------------------------------ Score system -------------------------------- */
    if (c.score < 100) {
      showMaxBubbles = 5

      doubleScoreHP = doubleScore.hp = c.random(2, 3)
      doubleBulletHP = doubleBullets.hp = c.random(2, 3)
      trippleBulletHP = tBullet.hp = c.random(2, 3)
      bubble.hp = bubbleHittable = c.random(2, 3);

      if (bubbles.length < showMaxBubbles) {
        //         if (bubbles.length != 0) {
        //           for (i = 0; i < bubbles.length; i++) {
        //             var collided = c.collideCircleCircle(bubble.x, bubble.y, bubble.radius, bubbles[i].x, bubbles[i].y, bubbles[i].radius);

        //             if (collided) {
        //               bubble.x = c.floor(c.random(10, (c.width - 50) / 3)) * 3;

        //               i = -1
        //             }
        //           }
        //         }

        // if (1 == 1) {
        if (0.02 > c.random(1)) {
          bubbles.push(new Bubble(bubble.x, bubble.y, bubble.vy, bubbleHittable, bubble.radius, c.bubbleColors));
        }
      }
    }
    if (c.score > 100) {
      showMaxBubbles = 9
      doubleScoreHP = doubleScore.hp = c.random(3, 5)
      doubleBulletHP = doubleBullets.hp = c.random(3, 5)
      trippleBulletHP = tBullet.hp = c.random(3, 5)
      bubble.hp = bubbleHittable = c.random(3, 5);

      if (bubbles.length < showMaxBubbles) {
        if (0.03 > c.random(1)) {
          bubbles.push(new Bubble(bubble.x, bubble.y, bubble.vy, bubbleHittable, bubble.radius, c.bubbleColors));

        }
      }
    }

    if (c.score > 200) {
      showMaxBubbles = 9
      doubleScoreHP = doubleScore.hp = c.random(4, 5)
      doubleBulletHP = doubleBullets.hp = c.random(4, 5)
      trippleBulletHP = tBullet.hp = c.random(4, 5)
      bubble.hp = bubbleHittable = c.random(4, 5);

      if (bubbles.length < showMaxBubbles) {
        if (0.03 > c.random(1)) {
          bubbles.push(new Bubble(bubble.x, bubble.y, bubble.vy, bubbleHittable, bubble.radius, c.bubbleColors));
        }
      }
    }

    /* ------------------------------ Power Ups -------------------------------- */

    if (0.03 > c.random(1)) {
      if (!showingPowerup) {
        if (lastPowerup != "trippleBullets") {

          powerUps.push(new Powerup(tBullet.x, tBullet.y, tBullet.vy, tBullet.r, tBullet.width, tBullet.height, tBullet.hp, tBullet.type, c.tripple_bullet));

          showingPowerup = true;
          lastPowerup = tBullet.type
          powerupShowText = true;
        }
      }
    } else if (0.03 > c.random(1)) {
      if (!showingPowerup) {
        if (lastPowerup != "doubleBullets") {


          powerUps.push(new Powerup(doubleBullets.x, doubleBullets.y, doubleBullets.vy, doubleBullets.r, doubleBullets.width, doubleBullets.height, doubleBullets.hp, doubleBullets.type, c.double_bullet));

          showingPowerup = true;
          lastPowerup = doubleBullets.type
          powerupShowText = true;
        }
      }

    } else if (0.03 > c.random(1)) {
      if (!showingPowerup) {
        if (lastPowerup != "doubleScore") {


          powerUps.push(new Powerup(doubleScore.x, doubleScore.y, doubleScore.vy, doubleScore.r, doubleScore.width, doubleScore.height, doubleScore.hp, doubleScore.type, c.double_score));

          showingPowerup = true;
          lastPowerup = doubleScore.type
          powerupShowText = true;
        }
      }

    }
    // CD - Collision Detection

    /* ------------------------------ CD for bubbles -------------------------------- */
    for (i = 0; i < powerUps.length; i++) {
      powerUps[i].draw(c);

      frameCounter++;
    }
    // If bullet Collides with bubbles

    for (var i = 0; i < bubbles.length; i++) {
      for (var j = 0; j < bullets.length; j++) {

        var hit = bubbles[i].hit(c, bullets[j]);

        if (hit) {
          // bullets[j].x = player.x + 24;
          // bullets[j].y = player.y;

          bubbles[i].bubbleHittable -= 1;

          bullets.splice(j, 1);

          if (bubbles[i].bubbleHittable > 0) {

            break;

          } else if (bubbles[i].bubbleHittable < 0) {

            bParticle.x = c.random(bubbles[i].x, bubbles[i].x);
            bParticle.y = c.random(bubbles[i].y, bubbles[i].y);
            bParticles.colors = bubbles[i].colors;

            if (!spawnDoubleScore) {
              c.score += c.round(bubble.hp);
            } else if (spawnDoubleScore) {
              showText(c, "Double Score");

              c.score += c.round(bubble.hp) * 2;
            }
            bubbles.splice(i, 1);
            for (i = 0; i < 15; i++) {
              bParticle.radius = c.random(2, 10);
              bParticle.vx = c.random(-3, 3);
              bParticle.vy = c.random(-3, 3);
              bParticles.push(new Particle(bParticle.x, bParticle.y, bParticle.vx, bParticle.vy, bParticle.radius, bParticles.colors));
            }
          }

          break;
        } else {
          if (bullets[j].y < 0) {
            bullets.splice(j, 1);
          }
        }
      }
    }

    /* ------------------------------ CD for Powerups -------------------------------- */

    for (i = 0; i < powerUps.length; i++) {
      for (var j = 0; j < bullets.length; j++) {
        var hit;
        if (powerUps.length > 0) {

          hitten = powerUps[i].hit(c, bullets[j]);

          if (hitten) {
            bullets.splice(j, 1);
            if (powerUps[i].hp > 0) {
              powerUps[i].hp -= 1;
            } else if (powerUps[i].hp < 0) {

              if (powerUps[i].type == "trippleBullets") {
                spawntrippleBullet = true;
                c.score += trippleBulletHP;
                isPoweredUp = true;
                showingPowerup = true;

              }

              if (powerUps[i].type == "doubleBullets") {
                spawnDoubleBullet = true;
                c.score += doubleBulletHP;
                isPoweredUp = true;
                showingPowerup = true;

              }

              if (powerUps[i].type == "doubleScore") {
                spawnDoubleScore = true;
                c.score += doubleScoreHP;
                isPoweredUp = true;
                showingPowerup = true;

              }
              powerUps.splice(i, 1);
            }
          }
        }
      }
    }
    /* ------------------------------ Power Ups -------------------------------- */

    if (spawntrippleBullet == true) {

      showText(c, "Tripple Bullets");

      if (c.frameCount % 5 == 0) {
        bullets.push(new Bullet(player.x + 24, player.y, bullet.vy, bullet.vx, bulletLeft, bullet.radius, colors));
      }

      if (c.frameCount % 5 == 0) {
        bullets.push(new Bullet(player.x + 24, player.y, bullet.vy, bullet.vx, bulletRight, bullet.radius, colors));
      }
      // after specified ¦¦¦ frames either stop or loop the tripple bullet
      countFrames++

      if (countFrames > 400) {
        spawntrippleBullet = false;
        showingPowerup = false;
        isPoweredUp = false;

        c.textFrames = 0;
        countFrames = 0;
        bullets = [];
      }
    }

    // Double Bullets
    if (spawnDoubleBullet) {

      showText(c, "Double Bullets");

      bullet.spawnRate = 2
      bullet.vy = 20;

      countFrames += 1

      if (countFrames > 400) {
        spawnDoubleBullet = false;
        isPoweredUp = false;
        showingPowerup = false;

        bullet.spawnRate = 5;
        bullet.vy = 10;

        c.textFrames = 0;
        countFrames = 0;
        bullets = [];
      }
    }

    if (spawnDoubleScore) {
      showText(c, "Double Score");

      countFrames++

      if (countFrames > 400) {
        showingPowerup = false;
        spawnDoubleScore = false;
        isPoweredUp = false;
        countFrames = 0;
        c.textFrames = 0;
      }
    }

  }

  function showText(c, s) {
    if (c.textFrames == 0) {
      c.powerTextY = c.height / 2;
      c.textColor = 0;
      textFillColor = c.bubbleColors[Math.floor(Math.random() * c.bubbleColors.length)]
      // textFillColor = c.color(0);
      opacity = 255;
    }

    c.textFrames++;



    if (c.textColor < 255) {
      opacity -= 3;
    }
    if (opacity < 0) {
      opacity = 0;
    }
    var squareColor = c.color(textFillColor);

    c.stroke(255);
    squareColor.setAlpha(opacity);

    c.textSize(50);
    c.fill(squareColor);

    var powerTextWidth = c.textWidth(s);
    var powerTextX = c.width / 2 + powerTextWidth / 20;

    c.text(s, powerTextX, c.powerTextY)
    c.powerTextY -= 1;

    if (c.textFrames % 90 == 0) {
      c.powerTextY = -100
    }
  }
}
var myp5_bubblePopperSketch = new p5(bubblePopper);