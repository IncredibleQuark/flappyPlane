// let _ = require('lodash');

const canvasSize = {
    canvasWidth: 800,
    canvasHeight: 400,
};
const foregroundHeight = canvasSize.canvasHeight / 10;
let gravity = 1;
let velocity = 4;

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
//     velocity += 1;
//     // gravity += 1;
//     horizontalGap -= 50;
// }, 10000);
moveUp = () => {
    planePosition.y -= 30;
    // for(let i =0; i < 10; i++) {
    //     planePosition.y -= 1;
    //     requestAnimationFrame(moveUp)
    // }
};
document.addEventListener('keyup', (key) => {
    if (key.keyCode === 32) {
        moveUp();
    }
});

const randomProperty = (obj) => {
    const copy = _.cloneDeep(obj);
    const keys = Object.keys(copy);
    return copy[keys[ keys.length * Math.random() << 0]];
};
const randomHeight = () => {
    return Math.floor(Math.random() * (canvasSize.canvasHeight / 2 - canvasSize.canvasHeight / 10)) + canvasSize.canvasHeight / 10;
};

const generateHorizontalGap = () => {
    //change gap between obstacles randomly
    return Math.floor(Math.floor(Math.random() * (canvasSize.canvasWidth - 10 + velocity)) / velocity) * velocity;
};

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
                height: randomHeight()
            },
            jesus: {
                src: jesus,
                ratio: 1,
                height: randomHeight(),
            },
            piza: {
                src: piza,
                ratio: 0.8,
                height: randomHeight(),
            },
            budda: {
                src: budda,
                ratio: 1,
                height: randomHeight(),
            },
            bigben: {
                src: bigben,
                ratio: 0.3,
                height: randomHeight(),
            },
            eifel: {
                src: eifel,
                ratio: 0.5,
                height: randomHeight(),
            }
        },
        topObstacles: {

        }
    }
};

const images = loadImages();

let obstacles = [];
let horizontalGap = generateHorizontalGap();
const randomInitBottomObstacle = randomProperty(images.bottomObstacles);
obstacles.push({
    x: canvasSize.canvasWidth,
    y: canvasSize.canvasHeight - randomInitBottomObstacle.height - foregroundHeight,
    image: randomInitBottomObstacle
});


draw = () => {

    ctx.drawImage(images.misc.background, 0, 0);
    // ctx.fillStyle  = '#22243b';
    // ctx.fillRect(0, 0, canvasSize.canvasWidth, canvasSize.canvasHeight);
    ctx.drawImage(images.misc.foreground, 0, canvasSize.canvasHeight - foregroundHeight, canvasSize.canvasWidth, foregroundHeight);
    ctx.drawImage(images.misc.plane, planePosition.x, planePosition.y, 50, 30);

    for (let i = 0; i < obstacles.length; i++) {
        ctx.drawImage(obstacles[i].image.src, obstacles[i].x, obstacles[i].y, obstacles[i].image.height * obstacles[i].image.ratio, obstacles[i].image.height);
        obstacles[i].x -= velocity;


        if (obstacles[obstacles.length - 1].x === horizontalGap) {
            const tallInitHeight = randomHeight();
            const drawnObstacle = randomProperty(images.bottomObstacles);

            horizontalGap = generateHorizontalGap();

            drawnObstacle.height = tallInitHeight;
            obstacles.push({
                x: canvasSize.canvasWidth,
                y: canvasSize.canvasHeight - tallInitHeight - foregroundHeight,
                image: drawnObstacle
            })
        }

        if (obstacles[i].x < -500) {
            obstacles.shift();
        }
    }

    planePosition.y += gravity;

    requestAnimationFrame(draw);

};
draw();
