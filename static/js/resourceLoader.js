function getResourceInstanceBySrc(src) {
  const audioRegx = /\.(wav|mp3|mp4)$/;
  const imageRegx = /\.(jpg|jpeg|png|ico)$/;

  if (audioRegx.test(src)) return new Audio();
  if (imageRegx.test(src)) return new Image();
}
class ResourceLoader {
  constructor(options) {
    this.map = options.resources;
  }

  load(callback) {
    let count = 0;
    const keys = Object.keys(this.map);

    keys.forEach((key, i) => {
      const src = this.map[key];
      const resource = getResourceInstanceBySrc(src);
      resource.src = src;

      const loader = () => {
        count++;
        this.map[key] = resource;
        if (count === keys.length) {
          callback(this.map);
        }
      };

      if (resource.tagName === 'AUDIO') {
        resource.oncanplaythrough = loader();
      } else {
        resource.onload = loader();
      }
    });
  }
}