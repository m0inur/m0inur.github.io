// Brick breaker
const brickBreakerSketch = c => {
    let playerScore = 0
    let paddle
    let ball
    let bricks

    // Game States
    let gameState
    var won = 0;
    var pause = true;
    var isPlaying = false;
    c.isDead = false;
    c.hasReloaded = false;
    var hasWon = false;

    var collidable = true;
    var ballVel = c.createVector(4, -4);
    var brick = {
        row: 4,
        bricksPerRow: 6
    }
    c.preload = function () {
        c.ball_img = c.loadImage("../img/icon2.png")
    }

    c.setup = function () {
        // c.createCanvas(617, 250)
        c.frameRate(60)

        var firstCard = $("#first-card");
        var firstW = firstCard.innerWidth() - 29;
        var firstH = firstCard.innerHeight();

        var firstX = firstCard.position();
        // console.log(firstW)
        cnv = c.createCanvas(firstW, firstH);
        cnv.parent = $('#first-card');
        // c.canvas = cnv

        cnv.position(firstX.left + 38, firstX.top + 40);
        cnv.style('z-index', 1);

        brick.row = 4;
        brick.bricksPerRow = 6;

        c.colors = createColors()
        paddle = new Paddle(c)
        ball = new Ball(ballVel, c, paddle)

        $("#logo").click(function () {
            gameState = "playing";
            isPlaying = true;

        });
        bricks = createBricks(brick.row, brick.bricksPerRow, c.colors)
    }
    c.draw = function () {
        c.background(255)
        if (isPlaying) {
            if (pause) {
                c.loop();
                if (c.frameCount % 60 == 0) {
                    pause = false;
                }
            }
            if (!pause) {

                var logo = $("#logo").position();
                ball.bounceEdge(c)
                if (collidable) {
                    ball.bouncePaddle()
                }

                ball.update()

                if (!c.isDead) {
                    paddle.move(c)
                }

                for (let i = bricks.length - 1; i >= 0; i--) {
                    if (collidable) {
                        const brick = bricks[i]

                        if (brick.isColliding(c, ball)) {
                            // console.log("collided")
                            // ball.velocity -= 2
                            ball.reverse('y')
                            bricks.splice(i, 1)
                        } else {
                            brick.display(c)
                        }
                    }
                }
            }


            paddle.display(c)
            ball.display(c)
            if (ball.belowBottom(c)) {
                c.isDead = true;
                collidable = false;
            }

            if (bricks.length === 0) {
                hasWon = true;

                // if (!c.hasReloaded) {
                let colors = createColors()
                won += 1;
                if (won == 1) {
                    brick.row = 4;
                    brick.brickPerRow = 7;
                    ballVel = c.createVector(6, -6);

                    bricks = createBricks(brick.row, brick.brickPerRow, colors);
                    ball = new Ball(ballVel, c, paddle)
                }

                if (won == 2) {
                    brick.row = 5;
                    brick.brickPerRow = 7;
                    ballVel = c.createVector(7, -7);

                    bricks = createBricks(brick.row, brick.brickPerRow, colors);
                    ball = new Ball(ballVel, c, paddle)
                }

                if (won == 3) {
                    brick.row = 6;
                    brick.brickPerRow = 8;
                    ballVel = c.createVector(8, -8);

                    bricks = createBricks(brick.row, brick.brickPerRow, colors);
                    ball = new Ball(ballVel, c, paddle)
                }

                if (won == 4) {
                    brick.row = 8;
                    brick.brickPerRow = 8;
                    ballVel = c.createVector(9, -9);

                    bricks = createBricks(brick.row, brick.brickPerRow, colors);
                    ball = new Ball(ballVel, c, paddle)
                }
                // for (var i = 1; i < 10; i++) {
                //     var incRow = 1,
                //         incBrick = 2,
                //         incBallVel = 1;

                //     if (won == i) {
                //         console.log("won: " + i)
                //         brick.row += incRow
                //         brick.brickPerRow += incBrick
                //         ballVel = c.createVector(6 + incBallVel, -6 + -incBallVel)

                //         bricks = createBricks(brick.row, brick.brickPerRow, colors);

                //         ball = new Ball(ballVel, c, paddle)
                //     }
                // }
                // }
            }

            if (c.isDead) {
                if (c.frameCount % 120 == 0) {
                    c.isDead = false;
                    c.hasReloaded = true;
                    isGameLaunched = false;
                    isPlaying = false;
                    collidable = true;
                    c.isTimerDone = false;

                    c.score = 0;

                    ball = c.NULL;

                    $("#logo").click(function () {
                        c.setup();
                    });
                    $("#first-card-fade").removeClass("first-card")

                    $("#logo").removeClass("hidden");

                    $("#logo").animate({
                        left: "0px",
                        top: "0px",
                        height: "100",
                        width: "100",
                    });

                    $(".full-name").animate({
                        left: "0px",
                        opacity: 1
                    });

                    $(".faded-text").animate({
                        left: "0px",
                        opacity: 1
                    });
                }

            }
        }
    }


    function createColors() {
        const colors = []

        for (let i = 0; i < 10; i++) {
            colors.push(materialColor());
        }
        return colors
    }

    function createBricks(row, brickPerRow, colors) {
        var bricks = []
        // const rows = 4
        // const bricksPerRow = 6
        const rows = row
        const bricksPerRow = brickPerRow
        const brickWidth = c.width / bricksPerRow
        for (let row = 0; row < rows; row++) {
            for (let i = 0; i < bricksPerRow; i++) {
                brick = new Brick(c.createVector(brickWidth * i, 15 * row), brickWidth, 15, colors[c.floor(c.random(0, colors.length))])
                bricks.push(brick)
            }
        }
        return bricks
    }

    $(document).ready(function () {
        $(window).resize(function () {
            brick.row = 4;
            brick.bricksPerRow = 6
            bricks = createBricks(brick.row, brick.bricksPerRow, c.colors)

            var firstCard = $("#first-card");
            var firstW = firstCard.innerWidth() - 29;
            var firstH = firstCard.innerHeight();

            var firstX = firstCard.position();

            c.resizeCanvas(firstW, firstH);
            cnv.position(firstX.left + 38, firstX.top + 40);
        });
    });
}

// Bubble Popper
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
    var gameEndingFrames = 0;

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


    // Gamestates
    var isPlaying = false;
    var isPause = true;
    c.playerIsDead = false;
    // Images
    c.preload = function () {

        c.player_img = c.loadImage('../img/bubblepopper/spaceship.png');
        c.bullet_img = c.loadImage('../img/bubblepopper/bullet.png');
        c.tripple_bullet = c.loadImage('../img/bubblepopper/tripple_bullet.png');
        c.double_bullet = c.loadImage('../img/bubblepopper/double_bullet.png');
        c.double_score = c.loadImage('../img/bubblepopper/double_score.png');
        c.game_over = c.loadImage('../img/bubblepopper/game_over.png');

        c.orbi = c.loadFont('../fonts/Orbitron-Bold.ttf');
        c.numberFont = c.loadFont('../fonts/Superstar-M54.ttf');
    }

    c.setup = function () {

        // cnv.position(100, 0);

        var middleCard = $("#middle-card");
        var middleW = middleCard.innerWidth() - 29;
        var middleH = middleCard.innerHeight();

        var middleX = middleCard.position();
        // console.log(middleW)
        cnv = c.createCanvas(middleW, middleH);
        cnv.parent = $('#middle-card');
        // c.canvas = cnv

        cnv.position(middleX.left + 38, middleX.top + 41);
        cnv.style('z-index', 1);

        playerProps.x = c.width / 2 - 30;
        playerProps.y = 600;

        player = new Player(playerProps.x, playerProps.y, playerProps.w, playerProps.h);

        score.x = c.width / 1 - 100;
        score.y = 25;

        // c.text styles
        c.textSize(20);
        c.textFont(c.orbi);
        c.textAlign(c.CENTER, c.CENTER);

        $("#middle-card-fade").click(function () {
            isPlaying = true;
        });
        c.angleMode(c.DEGREES);
    }
    c.draw = function () {
        c.background(255);
        if (isPlaying) {
            // Score
            if (!c.playerIsDead) {
                c.fill(0);
                c.textSize(20);
                c.textFont(c.orbi);
                c.strokeWeight(0)
                c.text('Score: ' + c.round(c.score), score.x, score.y);
            }

            // Change Object Properties

            // Bubble properties
            bubble.x = c.floor(c.random(10, (c.width - 50) / 3)) * 3;
            // bubble.y = c.floor(c.random(10, (c.height - 50) / 3)) * 3;

            // PowerUps properties
            tBullet.x = doubleBullets.x = doubleScore.x = c.floor(c.random(10, (c.width - 50) / 3)) * 3;
            tBullet.y = doubleBullets.y = doubleScore.y = c.floor(c.random(10, (c.height - 150) / 3)) * 3;
            // console.log((c.height - 150) / 3 * 3);
            console.log(c.mouseY)
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
            if (!c.playerIsDead) {
                player.move(c);
            }
            /* ------------------------------ Bubbles -------------------------------- */
            if (bubbles.length > 0) {
                for (i = 0; i < bubbles.length; i++) {

                    bubbles[i].draw(c, player);
                    if (!c.playerIsDead) {
                        bubbles[i].move(c);
                    }
                    bubbles[i].hasEnded(c);
                    bubbles[i].hitPlayer(c, bubbles[i], player);
                }
            }

            /* ------------------------------ Bullets -------------------------------- */

            for (i = 0; i < bullets.length; i++) {
                bullets[i].draw(c, player);
                if (!c.playerIsDead) {
                    bullets[i].move(c, player);
                }
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
                c.powerTextY = c.height / 2 - 20;
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

            if (c.textFrames % 90 == 0) {
                c.powerTextY = -100
            }
        }
        if (c.playerIsDead) {

            gameEndingFrames++;
            if (gameEndingFrames % 120 == 0) {
                $("#middle-card-fade").removeClass("middle-card")

                $("#middle-card-fade").animate({
                    left: "0",
                    top: "0",
                    opacity: '1'
                });

                c.playerIsDead = false;
                c.score = 0;
                isPlaying = false;

                bubbles = [];
                shipBubs = [];
                bullets = [];
                bParticles = [];
                powerUps = [];
            }
        }
    }

    $(document).ready(function () {
        $(window).resize(function () {
            var middleCard = $("#middle-card");
            var middleW = middleCard.innerWidth() - 29;
            var middleH = middleCard.innerHeight();

            var middleX = middleCard.position();
            // console.log(middleW)
            cnv = c.createCanvas(middleW, middleH);
            cnv.parent = $('#middle-card');
            // c.canvas = cnv

            cnv.position(middleX.left + 38, middleX.top + 41);
        });
    });
}

// Sonic 
const sonicSketch = c => {
    // Objects
    var sonic;
    var ground;
    var ground = [];
    var cactuses = [];
    var clouds = [];

    var cactusWaitime = 2;
    var minCactusWaitTime = 2;

    // Boolean vars
    var isCactusTime = true;
    var isPlaying = false;
    c.playerIsDead = false;
    c.hasReloaded = false;
    c.isTimerDone = false;
    var isGameLaunched = false;

    var ground_img;

    // Other variables
    c.graphics;
    var frameCounter = 0;
    // Collsion
    c.score = 0;
    var cnv;
    var timer = 2;

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
        // cnv.style('z-index', -1);

        // Ground Properties
        ground.img = ground_img;
        ground.x = 20;
        ground.y = c.height - 30;
        ground.w = c.width;
        ground.h = 20;

        ground = new Ground(c, ground_img);
        var btnTxt = document.getElementById("last-play-btn").textContent;
        console.log("setup is called")

        // if (c.hasReloaded) {
        //     if (!isGameLaunched) {
        //         isGameLaunched = true;
        //         isPlaying = true;

        //         $("#last-play-btn").toggleClass("hidden");
        //     }
        // }

        $("#last-play-btn").click(function () {

            if (!isGameLaunched) {
                isGameLaunched = true;
                isPlaying = true;

            }
            $("#last-play-btn").toggleClass("hidden");
        });

        // Sonic 
        sonic = new Sonic(c);

        c.textAlign(c.CENTER, c.CENTER);
    };

    c.draw = function () {
        c.background(255);
        $("#last-card").hover(function () {
            $("#last-play-btn").removeClass("show")
        });

        if (isPlaying) {
            if (!c.isTimerDone) {
                c.textSize(40)
                if (timer > 0) {
                    c.text("" + timer, c.width / 2, c.height / 2);
                }
                if (c.frameCount % 60 == 0 && timer > 0) { // if the c.frameCount is divisible by 60, then a second has passed. it will stop at 0
                    timer -= 1;
                    c.text("" + timer, c.width / 2, c.height / 2);
                }
                if (timer == 0) {
                    c.isTimerDone = true;
                }
            }
            // console.log(c.isTimerDone)
            if (c.isTimerDone) {
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
                // console.log(c.playerIsDead)
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
                sonic.move(c);

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
                // console.log(c.playerIsDead)

                if (c.playerIsDead) {
                    frameCounter++;
                    // console.log("reload function was called")
                    if (frameCounter % 120 == 0) {
                        c.playerIsDead = false;
                        c.hasReloaded = true;
                        isGameLaunched = false;
                        isPlaying = false;
                        c.isTimerDone = false;

                        c.score = 0;

                        cactuses = [];
                        clouds = [];
                        $("#last-play-btn").click(function () {
                            c.setup();
                            $("#last-play-btn").toggleClass("hidden");
                        });


                        $("#contact-brand").animate({
                            left: "10px",
                            opacity: 1
                        });

                        $("#contact-info").animate({
                            top: '0px'
                        });
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
        if (c.key == ' ') {
            sonic.jump();
            // console.log('spacebar');
        }
    }

    c.mousePressed = function () {
        if (c.mouseX < c.width && c.mouseX > 0 && c.mouseY < c.height && c.mouseY > 0) {
            sonic.jump(c);
        }
    }
}


var myp5_bubblePopperSketch = new p5(bubblePopper);
var myp5_brickBreakerSketch = new p5(brickBreakerSketch);
var myp5_sonicSketch = new p5(sonicSketch);