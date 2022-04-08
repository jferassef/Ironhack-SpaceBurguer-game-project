class Background {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = null;
    this.width = this.canvas.width * 0.8;
    this.height = this.canvas.height;
    this.x = this.width * 0.2;
    this.y = 0;
    this.init();
  }

  init() {
    this.image = new Image();
    this.image.src = "images/initialbackground.png";
  }

  draw() {
    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}
