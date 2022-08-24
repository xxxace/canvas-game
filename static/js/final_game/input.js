class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.includes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'r'];
    }

    listen() {
        window.addEventListener('keydown', (e) => {
            if (this.includes.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            } else if (e.key === 'd') {
                this.game.debug = !this.game.debug;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (this.includes.includes(e.key) && this.keys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}

export default InputHandler;