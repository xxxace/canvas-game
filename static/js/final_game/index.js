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
        shadow_dog: './static/assets/png/shadow_dog.png',
        layer1: './static/assets/png/layer-1.png',
        layer2: './static/assets/png/layer-2.png',
        layer3: './static/assets/png/layer-3.png',
        layer4: './static/assets/png/layer-4.png',
        layer5: './static/assets/png/layer-5.png',
        enemy_fly: './static/assets/png/enemy_fly.png',
        enemy_plant: './static/assets/png/enemy_plant.png',
        enemy_spider_big: './static/assets/png/enemy_spider_big.png',
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

        game.update(deltaTime);
        game.render(ctx);
        requestAnimationFrame(animate);
    }

    animate(0)
}

resourceLoader.load(map => {
    run();
});

