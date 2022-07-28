export default class Platform {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 150; 
        let score = 0;
    }
    draw(context) {
        context.drawImage(document.getElementById("platformImage"), this.x, this.y, this.width, this.height);
    }
    update() { 
        this.x = this.x - 10;
        if (this.x < 0 - this.width) {
            score++;
        }
    }
}