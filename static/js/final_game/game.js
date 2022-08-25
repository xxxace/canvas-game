import InputHandler from "./input.js";
import Player from "./player.js";
import { Background } from "./background.js";
import { EnemyController } from './enemy.js';
import UserInterface from "./ui.js";
class Game {
    constructor(options) {
        Object.assign(this, options);
        this.score = 0;
        this.speed = 0;
        this.maxSpeed = 6;
        this.groundMargin = 80;
        this.maxParticles = 200;
        this.particles = [];
        this.collisions = [];
        this.floatingMessages = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.time = 0;
        this.maxTime = 30 * 1000;
        this.gameOver = false;
        this.debug = false;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.input.listen();
        this.enemyController = new EnemyController(this);
        this.backgorund = new Background(this);
        this.userInterface = new UserInterface(this);
        this.player.start();
    }

    addEnemy() {
        this.enemyController.addEnemy();
    }

    update(deltaTime) {
        this.time += deltaTime;

        if (this.time > this.maxTime) this.gameOver = true;

        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.backgorund.update();
        this.enemyController.update(deltaTime);
        this.player.update(this.input.keys, deltaTime);
        this.particles.forEach((particle) => particle.update());
        if (this.particles.length > this.maxParticles) {
            this.particles.length = this.maxParticles;
        }

        this.collisions.forEach((collision) => collision.update(deltaTime));
        this.floatingMessages.forEach((floatingMessage) => floatingMessage.update());

        this.collisions = this.collisions.filter(collision => !collision.markedForDeletion);
        this.floatingMessages = this.floatingMessages.filter(floatingMessage => !floatingMessage.markedForDeletion);
        this.particles = this.particles.filter(particle => !particle.markedForDeletion);
    }

    render(context) {
        this.backgorund.render(context);
        this.enemyController.render(context);
        this.player.render(context);
        this.userInterface.render(context);
        this.particles.forEach((particle) => particle.render(context));
        this.collisions.forEach((collision) => collision.render(context));
        this.floatingMessages.forEach((floatingMessage, i) => floatingMessage.render(context));
    }
}

export default Game;