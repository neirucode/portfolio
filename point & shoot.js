const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
canvas.width = 1000; // Set to your desired width
canvas.height = 600; // Set to your desired height

const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d', { willReadFrequently: true });
collisionCanvas.width = 1000; // Set to your desired width
collisionCanvas.height = 600; // Set to your desired height

let score = 0;
let gameOver = false;
let gameSpeed = 1;
let lastTime = 0;
ctx.font = '50px Impact';

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'gameResources/bg/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'gameResources/bg/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'gameResources/bg/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'gameResources/bg/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'gameResources/bg/layer-5.png';

function startGame() {
    gameOver = false;
    score = 0;
    gameSpeed = 1; 
    lastTime = 0;  
    ravens = [];
    explosions = [];
    particles = [];
    animate(0);
}

function isClickInsideCanvas(x, y) {
    const rect = canvas.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

window.addEventListener('click', function (e) {
    const x = e.clientX;
    const y = e.clientY;

    if (gameOver && isClickInsideCanvas(x, y)) {
        alert('Game over! Your score is: ' + score + '. Please reload the page to start a new game.');
        return;
    }

    if (!gameOver && isClickInsideCanvas(x, y)) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = x - rect.left;
        const canvasY = y - rect.top;
        const detectPixelColor = collisionCtx.getImageData(canvasX, canvasY, 1, 1).data;

        ravens.forEach(object => {
            if (object.randomColors[0] === detectPixelColor[0] &&
                object.randomColors[1] === detectPixelColor[1] &&
                object.randomColors[2] === detectPixelColor[2]) {
                object.markedForDeletion = true;
                score++;
                explosions.push(new Explosion(object.x, object.y, object.width));
            }
        });
    }
});

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update() {
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x -= this.speed;
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

let timeToNextRaven = 0;
let ravenInterval = 500;

let ravens = [];
class Raven {
    constructor() {
        this.spriteWidth = 475;
        this.spriteHeight = 470;
        this.sizeModifier = Math.random() * 0.3 + 0.2;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 3 + 1;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = 'gameResources/enemies/alienbat.png';
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];
        this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`;
        this.hasTrail = Math.random() > 0.5;
    }

    update(deltatime) {
        this.x -= this.directionX * gameSpeed; // Increase speed with gameSpeed
        this.y += this.directionY;
        if (this.y < 0 || this.y > canvas.height - this.height) {
            this.directionY *= -1;
        }
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval) {
            this.frame = (this.frame > this.maxFrame) ? 0 : this.frame + 1;
            this.timeSinceFlap = 0;
            if (this.hasTrail) {
                for (let i = 0; i < 5; i++) {
                    particles.push(new Particle(this.x, this.y, this.width, this.color));
                }
            }
        }
        if (this.x < 0 - this.width) gameOver = true;
    }

    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
    }
}

let explosions = [];
class Explosion {
    constructor(x, y, size) {
        this.image = new Image();
        this.image.src = 'gameResources/reso/boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'gameResources/reso/Fire impact 1.wav';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 200;
        this.markedForDeletion = false;
    }

    update(deltatime) {
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval) {
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 5) this.markedForDeletion = true;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
            this.x, this.y - this.size / 4, this.size, this.size);
    }
}

let particles = [];
class Particle {
    constructor(x, y, size, color) {
        this.size = size;
        this.x = x + this.size / 2 + Math.random() * 50 - 25;
        this.y = y + this.size / 3 + Math.random() * 50 - 25;
        this.radius = Math.random() * this.size / 10;
        this.maxRadius = Math.random() * 20 + 35;
        this.markedForDeletion = false;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
    }

    update() {
        this.x += this.speedX;
        this.radius += 0.3;
        if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = 1 - this.radius / this.maxRadius;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function drawScore() {
    ctx.font = '50px Impact';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 20, 20); // Adjusted position
    ctx.fillStyle = '#9747ff';
    ctx.fillText('Score: ' + score, 22, 22); // Slightly offset for better readability
}

function drawGameOver() {
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = '#9747ff';
    ctx.fillText('GAME OVER, your score is ' + score, canvas.width / 2 + 4, canvas.height / 2 + 4);
}

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the delta time
    let deltatime = timestamp - lastTime;
    lastTime = timestamp; // Update lastTime to the current timestamp

    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });

    timeToNextRaven += deltatime;
    if (timeToNextRaven > ravenInterval) {
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort((a, b) => a.width - b.width);
    }

    if (!gameOver) {
        gameSpeed += deltatime * 0.0001; // Increase game speed over time only when the game is running
    }

    drawScore();
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...particles, ...ravens, ...explosions].forEach(object => object.draw());
    ravens = ravens.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    particles = particles.filter(object => !object.markedForDeletion);

    if (!gameOver) {
        requestAnimationFrame(animate);
    } else {
        drawGameOver();
    }
}

// Initialize the game
startGame();
