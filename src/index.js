// import InputHandler from './scripts/input.js';
// import Player from './scripts/player.js';
// import Platform from './scripts/platform.js';
// import handlePlatforms  from './scripts/handleplatform.js';
// import Background from './scripts/background.js';
// import displayScore from './scripts/display.js';



window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1100;
    canvas.height = 600;
    let score = 0;
    let gameover = false;
    let jump = false;


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
            this.maxFrameY = 10;
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
            context.drawImage(this.run_image, this.frameX * this.width, this.frameY * this.height, this.width,this.height, this.x, this.y, this.width, this.height);
        }  
        update(input, deltaTime, platforms) {
            // debugger;
            platforms.forEach((platform) => {
                if (this.onPlatform(platform)) {
                    this.vy = 0;
                    jump = true;
                    // this.y += 1;
                };
                if (this.onGround()) {
                    if (this.x + this.width >= platform.x) {
                        gameover = true;
                    }
                }
            });
            
            // collision detection
            if (input.keys.indexOf("ArrowUp") !== -1 && jump){   
                this.vy = -18;
                // if (this.frameTimer > this.frameInterval) {                        
                //     if (this.frameX >= this.maxFrameY) this.frameX = 0;
                //         else this.frameX++;
                //         this.frameTimer = 0;
                //         } else {
                //             this.frameTimer += deltaTime;
                //         }            
                if (this.frameX >= this.maxFrameY) this.frameX = 0;
                else this.frameX++;
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
                    // this.frameY = -1;
            } else {          
                this.vy = 0;
                jump = true;
                    // this.frameY = 0;
            }
            if (this.y > this.gameHeight - this.height) {            
                this.y = this.gameHeight - this.height;         
            } 
            if (this.y < 0) {            
                this.y = 0;         
            }
            
            
        }

        onGround() {
            return this.y + this.height >= this.gameHeight;
        }
        onPlatform(platform) {
            return this.x + this.width >= platform.x && this.x <= platform.x + platform.width && this.y + this.height >= platform.y + platform.height - 80 && this.y <= platform.y + platform.height;
        } 
        Jumponce(platforms) {
            platforms.forEach((platform) => {
                if (this.onPlatform(platform)) {
                    return true;
                }
                else if (this.onGround()) {
                    return true;
                }
                else {
                    return false;
                }
            });
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


    class Platform {
        constructor(x,y) {
            this.x = x;
            this.y = y;
            this.width = 200;
            this.height = 150; 
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
        if (gameover) {
            context.font = "100px Arial";
            context.textAlign = "center";
            context.fillStyle = "red";
            context.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        }
    } 

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);
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
        if (!gameover) requestAnimationFrame(animate);
    }

    const title = document.getElementById("titleScreen");
    const instruction = document.getElementById("instructionScreen");
    console.log(title);
    window.addEventListener("click", () => {
        title.style.display = "none";
        instruction.style.display = "none";
        // instructions.style.display = "block";
        animate(0);
    });
    
    
});






