const states = {
    STANDING: 0,
    SITTING: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
}

const keyboard = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight'
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class StandingState extends State {
    constructor(player) {
        super('STANDING');
        this.player = player;
    }

    enter() {
        this.player.frameY = 0;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_LEFT) || input.includes(keyboard.ARROW_RIGHT)) {
            this.player.setState(states.RUNNING, 1);
        } else if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.SITTING, 0);
        } else if (input.includes(keyboard.ARROW_UP)) {
            this.player.setState(states.JUMPING, 1);
        }
    }
}

export class SittingState extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }

    enter() {
        this.player.frameY = 5;
        this.player.maxFrame = 4;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_LEFT) || input.includes(keyboard.ARROW_RIGHT)) {
            if (this.player.isOnGround() && !input.includes(keyboard.ARROW_DOWN)) {
                this.player.setState(states.RUNNING, 1);
            }
        } else if (!input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.STANDING, 0);
        }
    }
}

export class RunningState extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }

    enter() {
        this.player.frameY = 3;
        this.player.maxFrame = 8;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.SITTING, 0);
        } else if (input.includes(keyboard.ARROW_UP)) {
            this.player.setState(states.JUMPING, 1);
        } else if (!input.includes(keyboard.ARROW_LEFT) && !input.includes(keyboard.ARROW_RIGHT)) {
            this.player.setState(states.STANDING, 0);
        }
    }
}

export class JumpingState extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }

    enter() {
        this.player.frameY = 1;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.SITTING, 0);
        } else if (this.player.isOnGround()) {
            this.player.setState(states.STANDING, 0);
        } else if (this.player.vy > 0) {
            this.player.setState(states.FALLING, 1);
        }
    }
}

export class FallingState extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }

    enter() {
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.SITTING, 0);
        } else if (this.player.isOnGround()) {
            this.player.setState(states.STANDING, 0);
        }
    }
}