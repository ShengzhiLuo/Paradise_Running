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
            this.image = document.getElementById('playerImage');
        }
        draw(context) {
            context.fillStyle = "white";
            context.fillRect(this.x, this.y, this.width, this.height);
            // context.drawImage(this.image, 0, 0); 
        }
        update() {
            this.x++;
        }
         
    };

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.draw(ctx);
        player.update();
        requestAnimationFrame(animate);
    }
    animate();


    class platform {
     
    };
    
});




