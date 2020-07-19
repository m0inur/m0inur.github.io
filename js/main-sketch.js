const sonicSketch = c => {
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
    c.playerIsDead = false;
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
    c.graphics;
    // Collsion
    c.score = 0;
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

    var groundVel = 10
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
    c.preload = function () {
        // Sonic
        // sonic_run_1_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_1.png', 'sonic');
        // sonic_run_2_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_2.png', 'sonic');
        // sonic_run_3_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_3.png', 'sonic');
        // sonic_run_4_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_4.png', 'sonic');
        // sonic_jump_1_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_jump_1.png', 'sonic');
        // sonic_death_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_death.png', 'sonic');

        // // Game property images
        // game_over_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/game_over.png', 'sonic');
        // cactus_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/Cactus.png', 'sonic');
        // cloud_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/colored_cloud.png', 'sonic');
        // ground_img = createImg('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/ground.png', 'sonic');

        c.sonic_run_1_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_1.png');
        c.sonic_run_2_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_2.png');
        c.sonic_run_3_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_3.png');
        c.sonic_run_4_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_run_4.png');
        c.sonic_jump_1_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_jump_1.png');
        c.sonic_death_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/sonic_death.png');

        // Game property images
        c.game_over_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/game_over.png');
        c.cactus_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/Cactus.png');
        c.cloud_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/colored_cloud.png');
        c.ground_img = c.loadImage('https://raw.githubusercontent.com/m0inur/m0inur.github.io/master/js/sonic/assets/ground.png');

    };
    c.setup = function () {

        // sonic_run_1_img.hide();
        // sonic_run_2_img.hide();
        // sonic_run_3_img.hide();
        // sonic_run_4_img.hide();
        // sonic_jump_1_img.hide();
        // sonic_death_img.hide();
        // game_over_img.hide();
        // cactus_img.hide();
        // ground_img.hide();
        // cloud_img.hide();


        var lastCard = $("#last-card");
        var lastW = lastCard.innerWidth() - 29;
        var lastH = lastCard.innerHeight();

        var lastX = lastCard.position();
        // console.log(lastW)

        cnv = c.createCanvas(lastW, lastH);
        cnv.parent = $('#last-card');

        cnv.position(lastX.left + 38, lastX.top + 40);
        cnv.style('z-index', -1);

        // Ground Properties
        ground.img = ground_img;
        ground.x = 20;
        ground.y = c.height - 30;
        ground.w = c.width;
        ground.h = 20;

        ground = new Ground(c, ground_img);
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
        sonic = new Sonic(c);

        c.textAlign(c.CENTER, c.CENTER);
    };

    c.draw = function () {
        c.background(255);

        if (isPlaying) {
            if (!isTimerDone) {
                c.textSize(40)
                if (timer > 0) {
                    c.text("" + timer, c.width / 2, c.height / 2);
                }
                if (c.frameCount % 60 == 0 && timer > 0) { // if the c.frameCount is divisible by 60, then a second has passed. it will stop at 0
                    timer -= 1;
                    c.text("" + timer, c.width / 2, c.height / 2);
                }
                if (timer == 0) {
                    isTimerDone = true;
                    c.text("Ready?", c.width / 2, c.height / 2);
                }
            }
            if (isTimerDone) {
                //         // c.Score increments per second
                if (c.frameCount % 10 == 0) {
                    if (!c.playerIsDead) {
                        c.score++;
                    }
                    if (c.score > 10 && c.score < 20) {
                        minCactusWaitTime = 1.75;
                        speed = 12
                    } else if (c.score > 20 && c.score < 30) {
                        minCactusWaitTime = 1.5;
                        speed = 14
                    } else if (c.score > 30 && c.score < 40) {
                        minCactusWaitTime = 1.25;
                        speed = 16
                    } else if (c.score > 40 && c.score < 60) {
                        minCactusWaitTime = 1;
                        speed = 18
                    } else if (c.score > 60 && c.score < 100) {
                        minCactusWaitTime = 0.75;
                        speed = 20
                    } else if (c.score > 100) {
                        minCactusWaitTime = 0.5;
                        speed = 22
                    }
                }
                if (!c.playerIsDead) {
                    c.textSize(15);
                    c.text('Score: ' + c.score, c.width - 40, 25);
                }

                // Object Properties

                // Cactus
                cactus.x = c.width;
                cactus.y = c.height - cactus.r - 70;
                // cactus.y = random(cactus.y, cactus.y + 15);

                // Cloud Properties
                cloud.x = c.width;
                cloud.y = c.random(c.height - 100, 0);


                // Ground

                ground.draw();
                ground.move(groundVel);

                // Cloud
                if (0.005 > c.random(1)) {
                    cloud.spaceBetween = c.random(50, 100);
                    clouds.push(new Cloud(cloud.x, cloud.y, cloud.vx, cloud.spaceBetween, cloud.w, cloud.h));
                }

                for (var cl of clouds) {
                    cl.draw(c);
                    cl.move();

                    if (cl.x < -50) {
                        clouds.splice(i, 1);
                    }
                }

                // Sonic
                sonic.draw(c, cloud.vx, cactus.vx, groundVel);
                sonic.move(c, cloud.vx, cactus.vx, groundVel);

                // Cactus
                if (0.01 > c.random(1)) {
                    if (isCactusTime) {
                        cactuses.push(new Cactus(cactus.r, cactus.x, cactus.y, cactus.vx, cactus.distance));
                        isCactusTime = false;
                    }
                }

                if (!isCactusTime) {
                    if (c.frameCount % 15 == 0) {
                        cactusWaitime -= 0.25;

                        if (cactusWaitime <= 0) {
                            isCactusTime = true;
                            cactusWaitime = minCactusWaitTime;
                        }
                    }
                }

                for (var i = 0; i < cactuses.length; i++) {
                    // Collision Detection

                    sonic.hits(cactuses[i], c);

                    cactuses[i].draw(c);
                    cactuses[i].move(c);

                    if (cactuses[i].x < -25) {
                        cactuses.splice(i, 1);
                    }
                }
            }
        }
    }

    $(document).ready(function () {
        $(window).resize(function () {
            var lastCard = $("#last-card");
            var lastW = lastCard.innerWidth() - 29;
            var lastH = lastCard.innerHeight();

            var lastX = lastCard.position();

            c.resizeCanvas(lastW, lastH);
            cnv.position(lastX.left + 38, lastX.top + 40);
        });
    });
    // User Inputs

    c.keyPressed = function () {
        if (key == ' ') {
            sonic.jump();
            // console.log('spacebar');
        }
    }

    c.mousePressed = function () {
        if (c.mouseX < c.width && c.mouseX > 0 && c.mouseY < c.height && c.mouseY > 0) {
            sonic.jump(c);
        }
        if (c.playerIsDead) {
            if (c.mouseX < c.width && c.mouseX > 0 && c.mouseY < c.height && c.mouseY > 0) {
                window.location.reload()
            }
        }
    }
}

var myp5_sonicSketch = new p5(sonicSketch);