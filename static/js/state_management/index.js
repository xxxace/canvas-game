import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";

const canvasFactory = new CanvasFactory({
    el: '#can',
    width: window.innerWidth,
    height: window.innerHeight
});
const canvas = canvasFactory.canvas;
const ctx = canvas.getContext('2d');
canvasFactory.mount();

const resourceLoader = new ResourceLoader({
    resources: {
        shadow_dog_white: './static/assets/png/shadow_dog_white.png'
    }
});

function run() {
    const player = new Player({
        game: {
            width: canvas.width,
            height: canvas.height,
            sprite: resourceLoader.map.shadow_dog_white,
            spriteWidth: 200,
            spriteHeight: 181.83,
        }
    });
    const input = new InputHandler();
    input.listen();

    let lastTime = 0;
    function animate(timestamp) {
        const deltaTime = timestamp - lastTime;
        lastTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        player.update(input.lastKey);
        player.render(ctx,deltaTime);
        drawStatusText(ctx, input, player);
        requestAnimationFrame(animate);
    }

    animate(0);
}

resourceLoader.load(map => {
    run();
});
