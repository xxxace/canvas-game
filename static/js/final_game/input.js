class InputHandler {
    constructor() {
        this.keys = [];
        this.includes = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight','Enter'];
    }

    listen() {
        window.addEventListener('keydown', (e) => {
            if (this.includes.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
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