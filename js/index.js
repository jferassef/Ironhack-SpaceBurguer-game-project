document.querySelector("#start-button").addEventListener("click", () => {
  const game = new Game();
  game.start();
  document.querySelector("#start-button").classList.add('hidden')
  document.querySelector("#pause-button").classList.remove('hidden')
});

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.moveSpeed = 5;
    this.spawnInterval = 1 * this.fps;
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
    if (this.breadCurrent.length === this.breadGoal.length + 1) {
      this.lengthBreadGoal++;
      this.init();
    }
    this.timer++;
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

    
    this.clear();

    this.drawGoal();
    this.avatar.draw();
    this.ingr.draw();
  }

  drawGoal() {
    let startY = 0;
    this.breadGoal.slice().reverse().forEach((ingred) => {
      switch (ingred.type) {
        case "image":
          this.ctx.drawImage(ingred.img, 10, startY, ingred.width, ingred.height);
          startY += ingred.height + 5;
          break;
        default:
          break;
      }
    });
    this.breadCurrent.slice().reverse().forEach((ingred) => {
      console.log('>>>>',ingred);
      switch (ingred.type) {
        case "image":
          this.ctx.drawImage(ingred.img, this.canvas.width - ingred.width - 10, startY, ingred.width, ingred.height);
          startY += ingred.height + 5;
          break;
        default:
          break;
      }
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createEventListeners() {
    document.addEventListener("keydown", (e) => this.avatar.move(e.key));
  }
}
