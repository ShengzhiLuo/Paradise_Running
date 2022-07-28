export default class Background {
    constructor(gamewidth, gameheight) {
        this.gameWidth = gamewidth;
        this.gameHeight = gameheight;
        this.width = 2400;
        this.height = 600;
        this.x = 0;
        this.y = 0;
        this.image = document.getElementById("backgroundImage");
    }
    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width - 7, this.y, this.width, this.height);
    }   
    update() {
        this.x -= 10;
        if (this.x < -this.width) {
            this.x = 0;
        }
    }
}