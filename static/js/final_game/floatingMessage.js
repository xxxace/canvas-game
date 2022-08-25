class FloatingMessage {
    constructor(game, message, x, y, targetX, targetY) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.message = message;
        this.markedForDeletion = false;
    }

    update() {
        let dx = this.targetX > this.x ? 1 : -1;
        let dy = this.targetY > this.y ? 1 : -1;

        this.x += dx * (this.game.speed || 5);
        this.y += dy * (this.game.speed || 5);

        if (dx === 1) {
            if (this.y >= this.targetY) this.y = this.targetY;
            if (this.x >= this.targetX) this.markedForDeletion = true;
        } else {
            if (this.y <= this.targetY) this.y = this.targetY;
            if (this.x <= this.targetX) this.markedForDeletion = true;
        }
    }

    render(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = '16px Creepster';
        context.fillText(this.message, this.x, this.y);
        context.restore();
    }
}

export default FloatingMessage;