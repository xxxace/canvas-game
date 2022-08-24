class UserInterface {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Impact';
    }

    update() {

    }

    render(context) {
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.fillText(`score: ${this.game.score}`, 10, this.fontSize);
    }
}

export default UserInterface;