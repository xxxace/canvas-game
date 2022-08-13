class ResourceLoader {
  constructor(options) {
    this.map = options.resources;
  }

  load(callback) {
    let count = 0;
    const keys = Object.keys(this.map);

    keys.forEach((key, i) => {
      const resource = new Image();
      resource.src = this.map[key];

      resource.onload = () => {
        count++;
        this.map[key] = resource;
        if (count === keys.length) {
          callback(this.map);
        }
      };
    });
  }
}
