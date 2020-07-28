function Snake(c, w, h, rgb, randCoord) {
    Square.call(this, c, w, h, rgb, randCoord, "snake");
    this.xspeed = 1;
    this.yspeed = 0;
    this.rise = 0;
    this.tail = [];
    this.crash = function (c, xTail, yTail) {
        var diff = c.dist(this.x, this.y, xTail, yTail);

        if (diff < 7) {
            return true;
        } else {
            return false;
        }
    };
    this.update = function (c) {
        if (this.rise === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }

        if (this.x > c.width) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = c.width;
        }

        if (this.y > c.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = c.height;
        }


        this.tail[this.rise - 1] = c.createVector(this.x, this.y);
        this.x += this.xspeed * this.w;
        this.y += this.yspeed * this.h;
    };

    this.dir = function (x, y) {
        if (this.tail.length > 0) {
            if (this.xspeed === 0) {
                if (this.yspeed !== -y) {
                    this.yspeed = y;
                }
            } else {
                this.yspeed = y;
            }

            if (this.yspeed === 0) {
                if (this.xspeed !== -x) {
                    this.xspeed = x;
                }
            } else {
                this.xspeed = x;
            }

        } else {
            this.xspeed = x;
            this.yspeed = y;
        }
    };

    this.eat = function (food) {
        var diff = c.dist(this.x, this.y, food.x, food.y);

        if (diff < 15) {
            return true;
        } else {
            return false;
        }
    };

    this.death = function () {
        c.playerHasDied = true;
        c.deadCounter++;

        c.fill(255)

        c.textSize(20);
        c.textFont(c.orbi);
        c.text("Game Over\n", c.width / 2 - 60, c.height / 2)
        c.text(c.score, c.width / 2, c.height / 2 + 30)

        if (c.deadCounter % 20 == 0) {
            c.playerHasDied = false;
            c.isPlaying = false;

            c.initObjects = false;
            c.setCanvas = false
            c.deadCounter = 0;
            c.score = 0;

            this.rise = 0;
            this.tail = [];

            $("#heart").css("opacity", "1");
            $("#heart").css("margin-top", "0px");
            $("#heart").css("position", "relative");
            $(".heart-icon").css("margin-bottom", "100px");

            $("#fourth-card-show").removeClass("show-fourth-card")
            $("#fourth-card-show").addClass("hide-fourth-card")

            $("#heart").css("opacity", "1");
            var fourthCard = $("#fourth-card");

            var fourthW = fourthCard.innerWidth() - 30;
            var fourthH = fourthCard.innerHeight();

            var fourthX = fourthCard.position();

            c.resizeCanvas(fourthW, fourthH);
            c.cnvs.position(fourthX.left + 39, fourthX.top + 68);
        }

    }
}