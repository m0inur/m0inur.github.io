function Square(c, w, h, rgb, randCoord, type) {
    if (randCoord === undefined) {
        randCoord = false;
    }
    if (randCoord) {
        this.x = c.width / 2 + 4;
        this.y = 150 / 2 - 27;
    } else {
        this.x = 0;
        this.y = 0;
    }
    this.w = w;
    this.h = w;
    this.show = function (c) {
        if (type == "snake") {
            if (!c.initObjects) {
                this.x = 0;
                this.y = 0;
            }
            c.noStroke();
            if (!darkMode) {
                c.fill("#01C2FF")
            } else {
                c.fill("#44abff")
            }
            // console.log(this.x + " " + this.y)
            c.rect(this.x, this.y, this.w, this.h);
        } else if (type == "food") {
            if (!c.initObjects) {
                this.x = c.width / 2 + 4;
                this.y = 150 / 2 - 26;
                c.image(c.heart, this.x, this.y, this.w, this.h);
                c.initObjects = true;
            }

            if (c.initObjects) {
                c.image(c.heart, this.x, this.y, this.w, this.h);
            }
        }
    };

    this.rewind = function (c) {
        this.x = c.random(0 + 20, c.width - 20);
        this.y = c.random(0 + 20, c.height - 20);
    };
}