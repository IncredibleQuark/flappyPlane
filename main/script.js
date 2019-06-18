const canvasSize = {
    canvasWidth: 800,
    canvasHeight: 400,
};
const foregroundHeight = canvasSize.canvasHeight / 10;
let gravity = 1;
let velocity = 1;
let horizontalGap = Math.round(canvasSize.canvasWidth / 5);
let verticalGap = Math.round(canvasSize.canvasHeight / 5);
const planePosition = {
    x: Math.round(canvasSize.canvasWidth / 70),
    y: Math.round(canvasSize.canvasHeight / 3),
};

const hook = document.getElementById('game-div');
const canvas = document.createElement('canvas');
canvas.setAttribute('id', 'canvas');
canvas.setAttribute('width', canvasSize.canvasWidth);
canvas.setAttribute('height', canvasSize.canvasHeight);
hook.appendChild(canvas);
const ctx = canvas.getContext('2d');

// setInterval(() => {
//     velocity += 0.5;
//     horizontalGap -= 50;
// }, 10000);
moveUp = () => {
    planePosition.y -= 40;
};
document.addEventListener('keyup', (key) => {
    if (key.keyCode === 32) {
        moveUp();
    }
});

loadImages = () => {
    const background = new Image();
    background.src = `/assets/images/background2.png`;

    const plane = new Image();
    plane.src = '/assets/images/plane.png';

    const foreground = new Image();
    foreground.src = '/assets/images/background.png';

    const hanoi = new Image();
    hanoi.src = '/assets/images/bottom/tall/hanoi.png';

    const eifel = new Image();
    eifel.src = '/assets/images/bottom/tall/eifel.png';

    const budda = new Image();
    budda.src = '/assets/images/bottom/tall/budda.png';

    const bigben = new Image();
    bigben.src = '/assets/images/bottom/tall/bigben.png';

    const jesus = new Image();
    jesus.src = '/assets/images/bottom/tall/jesus.png';

    const piza = new Image();
    piza.src = '/assets/images/bottom/tall/piza.png';

    const helicopter = new Image;
    helicopter.src = '/assets/images/helicopter.png';

    return {
        misc: {
            background,
            foreground,
            plane
        },
        bottomObstacles: {
            hanoi: {
                src: hanoi,
                ratio: 0.5,
                height: 200
            },
            // jesus: {
            //     src: jesus,
            //     ratio: 1,
            //     height: Math.floor(Math.random() * (500 - 100)) + 100,
            // },
            // piza: {
            //     src: piza,
            //     ratio: 1,
            //     height: Math.floor(Math.random() * (500 - 100)) + 100,
            // },
            // budda: {
            //     src: budda,
            //     ratio: 1,
            //     height: Math.floor(Math.random() * (500 - 100)) + 100,
            // },
            // bigben: {
            //     src: bigben,
            //     ratio: 0.5,
            //     height: Math.floor(Math.random() * (500 - 100)) + 100,
            // },
            // eifel: {
            //     src: eifel,
            //     ratio: 1,
            //     height: Math.floor(Math.random() * (500 - 100)) + 100,
            // }
        },
        topObstacles: {

        }
    }
};

const images = loadImages();

const randomProperty = (obj) => {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};
let obstacles = [];

const randomInitBottomObstacle = randomProperty(images.bottomObstacles);
console.log(randomInitBottomObstacle);
obstacles.push({
    x: canvas.width,
    y: randomInitBottomObstacle.height - foregroundHeight,
    image: randomInitBottomObstacle
});

draw = () => {

    ctx.drawImage(images.misc.background, 0, 0);
    ctx.drawImage(images.misc.foreground, 0, canvasSize.canvasHeight - foregroundHeight, canvasSize.canvasWidth, foregroundHeight);
    ctx.drawImage(images.misc.plane, planePosition.x, planePosition.y, 50, 30);


    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstacles[i].image.src, obstacles[i].x, obstacles[i].y, obstacles[i].image.height * obstacles[i].image.ratio, obstacles[i].image.height);
        obstacles[i].x -= velocity;

        if (obstacles[i].x === 500) {
            const tallInitHeight = 200;
            const drawnObstacle = randomProperty(images.bottomObstacles);
            console.log(tallInitHeight);
            drawnObstacle.height = tallInitHeight;
            obstacles.push({
                x: canvas.width,
                y: tallInitHeight - foregroundHeight,
                image: drawnObstacle
            })
        }

        if (obstacles[i].x < -400) {
            obstacles.shift();
        }
    }

    planePosition.y += gravity;

    requestAnimationFrame(draw);

};
draw();
