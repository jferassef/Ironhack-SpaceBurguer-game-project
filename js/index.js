document.querySelector(".start-button").addEventListener("click", () => {
  const game = new Game();
  game.start();
});

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.moveSpeed = 1;
    this.spawnInterval = 3 * this.fps;
    this.avatar = new Avatar(this.canvas, this.ctx);
    this.ingr = new Ingredients(this.canvas, this.ctx, this.moveSpeed);
    this.timer = 0;
  }

  start() {
    console.log("start");
    this.createEventListeners();
    setInterval(() => this.update(), 1000 / this.fps);
  }

  update() {
    console.log("update");
    this.timer++;
    this.clear();
    this.avatar.draw();
    this.ingr.draw();
    this.ingr.move();
    if (this.timer % this.spawnInterval === 0) {
      this.ingr.addRandomIngredient();
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createEventListeners() {
    document.addEventListener("keydown", (e) => this.avatar.move(e.key));
  }
}

function pickIngredients() {
  let pickedIng = [];
  let picked = false;
  for (let i = 0; i < ingredients.length; i++) {
    const ing = ingredients[i];
    const withinX =
      avatar.x + avatar.width > ingr.x && avatar.x < ingr.x + ingr.width;
    const withinY =
      ingr.y + ingr.height > avatar.y && ingr.y < ingr.y + ingr.height;

    picked = withinX && withinY;

    if (picked) {
      break;
    }
  }
  return picked;
}
