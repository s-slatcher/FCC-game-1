let playerState = 'idle'
const animationsSelect = document.querySelectorAll("#animations > option");
document.getElementById("animations").onchange = (e) =>{
    playerState = e.target.value;
}

animationsSelect.forEach((e) => {
    e.innerHTML = e.value;
})

const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'images/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
let gameFrame = 0;
let straggerFrame = 5;





const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
]

animationStates.forEach((state,index) => {
    let frames = {
        loc: []
    }
    for (j = 0; j < state.frames; j++){
        let posX = j * spriteWidth;
        let posY = index * spriteHeight;
        frames.loc.push({x:posX, y: posY});
    }
    spriteAnimations[state.name] = frames
    
})
console.log(spriteAnimations);
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/straggerFrame) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;


    ctx.drawImage(playerImage, frameX, frameY, 
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
    
    

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();
console.log("hello")