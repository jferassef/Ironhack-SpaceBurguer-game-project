class Avatar {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = null;
    this.avatarSpeed = 2;
    this.width = 80;
    this.height = 100;
    this.y = this.canvas.height - (this.height + 50);
    this.x = (this.canvas.width - this.width) / 2;
    this.init();
  }

  init() {
    this.image = new Image();
    this.image.src = "images/avatar.png";
  }

  draw() {
    if (this.image) {
      this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  moveLeft() {
    if (this.x > 0) {
      this.x -= this.avatarSpeed;
    }
  }

  moveRight() {
    if (this.x < this.canvas.width - this.width) {
      this.x += this.avatarSpeed;
    }
  }
}
