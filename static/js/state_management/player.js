import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from './state.js';

class Player {
    constructor(options) {
        this.game = options.game;
        this.states = [
            new StandingLeft(this),
            new StandingRight(this),
            new SittingLeft(this),
            new SittingRight(this),
            new RunningLeft(this),
            new RunningRight(this),
            new JumpingLeft(this),
            new JumpingRight(this),
            new FallingLeft(this),
            new FallingRight(this)
        ];
        this.currentState = this.states[1];
        this.width = this.game.spriteWidth;
        this.height = this.game.spriteHeight;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - this.height;
        this.vy = 0;
        this.weight = 1;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.speed = 0;
        this.maxSpeed = 15;
        this.fps = 60;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
    }

    update(input) {
        this.currentState.handleInput(input);
        this.x += this.speed;
        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

        this.y += this.vy;
        if (!this.isOnGround()) this.vy += this.weight;
        else this.vy = 0;
    }

    render(context, deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        context.drawImage(this.game.sprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }

    isOnGround() {
        return this.y >= this.game.height - this.height;
    }
}

export default Player;