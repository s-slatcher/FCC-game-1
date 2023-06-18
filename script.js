/**  @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
const collisionCanvas = document.getElementById("collision-canvas");
const ctxCollision = collisionCanvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;
ctx.font = '50px roboto'

let timeToNextMan = 0;
let manInterval = 500;
let lastTime = 0;
let oldMen = [];
let deaths = [];
let score = 0;

class Cursor {
    constructor(){
        this.image = new Image();
        this.image.src = 'water-gun.png'
        this.spriteWidth = 600;
        this.spriteHeight = 536;
        this.x = canvas.width - this.spriteWidth/2;
        this.y = canvas.height - this.spriteHeight;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y);
    }
    update(e){
        let mousePercentX = e.x/canvas.width;
        let mousePercentY = e.y/canvas.height;
        this.x = canvas.width - this.spriteWidth/2 - (canvas.width/5)*(1-mousePercentX);
        this.y = canvas.height - this.spriteHeight + (canvas.width/8)*(mousePercentY);
    }
}

const cursor = new Cursor();

class OldMan {
    constructor(scale){
        this.scale = scale;
        this.spriteWidth = 165;
        this.spriteHeight = 100;
        this.width = this.spriteWidth*this.scale;
        this.height = this.spriteHeight*this.scale;
        this.x = canvas.width;
        this.y = Math.random() * ((canvas.height -  this.height*2))
        this.directionX = (2.5) * scale;
        this.angle = 0;
        this.angleRate = scale;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'oldman.png' 
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = 100;
        this.randomRgb = getRandomRGB();
        this.color = `rgb(${this.randomRgb[0]},${this.randomRgb[1]},${this.randomRgb[2]}`
        
    }
    update(deltaTime){
        // if(this.y > canvas.height-this.height || this.y < 0) this.directionY *= -1;
        this.x -= this.directionX;
        this.y += Math.sin(this.angle)*2*this.scale;
        this.angle += 0.05*(1/this.scale);

        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltaTime;
        if (this.timeSinceFlap > this.flapInterval){
            this.timeSinceFlap = 0;
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            
        }
    }
    draw(){
        ctxCollision.fillStyle = this.color;
        ctxCollision.fillRect(this.x + (this.scale*30), this.y, 
        this.width - (this.scale*80), this.height);


        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, 
        this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)
        
    }
}


class DeathEffect {
    constructor(x,y,scale){
        this.image = new Image();
        this.image.src = 'oldman-hit.png'
        this.image2 = new Image();
        this.image2.src = 'water-gun-muzzle.png'
        this.scale = scale;
        this.spriteWidth = 165;
        this.spriteHeight = 100;
        this.width = this.spriteWidth*this.scale;
        this.height = this.spriteHeight*this.scale;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound1 = new Audio();
        this.sound2 = new Audio();
        this.sound1.src = `./death-sounds/${Math.floor(Math.random()*11+1)}.ogg`
        this.sound2.src = 'splash.wav'
        this.sound2.volume = 0.15;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 150;
        this.markedForDeletion = false;
    }
    update(deltaTime){
        if (this.frame === 0){
            this.sound2.play();
            this.sound1.play();
            
        }
        this.timeSinceLastFrame += deltaTime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.timeSinceLastFrame = 0;
            this.frame++
            if (this.frame > 5){
                this.markedForDeletion = true;
            }
        }
    }
    draw(){
        
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0,
            this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        if (this.frame < 3){
        ctx.drawImage(this.image2,cursor.x -160 ,cursor.y -100)
        }
        
    }
}



function getRandomRGB(){
    return colorArr = [Math.floor(Math.random()*225),
        Math.floor(Math.random()*225),
        Math.floor(Math.random()*225)];
    
}

window.addEventListener('mousemove',(e) => {
    cursor.update(e);
});

window.addEventListener('mousedown', function(e){
    const detectPixelColor = ctxCollision.getImageData(e.x,e.y,1,1);
    const pc = detectPixelColor.data;
    oldMen.forEach(object => {
        if (object.randomRgb[0] === pc[0]
            && object.randomRgb[1] === pc[1]
            && object.randomRgb[2] === pc[2] ){
                object.markedForDeletion = true;
                score++;
                if (score > 9){
                    drawWin();
                }
                deaths.push(new DeathEffect(object.x,object.y,object.scale))
                console.log(deaths[deaths.length-1].sound1.src)
                console.log(deaths[deaths.length-1].sound2.src)
                
        }
    })
})


function drawScore(){
    ctx.fillStyle = 'black';
    ctx.fillText('score: ' + score, 50, 75);
}

function drawWin(){
    const canvas3 = document.getElementById("winCanvas");
    const ctxCanvas3 = canvas3.getContext('2d');
    canvas3.style.opacity = '100';

    ctxCanvas3.font = '20px Arial'
    // ctxCanvas3.fillText('20 MEN SOAKED YOU WIN', canvas.width/2, canvas.height/2)
    ctxCanvas3.fillText('10 MEN SOAKED -- YOU WIN', 20, 50);

}

function animate(timestamp){
    ctxCollision.clearRect(0,0,canvas.width, canvas.height);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextMan += deltaTime;
    if (timeToNextMan > manInterval){
        timeToNextMan = 0;
        oldMen.push(new OldMan(Math.random() * 1.1 + 1));
        
        oldMen.sort((a,b) => {
            return a.width - b.width;
        })
    };
    
    drawScore();
    oldMen = oldMen.filter(obj => !obj.markedForDeletion);
    deaths = deaths.filter(obj => !obj.markedForDeletion);
    [...oldMen,...deaths].forEach(obj => obj.update(deltaTime));
    [...oldMen,...deaths].forEach(obj => obj.draw());
    
    cursor.draw();
    requestAnimationFrame(animate);
}

animate(0);