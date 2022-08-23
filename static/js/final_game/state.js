const states = {
    STANDING: 0,
    SITTING: 1,
    RUNNING: 2,
    JUMPING: 3,
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
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_LEFT) || input.includes(keyboard.ARROW_RIGHT)) {
            this.player.setState(states.RUNNING);
        } else if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.SITTING);
        } else if (input.includes(keyboard.ARROW_UP)) {
            this.player.setState(states.JUMPING);
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
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_LEFT) || input.includes(keyboard.ARROW_RIGHT)) {
            this.player.setState(states.RUNNING);
        } else if (!input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.STANDING);
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
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(state.SITTING);
        } else if (input.includes(keyboard.ARROW_UP)) {
            this.player.setState(states.JUMPING);
        } else if (!input.includes(keyboard.ARROW_LEFT) && !input.includes(keyboard.ARROW_RIGHT)) {
            this.player.setState(states.STANDING);
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
    }

    handleInput(input) {
        if (input.includes(keyboard.ARROW_DOWN)) {
            this.player.setState(states.SITTING);
        } else if (this.player.isOnGround()) {
            this.player.setState(states.STANDING);
        }
    }
}