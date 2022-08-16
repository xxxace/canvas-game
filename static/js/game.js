class GameController {
    constructor(options) {
        if (GameController.instance) {
            return GameController.instance;
        } else {
            this.options = Object.assign({
                gameSpeed: 10
            }, options);
            Object.assign(this, this.options);
            GameController.instance = this;
        }
    }

    setGameSpeed(speed) {
        GameController.instance.gameSpeed = speed;
    }
}

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        // this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.gameController = new GameController({ gameSpeed: 1000 });
        this.speed = this.gameController.gameSpeed * speedModifier;
    }

    update() {
        this.speed = this.gameController.gameSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        // if (this.x2 <= -this.width) {
        //     this.x2 = this.width + this.x - this.speed;
        // }

        this.x = Math.floor(this.x - this.speed);
        // this.x2 = Math.floor(this.x2 - this.speed);
    }

    draw() {
        const { ctx } = this.gameController;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}