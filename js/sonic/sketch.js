// Objects
var sonic;
var ground;
var prevCactus;
var cactusWaitime = 2;
var minCactusWaitTime = 2;

// Boolean vars
var isCactusTime = true;
var hit = false;
var isPlaying = false;
var playerIsDead = false;
var isTimerDone = false;

// Array of Objects
var ground = [];
var cactuses = [];
var clouds = [];

// Sonic Images
var sonic_run_1_img;
var sonic_run_2_img;
var sonic_run_3_img;
var sonic_run_4_img;
var sonic_jump_1_img;
var sonic_death_img;

// Other Images
var game_over_img;
var cactus_img;
var cloud_img;
var ground_img;

// Sound Effects
var jumpSound;

// Other variables
var graphics;
// Collsion
var score = 0;
var button;
var cnv;
var isGameLaunched = false;
var timer = 5;

// Object Properies
var sonic = {
  r: 50,
  x: 0,
  y: 0,
  vx: 4,
}

var ground = {
  img: null,
  x: 0,
  y: 0,
  vx: 10,
  w: 20,
  h: 0
}

var groundVel = 10;

var cloud = {
  img: null,
  x: 0,
  y: 0,
  vx: 2,
  distance: 1,
  w: 60,
  h: 40
}

var cactus = {
  r: 30,
  x: 0,
  y: 0,
  vx: 10,
}


// Load Images
function preload() {
  // Sonic
  // sonic_run_1_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_1.png');
  // sonic_run_2_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_2.png');
  // sonic_run_3_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_3.png');
  // sonic_run_4_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_4.png');
  // sonic_jump_1_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_jump_1.png');
  // sonic_death_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_death.png');

  // Game property images
  // game_over_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/game_over.png');
  // cactus_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/Cactus.png');
  // cloud_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/colored_cloud.png');
  // ground_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/ground.png');

  sonic_run_1_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_1.png');
  sonic_run_2_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_2.png');
  sonic_run_3_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_3.png');
  sonic_run_4_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_4.png');
  sonic_jump_1_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_jump_1.png');
  sonic_death_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_death.png');

  // Game property images
  game_over_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/game_over.png');
  cactus_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/Cactus.png');
  cloud_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/colored_cloud.png');
  ground_img = loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/ground.png');

  // Sound Effects
}

function setup() {
  sonic_run_1_img.hide();
  sonic_run_2_img.hide();
  sonic_run_3_img.hide();
  sonic_run_4_img.hide();
  sonic_jump_1_img.hide();
  sonic_death_img.hide();
  game_over_img.hide();
  cactus_img.hide();
  ground_img.hide();

  var lastCard = $("#last-card");
  var lastW = lastCard.innerWidth() - 29;
  var lastH = lastCard.innerHeight();

  var lastX = lastCard.position();
  // console.log(lastW)

  cnv = createCanvas(lastW, lastH);
  cnv.parent = $('#last-card');

  cnv.position(lastX.left + 38, lastX.top);
  cnv.style('z-index', -1);

  // Ground Properties
  ground.img = ground_img;
  ground.x = 20;
  ground.y = height - 30;
  ground.w = width;
  ground.h = 20;

  ground = new Ground();
  var btnTxt = document.getElementById("last-play-btn").textContent;

  $("#last-play-btn").click(function () {

    if (!isGameLaunched) {
      console.log("game launched")
      isGameLaunched = true;
      btnTxt = "Reset!";
      isPlaying = true;
      // noLoop();

      $("#game-icon").toggleClass("hidden");
      // isPlaying = true;
    }
  });

  // Sonic 
  sonic = new Sonic();

  textAlign(CENTER, CENTER);
}

// function type(type) {
//   if (type == "play") {
//     $("#last-play-btn").html("Pause")
//     isPlaying = true;
//   } else if (type == "pause") {
//     isPlaying = false;
//   }
// }

function draw() {
  background(255);



  if (isPlaying) {
    if (!isTimerDone) {
      textSize(40)
      if (timer > 0) {
        text("" + timer, width / 2, height / 2);
      }
      if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer -= 1;
        text("" + timer, width / 2, height / 2);
      }
      if (timer == 0) {
        isTimerDone = true;
        text("Ready?", width / 2, height / 2);
      }
    }
    if (isTimerDone) {
      var fps = fps + 1;

      // Score increments per second
      if (frameCount % 10 == 0) {
        if (!playerIsDead) {
          score++;
        }

        if (score > 10 && score < 20) {
          minCactusWaitTime = 1.75;
          speed = 12
        } else if (score > 20 && score < 30) {
          minCactusWaitTime = 1.5;
          speed = 14
        } else if (score > 30 && score < 40) {
          minCactusWaitTime = 1.25;
          speed = 16
        } else if (score > 40 && score < 60) {
          minCactusWaitTime = 1;
          speed = 18
        } else if (score > 60 && score < 100) {
          minCactusWaitTime = 0.75;
          speed = 20
        } else if (score > 100) {
          minCactusWaitTime = 0.5;
          speed = 22
        }
      }
      if (!playerIsDead) {
        textSize(20);
        text('Score: ' + score, width - 100, 25);
      }

      // Object Properties

      // Cactus
      cactus.x = width;
      cactus.y = height - cactus.r - 70;
      // cactus.y = random(cactus.y, cactus.y + 15);

      // Cloud Properties
      cloud.x = width;
      cloud.y = random(height - 100, 0);


      // Ground

      ground.draw();
      ground.move(groundVel);

      // Cloud
      if (0.005 > random(1)) {
        cloud.spaceBetween = random(50, 100);
        clouds.push(new Cloud(cloud.x, cloud.y, cloud.vx, cloud.spaceBetween, cloud.w, cloud.h));
      }

      for (var c of clouds) {
        c.draw();
        c.move();

        if (c.x < -50) {
          clouds.splice(i, 1);
        }
      }

      // Sonic
      sonic.draw();
      sonic.move();

      // Cactus
      if (0.01 > random(1)) {
        if (isCactusTime) {
          cactuses.push(new Cactus(cactus.r, cactus.x, cactus.y, cactus.vx, cactus.distance));
          isCactusTime = false;
        }
      }

      if (!isCactusTime) {
        if (frameCount % 15 == 0) {
          cactusWaitime -= 0.25;

          if (cactusWaitime <= 0) {
            isCactusTime = true;
            cactusWaitime = minCactusWaitTime;
          }
        }
      }

      for (var i = 0; i < cactuses.length; i++) {
        // Collision Detection

        sonic.hits(cactuses[i]);

        cactuses[i].draw();
        cactuses[i].move();

        if (cactuses[i].x < -25) {
          cactuses.splice(i, 1);
        }
      }
      // var x1 = player.x + player.r * 0.5;
      // var y1 = player.y + player.r * 0.5;
      // var x2 = c.x + c.r * 0.5;
      // var y2 = c.y + c.r * 0.5;

      // var hit = collideCircleCircle(x1, y1, player.r, x2, y2, c.r);
    }
  }
}

$(document).ready(function () {
  $(window).resize(function () {
    var lastCard = $("#last-card");
    var lastW = lastCard.innerWidth() - 29;
    var lastH = lastCard.innerHeight();

    var lastX = lastCard.position();

    resizeCanvas(lastW, lastH);
    cnv.position(lastX.left + 38, lastX.top);
  });
});
// User Inputs

function keyPressed() {
  if (key == ' ') {
    sonic.jump();
    // console.log('spacebar');
  }
}

function mousePressed() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
    sonic.jump();
  }
  if (playerIsDead) {
    if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
      window.location.reload()
    }
  }


  // console.log('mouse');
}