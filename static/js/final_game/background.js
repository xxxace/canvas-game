class Layer {
    constructor(game, image, width, height, speedModifier) {
        this.game = game;
        this.image = image;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if (this.x <= -this.width) this.x = 0;
        else this.x -= this.game.speed * this.speedModifier;
    }

    render(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

export class Background {
    constructor(game) {
        const { resources } = game;
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layers = [
            new Layer(game, resources.layer1, this.width, this.height, 0),
            new Layer(game, resources.layer2, this.width, this.height, 0.2),
            new Layer(game, resources.layer3, this.width, this.height, 0.4),
            new Layer(game, resources.layer4, this.width, this.height, 0.8),
            new Layer(game, resources.layer5, this.width, this.height, 1)
        ]
        console.log(this.layers)
    }

    update() {
        this.layers.forEach(layer => {
            layer.update();
        })
    }

    render(context) {
        this.layers.forEach(layer => {
            layer.render(context);
        })
    }
}