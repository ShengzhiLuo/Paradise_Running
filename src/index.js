window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1100;
    canvas.height = 600;

    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', a => {
                if (a.key === "ArrowUp" && this.keys.indexOf(a.key) === -1) {
                    this.keys.push(a.key);
                }
                console.log(a.key, this.keys);
            });
            window.addEventListener('keyup', a => {
                if (a.key === "ArrowUp") {
                    this.keys.splice(this.keys.indexOf(a.key), 1);
                }
                console.log(a.key, this.keys);
            });
            window.addEventListener('keydown', a => {
                if (a.key === "ArrowRight" && this.keys.indexOf(a.key) === -1) {
                    this.keys.push(a.key);
                }
                console.log(a.key, this.keys);
            });
            window.addEventListener('keyup', a => {
                if (a.key === "ArrowRight") {
                    this.keys.splice(this.keys.indexOf(a.key), 1);
                }
                console.log(a.key, this.keys);
            });
        }
    };
    
    class Player {
        constructor(gamewidth, gameheight) {
            this.gameWidth = gamewidth;
            this.gameHeight = gameheight;
            this.width = 100;
            this.height = 100;
            this.x = 0;
            this.y = this.gameHeight - this.height; 
            this.image = document.getElementById("playerImage");
            // this.image = new Image();
            // this.image.src = "player_run.png";
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }
        draw(context) {
            // context.fillStyle = "white";
            // context.fillRect(this.x, this.y, this.width, this.height);
            // context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height,  this.width, this.height, this.x, this.y, this.width, this.height); 
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        update(input) {
            
            if (input.keys.indexOf("ArrowUp") !== -1 && this.onGround()) {
                this.vy = -32;
            } else if (input.keys.indexOf("ArrowRight") !== -1) {
                this.speed = 5;
            } else {
                this.speed = 0;
            }
            this.x += this.speed;
            if (this.x < 0) {
                this.x = 0;
            } else if (this.x > this.gameWidth - this.width) {
                this.x = this.gameWidth - this.width;
            }
            
            this.y += this.vy;
            if (!this.onGround()) {
                this.vy += this.weight;
                this.frameY = -1;
            } else {
                this.vy = 0;
                this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height) {
                this.y = this.gameHeight - this.height;
            }
        }

        onGround() {
            return this.y + this.height >= this.gameHeight;
        }
         
    };

    class Background {
        constructor(gamewidth, gameheight) {
            this.gameWidth = gamewidth;
            this.gameHeight = gameheight;
            this.width = 2400;
            this.height = 720;
            this.x = 0;
            this.y = 0;
            this.image = document.getElementById("backgroundImage");
            // this.image = new Image();
            // this.image.src = "background.png";
        }
        draw(context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - 7, this.y, this.width, this.height);
        }   
        update() {
            this.x -= 7;
            if (this.x < -this.width) {
                this.x = 0;
            }
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);   
        player.update(input);
        requestAnimationFrame(animate);
    }
    animate();
    
});




