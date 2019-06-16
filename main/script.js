const canvasSize = {
    canvasWidth: 700,
    canvasHeight: 500,
};
let gravity = 1;
let velocity = 1;
const planePosition = {
    x: 10,
    y: 150,
};

const hook = document.getElementById('game-div');
const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
canvas.setAttribute('width', canvasSize.canvasWidth);
canvas.setAttribute('height', canvasSize.canvasHeight);
hook.appendChild(canvas);
const ctx = canvas.getContext('2d');

setInterval(() => {
    velocity += 1;
}, 10000);

moveUp = () => {
    planePosition.y -= 40;
};

document.addEventListener('keyup', (key) => {
    if (key.keyCode === 32) {
        moveUp();
    }
});

let obstacles = [];

obstacles[0] = {
    x: canvas.width,
    y: canvas.height - 248
};

draw = () => {

    const background = new Image(200, 200);
    background.src = `/assets/images/background2.png`;

    const plane = new Image(500, 500);
    plane.src = '/assets/images/plane.png';

    const fg = new Image(100, 100);
    fg.src = '/assets/images/background.png';

    ctx.drawImage(background, 0, 0);
    ctx.drawImage(fg, 0, canvas.height - 50, 700, 50);
    ctx.drawImage(plane, planePosition.x, planePosition.y, 50, 30);

    const hanoi = new Image(100, 100);
    hanoi.src = '/assets/images/hanoi.png';

    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(hanoi, obstacles[i].x, obstacles[i].y, 100, 200);
        obstacles[i].x -= velocity;

        if (obstacles[i].x === 500) {
            obstacles.push({
                x: canvas.width,
                y: canvas.height - 248
            })
        }
    }

    planePosition.y += gravity;

    requestAnimationFrame(draw);
    // bird.addEventListener("load", () => {
    //     ctx.drawImage(bird, 50, 50);
    // }, false)
};
draw();
