import InputHandler from "./input.js";
import Player from "./player.js";
import { Background } from "./background.js";

class Game {
    constructor(options) {
        Object.assign(this, options);
        this.speed = 0;
        this.maxSpeed = 16;
        this.groundMargin = 50;
        this.player = new Player(this);
        this.input = new InputHandler();
        this.input.listen();
        this.backgorund = new Background(this);
    }

    update(deltaTime) {
        this.backgorund.update();
        this.player.update(this.input.keys, deltaTime);
    }

    render(context) {
        this.backgorund.render(context);
        this.player.render(context);
    }
}

export default Game;