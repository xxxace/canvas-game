import { StandingState, JumpingState, RunningState, SittingState, FallingState, RollingState, DivingState, HitState } from "./state.js";
import CollisionAnimation from './collisionAniamtion.js';
import FloatingMessage from './floatingMessage.js';
class Player {
    constructor(game) {
        this.game = game;
        this.lives = 5;
        this.scale = 0.2;
        this.spriteWidth = 573;
        this.spriteHeight = 523;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.x = 0;
        this.y = this.game.height - this.height - game.groundMargin;
        this.vy = 0;
        this.weight = 1;
        this.speed = 0;
        this.maxSpeed = 10;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.states = [
            new StandingState(game),
            new SittingState(game),
            new RunningState(game),
            new JumpingState(game),
            new FallingState(game),
            new RollingState(game),
            new DivingState(game),
            new HitState(game)
        ];
    }

    start() {
        this.currentState = this.states[0];
        this.currentState.enter();
    }

    update(input, deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        this.checkCollision();
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;

        if (!input.includes('ArrowDown') && this.currentState !== this.states[7]) {
            if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
            else if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
            else this.speed = 0;
        } else {
            this.speed = 0;
        }


        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement
        this.y += this.vy;

        if (!this.isOnGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0
        }

        // if (this.isOnGround()) this.y = this.game.height - this.height;
    }

    render(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.game.resources.shadow_dog, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    isOnGround() {
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }

    setState(state, speed) {
        this.game.speed = speed * this.game.maxSpeed;
        this.currentState = this.states[state];
        this.currentState.enter();
        this.frameX = 0;
    }

    checkCollision() {
        this.game.enemyController.enemyGroup.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.emit('delete');
                if (this.currentState === this.states[5] || this.currentState === this.states[6]) {
                    this.game.score++;
                    const floatingMessage = new FloatingMessage(this.game, '+1', enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5, 60, 30);
                    this.game.floatingMessages.push(floatingMessage);
                } else {
                    this.setState(7, 0);
                    this.lives--;
                    if (this.lives === 0) this.game.gameOver = true;
                }
                const collision = new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5);
                this.game.collisions.push(collision);
            } else {

            }
        });
    }
}

export default Player;