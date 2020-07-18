function Ground() {
    var graphics = loadImage('js/sonic/assets/ground.png');
    this.x = 0;

    this.move = function (vx) {
        this.x += -vx;

        if (this.x <= -width - 38) {
            this.x = 0;
        }
    }

    this.draw = function () {
        image(graphics, this.x, height - 45);
    }
}