import InputHandler from "./input.js";
import Player from "./player.js";

class Game {
    constructor(options) {
        Object.assign(this, options);
        this.player = new Player(this);
        this.input = new InputHandler();
        this.input.listen();
    }

    update() {
        this.player.update(this.input.keys);
    }

    render(context) {
        this.player.render(context);
    }
}

export default Game;