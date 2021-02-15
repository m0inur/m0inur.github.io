class Object {
    constructor(c, x, y, vx, width, height, img) {
        this.x = x;
        this.y = y;
        this.vx = vx;

        this.width = width;
        this.height = height;

        this.img = img;
    }

    draw() {
        console.log("object draw method")
        c.image(this.img, this.x, this.y + this.width - 10, this.width + 10, this.height + 15);
    }
}