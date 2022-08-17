class Enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.frameNum = 0;
        this.speedx = this.getRandom(5);
        this.speedy = this.getRandom(5);
        this.renderSpeed = 3;
        this.gameController = new GameController();
    }

    getRandom(max) {
        let value = (Math.random() * max) - (max / 2);

        if (Math.round(value) === 0) {
            value = this.getRandom(max);
        }

        return value;
    }

    beforeUpdate() {

    }

    update() {
        const { canvas } = this.gameController;
        this.beforeUpdate();
        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;

        if (this.x < 0 || this.x + this.width >= canvas.width) {
            this.speedx = -this.speedx;
        }

        if (this.y < 0 || this.y + this.height >= canvas.height) {
            this.speedy = -this.speedy;
        }
    }

    render() {
        const { ctx } = this.gameController;
        const frame = Math.floor(this.frame / this.renderSpeed) % this.frameNum;

        ctx.drawImage(this.sprite, frame * this.imageWidth, 0, this.imageWidth, this.imageHeight, this.x, this.y, this.width, this.height);
        this.frame++;
    }
}

class Enemy1 extends Enemy {
    constructor() {
        super();
        const { canvas } = this.gameController;
        this.frame = 0;
        this.scale = 0.3;
        this.imageWidth = 293;
        this.imageHeight = 155;
        this.x = Math.random() * (canvas.width);
        this.y = Math.random() * (canvas.height);
        this.width = this.imageWidth * this.scale;
        this.height = this.imageHeight * this.scale;
        this.sprite = this.gameController.resources.enemy1;
        this.frameNum = 6;
        this.speedx = Math.random() * 4 - 2;
        this.renderSpeed = 1
    }

    update() {
        const { canvas } = this.gameController;
        this.beforeUpdate();
        this.x += this.speedx;
        this.y += this.speedx;
    }
}

class Enemy2 extends Enemy {
    constructor() {
        super();
        const { canvas, resources } = this.gameController;
        this.frame = 0;
        this.scale = Math.random() * 0.4 + 0.2;
        this.imageWidth = 266;
        this.imageHeight = 188;
        this.width = this.imageWidth * this.scale;
        this.height = this.imageHeight * this.scale;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.speedx = Math.random() * 8;
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 10
        this.sprite = resources.enemy2;
        this.frameNum = 6;
    }

    update() {
        const { canvas } = this.gameController;
        this.beforeUpdate();
        this.x -= this.speedx;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += this.angleSpeed;

        if (this.x + this.width < 0) this.x = canvas.width;
    }
}

class Enemy3 extends Enemy {
    constructor() {
        super();
        const { canvas, resources } = this.gameController;
        this.frame = 0;
        this.scale = 0.3;
        this.imageWidth = 218;
        this.imageHeight = 177;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.width = this.imageWidth * this.scale;
        this.height = this.imageHeight * this.scale;
        this.sprite = resources.enemy3;
        this.frameNum = 6;
        this.angle = 0;
        this.angleSpeed = Math.random() * 2 + 0.5;
        this.curve = Math.random() * 200 + 50
    }

    update() {
        const { canvas } = this.gameController;
        const halfCanvasW = canvas.width / 2;
        const halfCanvasH = canvas.height / 2;
        const xAngle = Math.PI / 90;
        const yAngle = Math.PI / 700;
        this.x = halfCanvasW * Math.sin(this.angle * xAngle) + (halfCanvasW - this.width / 2);
        this.y = halfCanvasH * Math.cos(this.angle * yAngle) + (halfCanvasH - this.height / 2);
        this.angle += this.angleSpeed;
    }
}

class Enemy4 extends Enemy {
    constructor() {
        super();
        const { canvas, resources } = this.gameController;
        this.frame = 0;
        this.scale = 0.3;
        this.imageWidth = 213;
        this.imageHeight = 219;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.newX = Math.random() * (canvas.width - this.width);
        this.newY = Math.random() * (canvas.height - this.height);
        this.width = this.imageWidth * this.scale;
        this.height = this.imageHeight * this.scale;
        this.sprite = resources.enemy4;
        this.frameNum = 9;
        this.interval = Math.floor(Math.random() * 200 + 50);
    }

    update() {
        const { canvas } = this.gameController;

        if (this.frame % this.interval === 0) {
            this.newX = Math.random() * (canvas.width - this.width);
            this.newY = Math.random() * (canvas.height - this.height);
        }

        const dx = this.x - this.newX;
        const dy = this.y - this.newY;

        this.x -= dx / 70;
        this.y -= dy / 70;
    }
}


class EnemyFactory {
    constructor(type) {
        switch (type) {
            case 1:
                return new Enemy1();
            case 2:
                return new Enemy2();
            case 3:
                return new Enemy3();
            case 4:
                return new Enemy4();
        }
    }
}