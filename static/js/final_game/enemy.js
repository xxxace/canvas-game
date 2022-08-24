class Enemy {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.markForDelete = false;
        this.eventGroup = {};

        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 0;
    }

    update(deltaTime) {
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.x <= 0 - this.width) {
            this.emit('delete');
        }
    }

    render(context) {
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }

    on(event, callback) {
        const eventBucket = this.eventGroup[event];
        if (!eventBucket) this.eventGroup[event] = [callback];
        else eventBucket.push(callback)
    }

    emit(event) {
        const eventBucket = this.eventGroup[event];
        if (eventBucket) {
            eventBucket.forEach(cb => cb());
        }
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.x = game.width + Math.random() * game.width * 0.5;
        this.y = Math.random() * game.height * 0.5;
        this.width = 60;
        this.height = 44;
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = this.game.resources.enemy_fly;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
    }
}

export class GroundEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.width = 60;
        this.height = 87;
        this.x = game.width;
        this.y = game.height - this.height - game.groundMargin;
        this.speedX = 0;
        this.speedY = 0;
        this.maxFrame = 1;
        this.image = this.game.resources.enemy_plant;
    }
}

export class ClimbingEnemy extends Enemy {
    constructor(game) {
        super(game);
        this.width = 120;
        this.height = 144;
        this.x = game.width;
        this.y = Math.random() * this.height * 0.5;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
        this.image = this.game.resources.enemy_spider_big;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.y >= this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
        else if (this.y <= 0 - this.height) {
            this.emit('delete');
        }
    }

    render(context) {
        this.drawLine(context);
        super.render(context);
    }

    drawLine(context) {
        context.beginPath();
        const x = this.x + this.width / 2;
        context.moveTo(x, 0);
        context.lineTo(x, this.y + this.height / 1.5);
        context.stroke();
    }
}


export class EnemyFactory {
    constructor(type, game) {
        switch (type) {
            case 'fly':
                return new FlyingEnemy(game);
            case 'plant':
                return new GroundEnemy(game);
            case 'spider':
                return new ClimbingEnemy(game);
        }
    }
}

export class EnemyController {
    constructor(game) {
        this.game = game;
        this.enemyGroup = [];
        this.enemyTypes = ['fly', 'plant', 'spider'];
    }

    addEnemy() {
        if (this.game.speed > 0 && Math.random() < 0.5) {
            this.addEnemyByType('plant')
        } else if (this.game.speed > 0) {
            this.addEnemyByType('spider');
        }

        this.addEnemyByType('fly');
        this.enemyGroup.sort(function (a, b) {
            return a.y - b.y;
        });
    }

    addEnemyByType(type) {
        const enemy = new EnemyFactory(type, this.game);
        enemy.on('delete', () => {
            this.enemyGroup = this.enemyGroup.filter(e => e !== enemy);
        });
        this.enemyGroup.push(enemy);
    }

    update(deltaTime) {
        this.enemyGroup.forEach(enemy => {
            enemy.update(deltaTime);
        });
    }

    render(context) {
        this.enemyGroup.forEach(enemy => {
            enemy.render(context);
        });
    }
}

