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
    this.floor = {
      x: 0,
      y: this.canvas.height,
      width: Infinity,
      height: Infinity,
    };
    this.lengthBreadGoal = 3;
    this.timer = 0;
  }

  init() {
    this.breadGoal = this.ingr.createGoalBread(this.lengthBreadGoal);
    this.breadCurrent = [];
  }

  start() {
    console.log("start");
    this.init();
    this.createEventListeners();
    setInterval(() => this.update(), 1000 / this.fps);
  }

  update() {
    console.log("update");
    if (this.lengthBreadGoal === 5) {
      console.debug("Win");
      alert("win");
    }
    if (this.breadCurrent.length === this.breadGoal.length) {
      this.lengthBreadGoal++;
      this.init();
    }
    this.timer++;
    this.clear();
    this.avatar.draw();
    this.ingr.draw();
    this.ingr.move();
    const nextIngr = [];
    for (const ingred of this.ingr.ingredients) {
      if (Ingredients.intersects(this.avatar, ingred)) {
        if (this.breadGoal[this.breadCurrent.length].name === ingred.name) {
          this.breadCurrent.push(ingred);
        } else {
          console.log("loose");
          alert("loose");
          break;
        }
      } else if (!Ingredients.intersects(this.floor, ingred)) {
        nextIngr.push(ingred);
      }
    }
    this.ingr.ingredients = nextIngr;
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
