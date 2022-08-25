class UserInterface {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
    }

    update() {

    }

    render(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        // score
        context.textAlign = 'left';
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillText(`Score: ${this.game.score}`, 10, this.fontSize);
        // time
        context.textAlign = 'left';
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        context.fillText(`Time: ${Math.round(this.game.time / 1000)}`, 10, this.fontSize * 2);
        // game over
        if (this.game.gameOver) {
            let text = '';
            if (this.game.player.lives === 0) {
                text = '菜'
            } else {
                text = '强'
            }

            context.font = `${this.fontSize * 8}px KaiTi`;
            context.textAlign = 'center';
            context.fillStyle = 'rgb(237, 9, 9)';
            context.fillText(text, (this.game.width / 2), this.game.height / 1.7);
        }

        for (let i = 0; i < this.game.player.lives; i++) {
            context.drawImage(this.game.resources.heart, i * 1 * (30) + 10, 70, 50 * 0.5, 50 * 0.5);
        }

        context.restore();
    }
}

export default UserInterface;