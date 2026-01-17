let playerScore = 0
let paddle
let ball
let bricks
let gameState

function setup() {
  createCanvas(617, 250)

  var heroCard = $("#hero-card");
  var heroW = heroCard.innerWidth() - 29;
  var heroH = heroCard.innerHeight();

  var heroX = heroCard.position();
  // console.log(heroW)

  cnv = createCanvas(heroW, heroH);
  cnv.parent = $('#hero-card');

  cnv.position(heroX.left + 38, heroX.top);
  cnv.style('z-index', -1);

  let colors = createColors()
  gameState = 'playing'
  paddle = new Paddle()
  ball = new Ball(paddle)

  bricks = createBricks(colors)
}

function createColors() {
  const colors = []

  for (let i = 0; i < 10; i++) {
    colors.push(materialColor());
  }
  return colors
}

function createBricks(colors) {
  const bricks = []
  const rows = 4
  const bricksPerRow = 6
  const brickWidth = width / bricksPerRow
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(createVector(brickWidth * i, 15 * row), brickWidth, 15, colors[floor(random(0, colors.length))])
      bricks.push(brick)
    }
  }
  return bricks
}

function draw() {
  if (gameState === 'playing') {
    background(255)

    ball.bounceEdge()
    ball.bouncePaddle()

    ball.update()

    if (keyIsDown(LEFT_ARROW)) {
      paddle.move('left')
    } else if (keyIsDown(RIGHT_ARROW)) {
      paddle.move('right')
    }
    
    console.log("Draw")
    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i]

      // If brick is colliding with ball
      if (brick.isColliding(ball)) {
        ball.reverse('y')
        bricks.splice(i, 1)
        playerScore += brick.points
      } else {
        brick.display()
      }
    }

    paddle.display()
    ball.display()

    textSize(32)
    fill(255)
    text(`Score:${playerScore}`, width - 150, 50)

    if (ball.belowBottom()) {
      gameState = 'Lose'
    }

    if (bricks.length === 0) {
      gameState = 'Win'
    }
  } else {
    textSize(100)
    gameState === 'Lose' ? fill(255, 0, 255) : fill(255)
    text(`You ${gameState}!!!`, width / 2 - 220, height / 2)
  }
}

$(document).ready(function () {
  $(window).resize(function () {
    var heroCard = $("#hero-card");
    var heroW = heroCard.innerWidth() - 29;
    var heroH = heroCard.innerHeight();

    var heroX = heroCard.position();

    resizeCanvas(heroW, heroH);
    cnv.position(heroX.left + 38, heroX.top);
  });
});