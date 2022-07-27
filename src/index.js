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
            this.run_image = document.getElementById("playerImage_run");
            // this.jump_image = document.getElementById("playerImage_jump");
            this.width = 100;
            this.height = 100;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.frameX = 0;
            this.maxFrameX = 13;
            this.frameY = 0;
            this.maxFrameY = 11;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000 / this.fps;
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
            // this.sprite = {
            //     run: this.run_image, 
            //     jump: this.jump_image
            // }
            // this.currentSprite = this.sprite.run;

        }
        draw(context) {
            context.strokeStyle = "white";
            context.strokeRect(this.x, this.y, this.width, this.height);
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width / 2, 0, 2 * Math.PI);
            // context.stroke();
            context.drawImage(this.run_image, this.frameX * this.width, this.frameY * this.height, this.width,this.height, this.x, this.y, this.width, this.height);
            // context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }  
        update(input, deltaTime, platforms) {
            // collision detection

            if (input.keys.indexOf("ArrowUp") !== -1 && this.onGround()) {
                this.vy = -22;
                // if (this.frameTimer > this.frameInterval) {
                //     if (this.frameX >= this.maxFrameY) this.frameX = 0;
                //     else this.frameX++;
                //     this.frameTimer = 0;
                // } else {
                //     this.frameTimer += deltaTime;
                // }
            } else if (input.keys.indexOf("ArrowRight") !== -1) {
                this.speed = 5;
                if (this.frameTimer > this.frameInterval) {
                    if (this.frameX >= this.maxFrameX) this.frameX = 0;
                    else this.frameX++;
                    this.frameTimer = 0;
                } else {
                    this.frameTimer += deltaTime;
                }
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
                // this.frameY = -1;
            } else {
                this.vy = 0;
                // this.frameY = 0;
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

    let score = 0;

    class Platform {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.width = 200;
            this.height = 150; 
        }
        draw(context) {
            context.strokeStyle = "white";
            context.strokeRect(this.x, this.y + 40, this.width, this.height - 70);
            // context.beginPath();
            // context.arc(this.x + this.width/2, this.y + this.height/2, this.width / 2, 0, 2 * Math.PI);
            // context.stroke();
            context.drawImage(document.getElementById("platformImage"), this.x, this.y, this.width, this.height);
        }
        update() { 
            this.x = this.x - 10;
            if (this.x < 0 - this.width) {
                score++;
            }
        } 
    }
    
    let platforms = [];
    function handlePlatforms(deltaTime) {
        if (platformTimer > platformInterval) {
            let x = 1100;
            let y = 550;
            for (let i = 0; i < 4; i++) {
                x += 300;
                y -= 100;
                let platform = new Platform(x, y);
                platforms.push(platform);
                
            }
            y = 150;
            for (let j = 0; j < 2; j++) {
                x += 300;
                y += 100;
                let  platform = new Platform(x,y);
                platforms.push(platform);
            }
            platformTimer = 0;
        } else {
            platformTimer += deltaTime;  
        };
        
        platforms.forEach(platform => {
            platform.draw(ctx);
            platform.update();
        });

    }
    function displayScore(context) {
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.fillText("Score: " + score, 20, 50);
    } 

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
    // console.log(platforms);
    // platforms.forEach(platform => { console.log(platform.x); });
    let lastTime = 0;
    let platformTimer = 0;
    let platformInterval = 3000;


    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);   
        player.update(input, deltaTime, platforms);
        handlePlatforms(deltaTime);
        displayScore(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
    
});




