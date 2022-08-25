class Particle {
    constructor(game) {
        this.game = game;
        this.markedForDeletion = false;
    }

    update() {
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        this.size *= 0.95;
        if (this.size < 0.5) this.markedForDeletion = true;
    }
}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedX = Math.random();
        this.speedY = Math.random();
        this.color = 'black';
    }

    render(context) {
        context.save();
        context.beginPath();
        context.globalAlpha = 0.3;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.restore();
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game);
        this.size = Math.random() * 100 + 100;
        this.x = x - this.size * 0.4;
        this.y = y - this.size * 0.5;
        this.speedX = Math.random() * 6 - 4;
        this.speedY = Math.random() * 2 + 2;
        this.image = game.resources.fire;
        this.gravity = 0;
    }

    update() {
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    render(context) {
        context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game);
        this.x = x;
        this.y = y;
        this.speedX = 1;
        this.speedY = 1;
        this.image = game.resources.fire;
        this.size = Math.random() * 100 + 100;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update() {
        super.update();
        this.angle += this.va;
        this.x += Math.sin(this.angle * 5);
    }

    render(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
        context.restore();
    }
}