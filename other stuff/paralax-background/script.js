const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const slider = document.getElementById("slider");
let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'images/layer-1.png'
const backgroundLayer1New = new Image();
backgroundLayer1New.src = 'images/layer-1-new.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'images/layer-2.png'
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'images/layer-3.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'images/layer-4.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'images/layer-5.png'

window.addEventListener('load', function(){

slider.value = gameSpeed;
slider.onchange = (e) => {
    console.log("gfsddfks")
    gameSpeed = e.target.value;
};

class Layer {
    constructor(img,speedMod){
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // this.x2 = this.width;
        this.img = img;
        this.speedMod = speedMod;
        this.speed = gameSpeed*this.speedMod;
    }
    update(){
        this.speed = gameSpeed * this.speedMod;
        if (this.x <= -this.width){
            this.x = 0;
        }
        // if (this.x2 <= -this.width){
        //     this.x2 = this.width + this.x - this.speed
        // }  
        this.x = Math.floor(this.x - this.speed);
        // this.x2 = Math.floor(this.x2 - this.speed);

    }
    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height)
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5]

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_WIDTH);
    gameObjects.forEach((obj) => {
        obj.update();
        obj.draw();
    })
    
    
    requestAnimationFrame(animate);
}


animate();
})