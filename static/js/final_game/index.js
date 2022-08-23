import Game from "./game.js";

const canvasFactory = new CanvasFactory({
    el: '#can',
    width: 500,
    height: 500
});
const canvas = canvasFactory.canvas;
const ctx = canvas.getContext('2d');
canvasFactory.mount();

const resourceLoader = new ResourceLoader({
    resources: {
        shadow_dog: './static/assets/png/shadow_dog.png'
    }
});

function run() {
    const game = new Game({
        width: canvas.width,
        height: canvas.height,
        resources: resourceLoader.map
    });
     
    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        game.update();
        game.render(ctx);
        requestAnimationFrame(animate);
    }

    animate(0)
}

resourceLoader.load(map => {
    run();
});

