import { Dust, Fire, Splash } from "./particle.js";

const states = {
    STANDING: 0,
    SITTING: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
    ROLLING: 5,
    DIVING: 6,
    HIT: 7
}

const keyboard = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    r: 'r'
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class StandingState extends State {
    constructor(game) {
        super('STANDING', game);
    }

    enter() {
        console.log(this.game)
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_LEFT) || input.includes(keyboard.ARROW_RIGHT)) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes(keyboard.ARROW_DOWN)) {
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes(keyboard.ARROW_UP)) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes(keyboard.r)) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class SittingState extends State {
    constructor(game) {
        super('SITTING', game);
    }

    enter() {
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_LEFT) || input.includes(keyboard.ARROW_RIGHT)) {
            if (this.game.player.isOnGround() && !input.includes(keyboard.ARROW_DOWN)) {
                this.game.player.setState(states.RUNNING, 1);
            }
        } else if (!input.includes(keyboard.ARROW_DOWN)) {
            this.game.player.setState(states.STANDING, 0);
        } else if (input.includes(keyboard.r)) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class RunningState extends State {
    constructor(game) {
        super('RUNNING', game);
    }

    enter() {
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 8;
    }

    handleInput(input) {
        const { player } = this.game;
        const dust = new Dust(this.game, player.x + player.width / 2 + 30, player.y + player.height);
        this.game.particles.unshift(dust);
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes(keyboard.ARROW_UP)) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (!input.includes(keyboard.ARROW_LEFT) && !input.includes(keyboard.ARROW_RIGHT)) {
            this.game.player.setState(states.STANDING, 0);
        } else if (input.includes(keyboard.r)) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class JumpingState extends State {
    constructor(game) {
        super('JUMPING', game);
    }

    enter() {
        if (this.game.player.isOnGround()) this.game.player.vy -= 30;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (this.game.player.isOnGround()) {
            this.game.player.setState(states.STANDING, 0);
        } else if (this.game.player.vy > 0) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes(keyboard.r)) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes(keyboard.ARROW_DOWN)) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class FallingState extends State {
    constructor(game) {
        super('FALLING', game);
    }

    enter() {
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.game.player.setState(states.DIVING, 0);
        } else if (this.game.player.isOnGround()) {
            this.game.player.setState(states.STANDING, 0);
        }
    }
}

export class RollingState extends State {
    constructor(game) {
        super('ROLLING', game);
    }

    enter() {
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        const { player } = this.game;
        const fire = new Fire(this.game, player.x + player.width / 2, player.y + player.height / 2);
        this.game.particles.unshift(fire);
        if (!input.includes(keyboard.r) && this.game.player.isOnGround()) {
            this.game.player.setState(states.STANDING, 0);
        } else if (!input.includes(keyboard.r) && !this.game.player.isOnGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes(keyboard.r) && input.includes(keyboard.ARROW_UP) && this.game.player.isOnGround()) {
            this.game.player.vy -= 27;
        } else if (!this.game.player.isOnGround() && input.includes(keyboard.ARROW_DOWN)) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class DivingState extends State {
    constructor(game) {
        super('DIVING', game);
    }

    enter() {
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        const { player } = this.game;
        const fire = new Fire(this.game, player.x + player.width / 2, player.y + player.height / 2);
        this.game.particles.unshift(fire);
        if (this.game.player.isOnGround()) {
            this.game.player.setState(states.STANDING, 0);
            for (let i = 0; i < 30; i++) {
                const splash = new Splash(this.game, player.x + player.width * 0.5, player.y + player.height);
                this.game.particles.unshift(splash);
            }
        } else if (input.includes(keyboard.r) && this.game.player.isOnGround()) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class HitState extends State {
    constructor(game) {
        super('HIT', game);
    }

    enter() {
        this.game.player.frameY = 4;
        this.game.player.maxFrame = 10;
    }

    handleInput(input) {
        const { player } = this.game;
        if (player.frameX >= 10 && this.game.player.isOnGround()) {
            this.game.player.setState(states.STANDING, 0);
        } else if (player.frameX >= 10 && !this.game.player.isOnGround()) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}