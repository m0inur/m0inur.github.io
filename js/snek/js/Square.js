function Square(c, w, h, rgb, randCoord, type) {
    if (randCoord === undefined) {
        randCoord = false;
    }
    c.width -= w / 2;
    c.height -= h / 2;
    if (randCoord) {
        this.x = c.random(0, c.width);
        this.y = c.random(0, c.height);
    } else {
        this.x = 0;
        this.y = 0;
    }
    this.w = w;
    this.h = w;
    this.show = function (c) {
        if (type == "snake") {
            c.noStroke();
            c.fill("red")
            c.rect(this.x, this.y, this.w, this.h);
        } else if (type == "food") {
            c.image(c.heart, this.x, this.y, this.w, this.h);
        }
    };

    this.rewind = function (c) {
        // this.x = c.random(0, c.width);
        // this.y = c.random(0, c.height);
        this.x = c.random(0 + 20, c.width - 20);
        this.y = c.random(0 + 20, c.height - 20);
    };
}