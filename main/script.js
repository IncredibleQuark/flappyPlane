const canvasSize = {
    canvasWidth: 800,
    canvasHeight: 400,
};
const foregroundHeight = canvasSize.canvasHeight / 10;
let gravity = 1;
let velocity = 4;
let gameStarted = false;
let distance = 0;

const planePosition = {};
resetPlanePosition = () => {
    planePosition.x = Math.round(canvasSize.canvasWidth / 70);
    planePosition.y = Math.round(canvasSize.canvasHeight / 3);
};

const planeSize = {
    width: canvasSize.canvasWidth * 0.12,
    height: canvasSize.canvasHeight * 0.08
};
const fontSize = {
    small: Math.round(canvasSize.canvasHeight / canvasSize.canvasWidth * 20),
    med: Math.round(canvasSize.canvasHeight / canvasSize.canvasWidth * 40)
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


const randomProperty = (obj) => {
    const copy = _.cloneDeep(obj);
    const keys = Object.keys(copy);
    return copy[keys[keys.length * Math.random() << 0]];
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
    helicopter.src = '/assets/images/top/helicopter.png';

    const plane2 = new Image();
    plane2.src = '/assets/images/top/plane2.png';

    const plane3 = new Image();
    plane3.src = '/assets/images/top/plane3.png';

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
                height: randomHeight(),
                name: "hanoi",
            },
            jesus: {
                src: jesus,
                ratio: 1,
                height: randomHeight(),
                name: "jesus",
            },
            piza: {
                src: piza,
                ratio: 0.8,
                height: randomHeight(),
                name: "piza",
            },
            budda: {
                src: budda,
                ratio: 1,
                height: randomHeight(),
                name: "budda",
            },
            bigben: {
                src: bigben,
                ratio: 0.3,
                height: randomHeight(),
                name: "bigben",
            },
            eifel: {
                src: eifel,
                ratio: 0.5,
                height: randomHeight(),
                name: "eifel",
            }
        },
        topObstacles: {
            plane2: {
                src: plane2,
                ratio: 2,
                height: planeSize.height,
                name: "plane2"
            },
            plane3: {
                src: plane3,
                ratio: 2,
                height: planeSize.height,
                name: "plane3",
            },
            helicopter: {
                src: helicopter,
                ratio: 1,
                height: planeSize.height,
                name: "helicopter"
            },
        }
    }
};

const images = loadImages();
let obstacles = [];
let horizontalGap = generateHorizontalGap();

generateTopObstacleYPosition = (bottomObstacleHeight) => {
  return Math.round(Math.random() * (canvasSize.canvasHeight - bottomObstacleHeight - foregroundHeight));
};

generateTopObstacleXPosition = () => {
    return Math.round(Math.random() * ((canvasSize.canvasWidth) - (canvasSize.canvasWidth - canvasSize.canvasWidth / 10) ) + canvasSize.canvasWidth - canvasSize.canvasWidth / 10);
};

clearObstacles = () => {
    obstacles = [];
    const randomInitBottomObstacle = randomProperty(images.bottomObstacles);
    obstacles.push({
        x: canvasSize.canvasWidth,
        y: canvasSize.canvasHeight - randomInitBottomObstacle.height - foregroundHeight,
        image: randomInitBottomObstacle
    });
    const randomInitTopObstacle = randomProperty(images.topObstacles);
    const topObstacleYPosition = generateTopObstacleYPosition(randomInitBottomObstacle.height);
    const topObstacleXPosition = generateTopObstacleXPosition();
    console.log(topObstacleXPosition);
    console.log(canvasSize.canvasWidth);
    obstacles.push({
        x: topObstacleXPosition,
        y: topObstacleYPosition,
        image: randomInitTopObstacle
    })
};

moveUp = () => {
    planePosition.y -= 30;
};

document.addEventListener('keyup', (key) => {
    if (key.keyCode === 32) {
        moveUp();
    }
});

initGameStartInfo = () => {
    ctx.font = `${fontSize.small}px 'Press Start 2P'`;
    ctx.fillStyle = 'red';
    ctx.fillText("Press space or tap to start", canvasSize.canvasWidth * 0.35, canvasSize.canvasHeight / 2 + canvasSize.canvasHeight * 0.1);
};

addStartListener = () => {
    document.addEventListener('keyup', startGame, false);
};

startGame = (key) => {

    if (key.keyCode === 32) {
            clearObstacles();
            resetPlanePosition();
            gameStarted = true;
            distance = 0;
    }
    document.removeEventListener('keyup', startGame, false);
};

gameOver = () => {
    ctx.font = `${fontSize.med}px 'Press Start 2P'`;
    ctx.fillStyle = 'red';
    ctx.fillText("Game Over", canvasSize.canvasWidth * 0.40, canvasSize.canvasHeight / 2);
    initGameStartInfo();
    gameStarted = false;
};

draw = () => {

    ctx.drawImage(images.misc.background, 0, 0);
    // ctx.fillStyle  = '#22243b';
    // ctx.fillRect(0, 0, canvasSize.canvasWidth, canvasSize.canvasHeight);
    ctx.drawImage(images.misc.foreground, 0, canvasSize.canvasHeight - foregroundHeight, canvasSize.canvasWidth, foregroundHeight);
    ctx.drawImage(images.misc.plane, planePosition.x, planePosition.y, planeSize.width, planeSize.height);
    ctx.font = `${fontSize.small} 'Press Start 2P'`;
    ctx.fillStyle = 'black';
    ctx.fillText(`Distance: ${distance} km`, canvasSize.canvasWidth * 0.75, canvasSize.canvasHeight * 0.05);

    if (gameStarted) {
        for (let i = 0; i < obstacles.length; i++) {
            ctx.drawImage(obstacles[i].image.src, obstacles[i].x, obstacles[i].y, obstacles[i].image.height * obstacles[i].image.ratio, obstacles[i].image.height);
            obstacles[i].x -= velocity;


            if (obstacles[obstacles.length - 1].x === horizontalGap) {
                const tallInitHeight = randomHeight();
                const drawnBottomObstacle = randomProperty(images.bottomObstacles);

                horizontalGap = generateHorizontalGap();

                drawnBottomObstacle.height = tallInitHeight;
                obstacles.push({
                    x: canvasSize.canvasWidth,
                    y: canvasSize.canvasHeight - tallInitHeight - foregroundHeight,
                    image: drawnBottomObstacle
                });

                const drawnTopObstacle= randomProperty(images.topObstacles);
                const topObstacleYPosition = generateTopObstacleYPosition(drawnBottomObstacle.height);
                obstacles.push({
                    x: generateTopObstacleXPosition(),
                    y: topObstacleYPosition,
                    image: drawnTopObstacle
                });
            }

            // delete old obstacles
            if (obstacles[i].x < -500) {
                obstacles.shift();
            }

            //loose condition
            const hitBottom = planePosition.y + planeSize.height >= canvasSize.canvasHeight - foregroundHeight;
            const hitTop = planePosition.y <= 0;
            const hitObstacle = (planePosition.x + planeSize.width >= obstacles[i].x) && (planePosition.y + planeSize.height >= canvasSize.canvasHeight - (obstacles[i].image.height + foregroundHeight));
            if (hitBottom || hitTop || hitObstacle) {
                gameOver();
            }
        }

        planePosition.y += gravity;
        distance += 1;
    } else {
        initGameStartInfo();
        addStartListener();
        if (distance > 0) {
            gameOver();
        }
    }
    requestAnimationFrame(draw);

};
draw();
