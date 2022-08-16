class CanvasFactory {
    constructor(options) {
        if (!options.el) throw new Error('property el is required!');

        this.el = typeof options.el === 'string'
            ? document.querySelector(options.el)
            : options.el

        this.options = options;
        this.create();
    }

    create() {
        const { width, height } = this.options
        const canvas = document.createElement('canvas');
        canvas.width = width || 500;
        canvas.height = height || 500;
        this.canvas = canvas;
    }

    mount() {
        this.el.append(this.canvas);
    }

    getContext(type) {
        return this.canvas.getContext(type);
    }
}