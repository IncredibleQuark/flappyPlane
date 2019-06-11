
insertCanvas = () => {
    const hook = document.getElementById('game-div');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas');
    canvas.setAttribute('width', '700');
    canvas.setAttribute('height', '500');
    hook.appendChild(canvas);
};

getCanvas = () => {
    return document.getElementById('canvas');
};
insertCanvas();

draw = () => {
   const canvas = getCanvas();
   console.log(canvas);
   const ctx  = canvas.getContext('2d');
   console.log(ctx);
   const background = new Image(200, 200);
   background.src = `/assets/images/background.png`;

    background.addEventListener("load", function() {
        ctx.drawImage(background, 0, 0);
    }, false);
};
draw();
