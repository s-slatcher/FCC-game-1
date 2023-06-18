/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numOfEnemies = 100;
const enemiesArr = [];

const enemyImage = new Image();
enemyImage.src = 'enemies/enemy1.png';
let gameFrame = 0;

canvas.addEventListener('click',(e) => {
    enemiesArr.forEach(element => {
        element.angleSpeed += Math.random();
    });
})

class Enemy {
    constructor(){
        
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.angle = 0;
        this.angleSpeed = Math.random() + 4;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.curve = Math.random() * 200 + 50;
    }
    update(){
        this.x = canvas.width/6 * Math.sin(this.angle * Math.PI/180) + (canvas.width/2 - this.width/2);
        this.y = canvas.height/6 * Math.cos(this.angle * Math.PI/180) + (canvas.height/2 - this.height/2);
        // this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;

        // this.y += Math.random() * 7.5 - 3.75;
        if (this.x + this.width < 0) this.x = canvas.width;
        if (gameFrame % this.flapSpeed === 0){
        this.frame > 4 ? this.frame = 0 : this.frame++
        }
        
    }
    draw(){
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, 
            this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height)
    }
}

for (let i = 0;i < numOfEnemies; i++){
    enemiesArr.push(new Enemy());
}

const enemy1 = new Enemy();
const enemy2 = new Enemy();


function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)
    enemiesArr.forEach(element => {
        element.update();
        element.draw();
    });
    requestAnimationFrame(animate);
    gameFrame++;
}

animate();
