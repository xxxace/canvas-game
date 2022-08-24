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
        this.particles = [];
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.debug = true;
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
        if (this.enemyTimer > this.enemyInterval) {
            this.addEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer += deltaTime;
        }

        this.backgorund.update();
        this.enemyController.update(deltaTime);
        this.player.update(this.input.keys, deltaTime);
        this.particles.forEach((particle, i) => {
            particle.update();
            if (particle.markedForDeletion) this.particles.splice(i, 1);
        });
    }

    render(context) {
        this.backgorund.render(context);
        this.enemyController.render(context);
        this.player.render(context);
        this.userInterface.render(context);
        this.particles.forEach((particle) => particle.render(context));
    }
}

export default Game;