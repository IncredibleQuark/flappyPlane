const canvasSize = {
    canvasWidth: 800,
    canvasHeight: 400,
};
const foregroundHeight = canvasSize.canvasHeight / 10;
const initialGravity = 1;
let gravity = initialGravity;
const initialVelocity = 4;
let velocity = initialVelocity;
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

setInterval(() => {
    velocity += 0.25;
    gravity += 0.1;
    // horizontalGap -= 50;
}, 13000);


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
    hanoi.src = '/assets/images/bottom/hanoi.png';

    const eifel = new Image();
    eifel.src = '/assets/images/bottom/eifel.png';

    const budda = new Image();
    budda.src = '/assets/images/bottom/budda.png';

    const bigben = new Image();
    bigben.src = '/assets/images/bottom/bigben.png';

    const jesus = new Image();
    jesus.src = '/assets/images/bottom/jesus.png';

    const piza = new Image();
    piza.src = '/assets/images/bottom/piza.png';

    const liberty = new Image();
    liberty.src = '/assets/images/bottom/liberty.png';

    const coloseum = new Image();
    coloseum.src = '/assets/images/bottom/coloseum.png';

    const moscow = new Image();
    moscow.src = '/assets/images/bottom/moscow.png';

    const sphinx = new Image();
    sphinx.src = '/assets/images/bottom/sphinx.png';

    const sydney = new Image();
    sydney.src = '/assets/images/bottom/sydney.png';

    const tajmahal = new Image();
    tajmahal.src = '/assets/images/bottom/tajmahal.png';

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
                type: "bottom"
            },
            jesus: {
                src: jesus,
                ratio: 1,
                height: randomHeight(),
                type: "bottom"
            },
            piza: {
                src: piza,
                ratio: 0.8,
                height: randomHeight(),
                type: "bottom"
            },
            budda: {
                src: budda,
                ratio: 1,
                height: randomHeight(),
                type: "bottom"
            },
            bigben: {
                src: bigben,
                ratio: 0.3,
                height: randomHeight(),
                type: "bottom"
            },
            eifel: {
                src: eifel,
                ratio: 0.5,
                height: randomHeight(),
                type: "bottom"
            },
            liberty: {
                src: liberty,
                ratio: 0.5,
                height: randomHeight(),
                type: "bottom"
            },
            coloseum: {
                src: coloseum,
                ratio: 1.5,
                height: randomHeight(),
                type: "bottom"
            },
            moscow: {
                src: moscow,
                ratio: 1,
                height: randomHeight(),
                type: "bottom"
            },
            sphinx: {
                src: sphinx,
                ratio: 1.2,
                height: randomHeight(),
                type: "bottom"
            },
            sydney: {
                src: sydney,
                ratio: 1.5,
                height: randomHeight(),
                type: "bottom"
            },
            tajmahal: {
                src: tajmahal,
                ratio: 1.2,
                height: randomHeight(),
                type: "bottom"
            }
        },
        topObstacles: {
            plane2: {
                src: plane2,
                ratio: 2,
                height: planeSize.height,
                type: "top"
            },
            plane3: {
                src: plane3,
                ratio: 2,
                height: planeSize.height,
                type: "top"
            },
            helicopter: {
                src: helicopter,
                ratio: 1.2,
                height: planeSize.height,
                type: "top"
            },
        }
    }
};

const images = loadImages();
let obstacles = [];
let horizontalGap = generateHorizontalGap();

generateTopObstacleYPosition = (bottomObstacleHeight) => {
    return Math.round(Math.random() * (canvasSize.canvasHeight - bottomObstacleHeight - foregroundHeight - planeSize.height));
};

generateTopObstacleXPosition = () => {
    return Math.round(Math.random() * ((canvasSize.canvasWidth) - (canvasSize.canvasWidth - canvasSize.canvasWidth / 5)) + canvasSize.canvasWidth - canvasSize.canvasWidth / 5);
};

updateObstacles = (randomBottomObstacle) => {

    obstacles.push({
        x: canvasSize.canvasWidth,
        y: canvasSize.canvasHeight - randomBottomObstacle.height - foregroundHeight,
        image: randomBottomObstacle
    });
    const randomInitTopObstacle = randomProperty(images.topObstacles);
    const topObstacleYPosition = generateTopObstacleYPosition(randomBottomObstacle.height);
    const topObstacleXPosition = generateTopObstacleXPosition();

    obstacles.push({
        x: topObstacleXPosition,
        y: topObstacleYPosition,
        image: randomInitTopObstacle
    })
};

moveUp = () => {
    planePosition.y -= gravity * 30;
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
        obstacles = [];
        const randomInitBottomObstacle = randomProperty(images.bottomObstacles);
        updateObstacles(randomInitBottomObstacle);
        resetPlanePosition();
        gameStarted = true;
        distance = 0;
        velocity = initialVelocity;
        gravity = initialGravity;
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


            const bottomObstacles = obstacles.filter((obs) => {
                return obs.image.type === "bottom";
            });
            const lastBottomObstacle = bottomObstacles[bottomObstacles.length - 1];

            if (lastBottomObstacle.x <= horizontalGap + velocity && lastBottomObstacle.x >= horizontalGap - velocity) {
                const tallInitHeight = randomHeight();
                const drawnBottomObstacle = randomProperty(images.bottomObstacles);
                drawnBottomObstacle.height = tallInitHeight;

                horizontalGap = generateHorizontalGap();
                updateObstacles(drawnBottomObstacle);
            }

            // delete old obstacles
            if (obstacles[i].x < -500) {
                obstacles.shift();
            }

            //loose condition
            const hitBottom = planePosition.y + planeSize.height >= canvasSize.canvasHeight - foregroundHeight;
            const hitTop = planePosition.y <= 0;
            const hitTopObstacle = (obstacles[i].image.type === "top") &&
                planePosition.x + planeSize.width >= obstacles[i].x &&
                planePosition.y >= obstacles[i].y &&
                planePosition.y <= obstacles[i].y + obstacles[i].image.height &&
                planePosition.y + planeSize.height >= obstacles[i].y &&
                planePosition.x <= obstacles[i].x + obstacles[i].image.height * obstacles[i].image.ratio;
            const hitBottomObstacle =
                (obstacles[i].image.type === "bottom") &&
                (planePosition.x + planeSize.width >= obstacles[i].x) &&
                (planePosition.x <= obstacles[i].x + obstacles[i].image.height * obstacles[i].image.ratio) &&
                (planePosition.y + planeSize.height >= canvasSize.canvasHeight - (obstacles[i].image.height + foregroundHeight));
            if (hitBottom || hitTop || hitBottomObstacle || hitTopObstacle) {
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
