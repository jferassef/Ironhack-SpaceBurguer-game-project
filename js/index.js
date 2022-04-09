class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.font = "20px Tahoma";
    this.fps = 60;
    this.moveSpeed = 5;
    this.spawnInterval = 1 * this.fps; // interval between ing falling
    this.avatar = new Avatar(this.canvas, this.ctx);
    this.ingr = new Ingredients(this.canvas, this.ctx, this.moveSpeed);
    this.floor = {
      x: 0,
      y: this.canvas.height,
      width: Infinity,
      height: Infinity,
    }; // ing limit from falling
    this.lengthBreadGoal = 3;
    this.pauseGame = false;
    this.timer = 0;
    this.score = 0;
    this.ctx.fillText(
      "HI PLAYER! WELCOME TO SPACE BURGUER RESTAURANT",
      this.canvas.width / 2 - 260,
      200
    );
    this.ctx.fillText(
      "INSTRUCTIONS: Use the left and right arrow to control the avatar",
      this.canvas.width / 2 - 290,
      300
    );
    this.ctx.fillText(
      "WARNING: CLIENT DIES IF INGREDIENTS ARE NOT IN THE RIGHT ORDER",
      this.canvas.width / 2 - 350,
      350
    );
  }

  reset() {
    clearInterval(this.gameinterval);
    document.removeEventListener("keydown", this.eventMove);
    this.clear();
    this.avatar.reset();
    this.ingr.reset();
    this.breadCurrent = [];
    this.breadGoal = [];
    this.lengthBreadGoal = 3;
    this.moveSpeed = 5;
    this.spawnInterval = 1 * this.fps;
    this.pauseGame = false;
    document.querySelector(".game-over").classList.add("hidden");
  }

  // reset list of goal ing
  init() {
    this.breadGoal = this.ingr.createGoalBread(this.lengthBreadGoal);
    this.breadCurrent = []; // current list on game
  }

  start() {
    this.init();
    this.createEventListeners();
    this.gameinterval = setInterval(() => this.update(), 1000 / this.fps);
  }

  update() {
    if (this.pauseGame) {
      return;
    }
    if (this.lengthBreadGoal === 4) {
      this.breadGoal = [];
      // alert("win");
      this.ctx.fillText(
        "CONGRATS, YOU WIN!! :)",
        this.canvas.width / 2 - 100,
        this.canvas.height / 2
      );
      game.pauseGame = true;
    }
    // next stage condition, make 2 breads the same
    if (this.breadCurrent.length === this.breadGoal.length) {
      this.lengthBreadGoal++;
      this.init();
      return;
    }
    this.timer++;
    this.ingr.move();
    const nextIngr = [];
    for (const ingred of this.ingr.ingredients) {
      if (Ingredients.intersects(this.avatar, ingred)) {
        // when collision check next ingredient on goal
        if (this.breadGoal[this.breadCurrent.length].name === ingred.name) {
          this.addscore();
          this.breadCurrent.push(ingred);
        } else {
          this.drawGameOver();
          // alert("loose");
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

  // draw goal burguer, current one, iterate and display ing on y
  drawGoal() {
    this.ctx.fillText("ORDER TO DO:", 10, 30);
    this.ctx.fillText("Picked:", this.canvas.width - 70, 30);
    let startY = 40;
    this.breadGoal
      .slice()
      .reverse()
      .forEach((ingred) => {
        switch (ingred.type) {
          case "image":
            this.ctx.drawImage(
              ingred.img,
              10,
              startY,
              ingred.width,
              ingred.height
            );
            startY += ingred.height + 5;
            break;
          default:
            break;
        }
      });
    this.breadCurrent
      .slice()
      .reverse()
      .forEach((ingred) => {
        switch (ingred.type) {
          case "image":
            this.ctx.drawImage(
              ingred.img,
              this.canvas.width - ingred.width - 10,
              startY,
              ingred.width,
              ingred.height
            );
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

  addscore() {
    this.score++;
    let scoreCurrent = document.querySelector(".game-score span");
    scoreCurrent.innerText = this.score * 10;
  }

  drawGameOver() {
    let loose = document.querySelector(".game-over");
    loose.classList.toggle("hidden");
    game.pauseGame = true;
    console.log(loose);
    let scoreLoose = document.querySelector("#score-loose");
    scoreLoose.innerText = "Score: " + this.score * 10;
  }

  createEventListeners() {
    this.eventMove = (e) => this.avatar.move(e.key);
    document.addEventListener("keydown", this.eventMove);
  }
}

const game = new Game();
document.querySelector("#start-button").addEventListener("click", () => {
  document.querySelector("#start-button").classList.add("hidden");
  game.start();
  document.querySelector("#pause-button").classList.remove("hidden");
});

document.querySelector("#pause-button").addEventListener("click", () => {
  document.querySelector("#pause-button").classList.add("hidden");
  document.querySelector("#resume-button").classList.remove("hidden");
  game.pauseGame = true;
});

document.querySelector("#resume-button").addEventListener("click", () => {
  document.querySelector("#resume-button").classList.add("hidden");
  document.querySelector("#pause-button").classList.remove("hidden");
  game.pauseGame = false;
});

document.querySelector("#reset-button").addEventListener("click", () => {
  document.querySelector("#resume-button").classList.add("hidden");
  document.querySelector("#pause-button").classList.add("hidden");
  document.querySelector("#start-button").classList.remove("hidden");
  game.reset();
});
