import handlePlatforms from './handleplatform';


export default class Player {
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
        context.drawImage(this.run_image, this.frameX * this.width, this.frameY * this.height, this.width,this.height, this.x, this.y, this.width, this.height);
    } 
    update(input, deltaTime, platforms) {
        // debugger;
        platforms = handlePlatforms(0);
        platforms.forEach((platform) => {
            if (this.onPlatform(platform)) {
                this.vy = 0;
                // this.y += 1;
            };
        })
        // collision detection
        if (input.keys.indexOf("ArrowUp") !== -1) {   
            this.vy = -22;               
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
    onPlatform(platform) {
        return this.x + this.width >= platform.x && this.x <= platform.x + platform.width && this.y + this.height >= platform.y + platform.height - 60 && this.y <= platform.y + platform.height;
    }
     
};