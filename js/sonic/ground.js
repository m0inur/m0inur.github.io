function Ground(c) {
    this.x = 0;

    this.move = function (vx) {
        if (!c.playerIsDead) {
            this.x += -vx;

            if (this.x <= -c.width - 38) {
                this.x = 0;
            }
        } else {
            vx = 0;
        }
    }

    this.draw = function () {

        c.image(c.ground_img, this.x, c.height - 45);
    }
}