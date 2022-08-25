class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = game.resources.boom;
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.sizeModifier = Math.random() * 0.3 + 0.2;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 15;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.audio = new Audio(game.resources.iceAttack.src);
        this.audio.play();
    }

    update(deltaTime) {
        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            if (this.frameX >= this.maxFrame) this.markedForDeletion = true;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    render(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

export default CollisionAnimation